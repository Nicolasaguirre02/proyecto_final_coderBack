import { mailCuentaInactiva } from "../../utils.js";


export default class UserRepository{
    constructor(model){
        this.model = model
    };

    async getUserAllModel(){
        return await this.model.find({}, { first_name: 1, last_name:1, rol:1 });
    }

    async deleteInactiveUsersModel(){

        const ahora = new Date();  
        const hace2Minutos = new Date(ahora.getTime() - 2 * 60 * 1000);  

        const documentosParaEliminar = await this.model.find({
            last_conecction: { $lt: hace2Minutos }  // Comparación de fecha
          });
        
        for (const usuario of documentosParaEliminar){
            await mailCuentaInactiva(usuario.email)
        }

        const resultado = await this.model.deleteMany({
            last_conecction: { $lt: hace2Minutos }
        });

        return resultado
    }

    async recoverPasswordRepository(mail){
        return await this.model.findOne(mail); 
    }

    async getUserIDRepository(id) {
        return await this.model.findById(id);
    }


    async modifyUser(userID, user) {
        return await this.model.updateOne({ _id: userID }, user);
    }


    async ultimaConexionModel(user){
        user.last_conecction = new Date();
        await user.save();
    }



    async deleteUserIDRepository(id) {
        await this.model.deleteOne({ _id: id });
      }

}