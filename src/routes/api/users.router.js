import Router, { response } from "express";
import User from "../../dao/models/users.model.js";
import { createHash, isValidPassword, uploader } from "../../utils.js";
import passport from "passport";
import { generarToken, authToken } from "../../utils.js";
import userController from "../../controlles/userController.js";

const router = Router();


router.delete('/users', userController.deleteInactiveUsersController);

router.delete('/users/:uid', userController.deleteUserIDController);

router.get('/users', userController.getUserAllController);

router.post('/users/:uid/documents', uploader.array('file'), userController.newDocumentService)

router.put('/users/premium/:uid', userController.modifyRoleController);


router.get("/current", userController.currentController);

router.post('/recoverPassword', userController.recoverPasswordController);


router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "faillogin" }),
  userController.loginController
);

router.get("/faillogin", userController.failLoginController);


router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "failregister" }),
  userController.registerController
);

router.get("/failregister", userController.failRegisterController);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  userController.githubController
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  userController.githubCallbackController
);

router.get("/logout", userController.logoutController);

export default router;
