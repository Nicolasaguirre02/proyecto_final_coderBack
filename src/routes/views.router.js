import express from 'express';
import productModel from '../dao/models/products.model.js'
import userModel from '../dao/models/users.model.js';
import userService from '../services/userService.js';
/* import {estaAutenticado, noEstaAutenticado} from '../middleware/auth.js' */
import { authToken } from '../utils.js';
const router = express.Router();

router.get('/', authToken, (req, res) => {
    res.render('chat', {})
});

router.get('/products',authToken,async (req,res)=>{
    let page = parseInt(req.query.page);
    if(!page) page=1;
    //Lean es crucial para mostrar en Handlebars, ya que evita la "hidratación" del documento de mongoose,
    //esto hace que a Handlebars llegue el documento como plain object y no como Document.
    let result = await productModel.paginate({},{page,limit:5,lean:true})
    result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)

    res.render('products', {...result, user: req.user}); 
});

router.get('/eliminarUsuarios', async (req, res) => {
    let user = req.user
    let users = await userModel.find({}, { first_name: 1, last_name:1, rol:1 }).lean();


    // Verificar el rol del usuario
    if (user.rol === "user") {
        console.log("El usuario no tiene permiso para acceder a esta página:", user);
        return res.render('login'); 
    } else {
        return res.render('eliminarUsuarios', { users });
    }

})



router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/recoverPassword', (req, res) => {
    res.render('recoverPassword');
})





export default router;