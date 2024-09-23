import passport from "passport";
import local from "passport-local";
import userService from "../dao/models/users.model.js";
import cartsService from "../dao/models/carts.model.js";
import GitHubStrategy from "passport-github2";
import { createHash, isValidPassword } from "../utils.js";

const LocalStrategy = local.Strategy;
const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userService.findOne({ email: username });
          if (user) {
            return null, false;
          }

          //Crea un nuevo carrito para el usuario registrado
          let newCart = { products: [] };
          let resultNewCart = await cartsService.create(newCart);

          const newUser = {
            first_name,
            last_name,
            email,
            cart: resultNewCart._id,
            age,
            rol: "user",
            password: createHash(password),
          };
          let result = await userService.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario: " + error);
        }
      }
    )
  );

  //login
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userService.findOne({ email: username });
          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          console.log("Este es mi usuario", user);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //gitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv23lic9M9QKv4OozeOX",
        clientSecret: "89d5b519be9172c7c86a6220c54a7099b6c9dbe1",
        callbackURL: "http://localhost:8080/api/githubcallback",
      },
      async (accesToken, refreshToken, profile, done) => {
        /* console.log(profile) */
        try {
          let user = await userService.findOne({ email: profile._json.email });
          if (!user) {
            //Crea un nuevo carrito para el usuario registrado
            let newCart = { products: [] };
            let resultNewCart = await cartsService.create(newCart);

            let newUser = {
              first_name: profile._json.login,
              last_name: "",
              age: 22,
              cart: resultNewCart,
              email: profile._json.email,
              password: "",
              rol: "user",
            };
            let user = await userService.create(newUser);

            done(null, user);
          } else {
            done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userService.findById(id);
    done(null, user);
  });
};
export default initializePassport;
