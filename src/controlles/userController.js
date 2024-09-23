import express from "express";
import UserDTO from "../dao/DTOs/user.dto.js";
import userService from "../services/userService.js";
import path from 'path'
import { Router } from "express";
import { generarToken, authToken, isValidPassword, createHash } from "../utils.js";

const router = express.Router();

async function getUserAllController(req, res) {
  try {
    let allUsers = await userService.getUserAllService();
    res.status(200).json({"status":"succes", "respuesta":allUsers})
  } catch (error) {
    res.status(500).json({ respuesta: 'No se pudo mostrar los usuarios '});
  }
}

async function deleteInactiveUsersController(req, res) {
  try {
    let respuesta = await userService.deleteInactiveUsersService();
    res.status(200).json({"status":"succes", "respuesta":respuesta})
  } catch (error) {
    res.status(500).json({ respuesta: 'Error al eliminar los usuarios'});
  }
}

async function deleteUserIDController(req, res) {
  try {
    let userID = req.params.uid;
    let respuesta = await userService.deleteUserIDService(userID);
    res.status(200).json({"status":"succes", "respuesta":respuesta})
  } catch (error) {
    res.status(500).json({ respuesta: 'Error al eliminar el usuarios'});
  }
}

async function newDocumentService(req,res) {
    try {
      let userId = req.params.uid;
      let usuario = await userService.getUserIdService(userId);
      let listaDocuments =  usuario.documents;
      let ubiacionAguardar = "../nuevo/documents"
      let listaArchivos = req.files;
     for(const file of listaArchivos){
        let objetoFile = {
          name: file.filename,
          reference:  `${ubiacionAguardar}/${file.filename}`
        };
        listaDocuments.push(objetoFile);
      }
     await userService.modifyRoleService(userId, usuario)
     res.status(200).json({"status":"succes", "respuesta":"Docuemntos cargados correctamente"})
    } catch (error) {
      res.status(500).json({ respuesta: 'No se pudo cargar el documento' });
    }
}


async function modifyRoleController(req, res){
  try {
    let userId = req.params.uid;
    let role = req.body.role;
    const user = await userService.getUserIdService(userId);
    //let listaDocuments =  user.documents;

    if(role != "user" && role != "premium"){
      res.status(400).json({ "sastus":"400", "respuesta": 'El usuario debe ser user o premium' });
      return
    }

    if(!user){
      res.status(400).json({ "sastus":"400", "respuesta": 'No existe usuario con este id' });
      return
    }
    /* console.log(listaDocuments.length)
    if(listaDocuments.length < 3 && role == "premium"){
      res.status(400).json({ "sastus":"400", "respuesta": 'Para ser premium se deben cargar los documentos faltantes' });
      return
    } */
    
    user.rol=role;
    await userService.modifyRoleService(userId, user)
    res.status(200).json({"status":"succes", "respuesta":user})
  } catch (error) {
    req.logger.error("No se puedo modificar el rol")
    res.status(500).json({ respuesta: 'No se puedo modificar el rol' });
  }
}

async function recoverPasswordController(req, res) {
  try {
    let { email, password } = req.body;

    const user = await userService.recoverPasswordService({email:email}); 
    const mismoPassword = isValidPassword(user, password);
    if(mismoPassword){
      res.status(400).json({ "sastus":"400", "respuesta": 'Tu contraseña no puede ser igual a la anterior' });
      return
    }

    const newPassword = createHash(password);
    user.password = newPassword;

    const respuestaPut = await userService.putPasswordUserService(user._id.valueOf(), user);

    res.status(200).json({"status":"succes", "respuesta":"Contraseña actualizada correctamente"})
} catch (error) {
    req.logger.error("No existe usuario con este mail")
    res.status(500).json({ respuesta: 'Error al actualizar la contraseña' });
}
}

async function loginController(req, res) {
  const loginUser = req.body;
  const user = req.user;
  console.log("user", user);
  let isAdmin = false;
  if (!loginUser.email || !loginUser.password)
    return res
      .status(400)
      .send({ status: "error", error: "Datos incompletos" });
  try {
    if (user._doc.rol === "premium") {
      isAdmin = true;
    }
    user._doc.tipoUsuario = isAdmin;

    const newToken = generarToken(user);

    await userService.ultmaConexionSrvice(user)
    
    res.cookie("token", newToken, { maxAge: 10000, httpOnly: true });
    res.redirect("/products");
  } catch (error) {
    res.json({ response: "Error", error: error });
  }
}

async function failLoginController(req, res) {
  res.json({ error: "Error login" });
}

async function currentController(req, res) {
  let {first_name, last_name, rol, cart} =  req.user;
  const registeredUser = new UserDTO({first_name, last_name, rol, cart})

  res.json({ status: "succes", playload: registeredUser });
}

//Esta funcion direcciona al login al crear un usuario por la web
 async function registerController(req, res) {
  res.redirect("/login"); 
} 

//Esta funcion me retorna el nuevo usaurio creado, lo utilizo para los test
/* async function registerController(req, res) {
  const newUser = req.body
  res.json({ status: "succes", playload: newUser });
} */


async function failRegisterController(req, res) {
  res.send({ error: "Fallo" });
}

async function githubController(req, res) {
  res.redirect("/products");
}

async function githubCallbackController(req, res) {
  let user = req.user;
  let newToken = generarToken(user);
  res.cookie("token", newToken, { maxAge: 10000, httpOnly: true });

  res.redirect("/products");
}

async function logoutController(req, res) {
  req.session.destroy(async(err) => {
    const user = req.user;
    await userService.ultmaConexionSrvice(user)
    if (err) return res.status(500).send("Error al cerrar sesion");
    res.redirect("/login");
  });
}

export default {
  loginController,
  failLoginController,
  currentController,
  registerController,
  failRegisterController,
  githubController,
  githubCallbackController,
  logoutController,
  recoverPasswordController,
  modifyRoleController,
  newDocumentService,
  getUserAllController,
  deleteInactiveUsersController,
  deleteUserIDController
};
