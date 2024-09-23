import express from 'express';
import { Router } from 'express';
import cartService from '../services/cartsService.js'
import CustomError from '../services/errors/CustomError.js';
import EError from '../services/errors/enums.js';
import { addProductToCart } from '../services/errors/info.js';
const router = express.Router();

async function getAllCarts(req,  res){
    try {
        const carts = await cartService.getAllCartsService(); 
        res.json(carts)
    } catch (error) {
        req.logger.error("Error al listar carrito")
        res.json({respuesta:"Error al listar todo los carritos", error:error})
    }
}

async function getCartId(req, res){
    try {
        const idCart = req.params.cid;
        const cart = await cartService.getCartIdService(idCart);
        res.status(200).json(cart)
    } catch (error) {
        res.json({respuesta:"Error al listar el carrito", error:error})
    }
}

async function newCart(req, res){
    try {
        const newCart = req.body;
        const resultNewCart = await cartService.newCartService(newCart);
        res.status(200).json(resultNewCart);
    } catch (error) {
        res.json({respuesta:"error create cart", error:error})
    }
}

async function newProductToCart(req, res){
    try {
        let idCart = req.params.cid;
        let idProduct = req.params.pid;
        console.log("I del producto", idCart)
        const resultCart = await cartService.newProductToCartService(idCart, idProduct);
        res.json({result:"Succes", payload:resultCart}) 
    } catch (error) {
        CustomError.createError({
            name:"agregar producto al carrito error",
            cause: addProductToCart(),
            message:"El producto o carrito no existe",
            code:EError.INVALID_TYPES_ERROR
          })
    }
}

async function deletProdcutFromCart(req, res){
    try {
        let idCart = req.params.cid;
        let idProduct = req.params.pid;
        const resultCart = await cartService.deletProdcutFromCartService(idCart, idProduct);
        res.json({result:"Succes", payload:resultCart}) 
    } catch (error ) {
        res.json({respuesta:"error al eliminar un producto del carrito", error:error})
    }
}

async function deleteAllProductsFromCart(req, res){
    try {
        let idCart = req.params.cid;
        let resultCart = await cartService.deleteAllProductsFromCarService(idCart);
        res.send({status:"Succes", playload:resultCart});
    } catch (error) {
        console.log("Error al eliminar un producto", error)
    }
}

export default {
    getAllCarts,
    getCartId,
    newCart,
    newProductToCart,
    deletProdcutFromCart,
    deleteAllProductsFromCart
}