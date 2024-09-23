import { fileURLToPath } from "url";
import { dirname } from "path";
const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname);
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { faker } from "@faker-js/faker";

import multer from "multer";


//Funcion para generar productos
export const generarProducts = () => {
  let product = [];

  for(let i =0; i < 100; i++){
    product.push(newProducts());
  }

  return product;
};

export const newProducts = ()=>{
  return {
    title: faker.commerce.productName(),
    price: faker.commerce.price(),
    disponible: faker.datatype.boolean()
  }
}




//Agregar conexion con el servidor de correo
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user:"aguirrenicolas135@gmail.com",
    pass:"lptg fdje wwrr gtgf"
  },
});

export async function mailCuentaInactiva(mail){
  try {
    await transport.sendMail({
      from: "holaaaa@coder.com",
      to: mail,
      subject: "Cuenta eliminada",
      html: `<h1>Se elimino tu cuenta</h1>
        <p>Su cuenta ha sido eliminada por inactividad</p>
        `,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

async function enviarMail(tiket) {
  try {
    await transport.sendMail({
      from: "holaaaa@coder.com",
      to: "aguirrenicolas135@gmail.com",
      subject: "Nuevo pedido",
      html: `<h1>Productos</h1>
        <p>Codigo ${tiket.code}</p>
        <p>Monto ${tiket.amount}</p>
        <p>purchaser ${tiket.purchaser}</p>
        <p>hora ${tiket.purchase_datetime}</p>
        `,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

//Middlware autorizacion a entpint products
const isAdmin = (req, res, next) => {
  //console.log("Esto se ejecuta desde la autorizacion", req.user.rol);
  if (!req.user) {
    return res.status(403).json({ error: "Debe iniciar sesion" });
  }
  if (req.user.rol === "premium") {
    next();
  } else {
    return res.status(403).json({ error: "Debe tener cuenta admin" });
  }
};
const isUser = (req, res, next) => {
  //console.log("Esto se ejecuta desde la autorizacion", req.user.rol);
  if (!req.user) {
    return res.status(403).json({ error: "Debe iniciar sesion" });
  }
  if (req.user.rol === "user") {
    next();
  } else {
   // console.log("error");
    return res.status(403).json({ error: "Debe tener cuenta admin" });
  }
};

//Generar un coidog aletaorio
const generarCodigo = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
//Devuelve true o false dependiendo si coincide o no
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

//---JWT
const PRIVATE_KEY = "nicolasContra";
const generarToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "24h" });
  //console.log("Funcion generar token ", token);
  return token;
};
const authToken = (req, res, next) => {
  const authHeader = req.cookies.token;

  if (!authHeader) return res.status(401).send({ error: "No auotrizadooo" });

  jwt.verify(authHeader, PRIVATE_KEY, (error, credenciales) => {
    if (error) return res.status(403).send({ error: "No autorizadoo" });
    //console.log("paso aut toejn");
    req.user = credenciales.user;
    next();
  });
};


const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, __dirname+'/nuevo/documents')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

export const uploader = multer({storage});
export default __dirname;
export { generarToken, authToken, generarCodigo, enviarMail, isAdmin, isUser };
