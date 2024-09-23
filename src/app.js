import express from "express";
import mongoose from "mongoose";
import routerCarts from "./routes/api/carts.router.js";
import routerProducts from "./routes/api/products.router.js";
import routerView from "./routes/views.router.js";
import routerMessage from "./routes/api/messages.router.js";
import routerLogger from "./routes/api/loggerTest.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import messageModel from "./dao/models/messages.model.js";
import routerUser from "./routes/api/users.router.js";
import routerMocking from './routes/api/mocking.router.js'
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import { addLoger } from "./utils/logger.js";

import swaggerJSDoc from "swagger-jsdoc";
import SwageerUiExpress from "swagger-ui-express"


//Imports session
import cookieParse from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import { config } from "./config/config.js";

const puerto = config.port;
const mongoUrl = config.mongoUrl;

//Agregar conexion con el servidor de correo
/* const transport = nodemailer.createTransport({
  service:"gmail",
  port:587,
  auth:{
    user:"aguirrenicolas135@gmail.com",
    pass:"lptg fdje wwrr gtgf"
  }
})
 */
/* async function sendStartupEmail() {
  try {
    await transport.sendMail({
      from: "holaaaa@coder.com",
      to: "nico.aguirre02@hotmail.com",
      subject: "Probando2",
      html: `<h1>Holaaaaaaaa</h1>`,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
} 
sendStartupEmail() */


const app = express();
const httpServer = app.listen(puerto, async () => 
  console.log("Conectado en puerto 8080")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Conexion correta con db ecommerce");
  })
  .catch((error) => {
    console.log("Error al la coneccion con db ecommerce", error);
  });

//Session
app.use(cookieParse("claveSecreta"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://nicolas:Colon1905@cluster0.5kklvxo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 100,
    }),
    secret: "12345",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(addLoger)


const swaggerOtions = {
  definition:{
    openapi: "3.0.1",
    info:{
      title:"Documentacion",
      description:"Descripcion swagger"
    },
  },
  apis:[`src/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOtions);
app.use("/apidocs", SwageerUiExpress.serve, SwageerUiExpress.setup(specs))


app.use("/chat", routerView);
app.use("/", routerView);

app.use("/api", routerCarts);
app.use("/api", routerProducts);
app.use("/api", routerUser);
app.use("/api", routerMocking);
app.use("/api", routerLogger);


app.use("/api", routerMessage);

//Configucarion de hanlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  socketServer.emit("listMessage", await messageModel.find());

  socket.on("eliminarMessage", async (id) => {
    await messageModel.deleteOne({ _id: id });
    socketServer.emit("listMessage", await messageModel.find());
  });

  socket.on("newMessage", async (message) => {
    await messageModel.create(message);
    socketServer.emit("listMessage", await messageModel.find());
  });
});
