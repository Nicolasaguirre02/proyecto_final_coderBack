import userModel from "../dao/models/users.model.js";
import UserRepository from "../dao/repositories/Users.repositoy.js";

const userData = new UserRepository(userModel);

async function getUserAllService() {
    return await userData.getUserAllModel();
}

async function deleteInactiveUsersService() {
    return await userData.deleteInactiveUsersModel();
}

async function deleteUserIDService(userID) {
    return await userData.deleteUserIDRepository(userID);
}

async function recoverPasswordService(email){
    return await userData.recoverPasswordRepository(email);
}

async function getUserIdService(id){
    return await userData.getUserIDRepository(id)
}

async function putPasswordUserService(userID, user){
    return await userData.modifyUser(userID, user);
}

async function modifyRoleService(userId, user){
    return await userData.modifyUser(userId, user)
}

async function ultmaConexionSrvice(user){
   await userData.ultimaConexionModel(user)
}


export default {
    recoverPasswordService,
    putPasswordUserService,
    modifyRoleService,
    getUserIdService,
    ultmaConexionSrvice,
    getUserAllService,
    deleteInactiveUsersService,
    deleteUserIDService
}