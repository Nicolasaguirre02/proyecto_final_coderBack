import { Router } from "express";
import cartsModel from "../../dao/models/carts.model.js";
import cartsController from '../../controlles/cartsController.js';
import ticketController from "../../controlles/ticketController.js";
import mongoose from "mongoose";
import { authToken, isUser } from "../../utils.js";



const router = Router();

//Lista todos los carritos
router.get('/carts',  cartsController.getAllCarts);

//Mustra carrito por ID
router.get('/carts/:cid', cartsController.getCartId);

//Crea un nueco carrito
router.post('/carts', cartsController.newCart)

//Asigna un producto a un carrito
/* router.post('/carts/:cid/product/:pid', isUser, cartsController.newProductToCart) */
router.post('/carts/:cid/product/:pid', cartsController.newProductToCart)


//Finaliza el proceso de la compra creando un ticket
router.get('/:cid/purchase',authToken, ticketController.newTocketController);


//Elimina el producto del carrito
router.delete('/carts/:cid/product/:pid', cartsController.deletProdcutFromCart)

//Modifica el arreglo de productos
router.put('/carts/:cid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let idProduct = req.params.pid;
        let newListProducts = req.body;
        let cartSelect = await cartsModel.findById(idCart);
        cartSelect.products = newListProducts;
        await cartSelect.save();
        res.send({status:"Succes", playload:cartSelect});
    } catch (error) {
        console.log("Error al modificar el arreglo de productos", error)
    }
})


//Modifica la cantidad de un producto
router.put('/carts/:cid/product/:pid', async(req, res) => {
    try {
        let idCart = req.params.cid;
        let newQuantity = req.body;
        console.log(newQuantity.key)
        let idProduct = req.params.pid
        let cartSelect = await cartsModel.findById(idCart);
        let listProducts = cartSelect.products; 
        let productFromCart = listProducts.find(producto => producto.product == idProduct); 

        if(productFromCart){ 
            productFromCart.quantity = newQuantity.quantity;
        }else{ 
            res.send({status:"error", error:"No existe producto"});
        }

        await cartSelect.save();
        res.send({status:"Succes", playload:cartSelect});
    } catch (error) {
        console.log("Error al modificar el arreglo de productos", error)
    }
})


//Eliminar todos los productos del carrito
router.delete('/carts/:cid', cartsController.deleteAllProductsFromCart)



export default router