import cartsModel from "../dao/models/carts.model.js";
import CartRepository from "../dao/repositories/Carts.repository.js";
import CustomError from "./errors/CustomError.js";
import { addProductToCart } from "./errors/info.js";

const cartsData = new CartRepository(cartsModel);

async function getAllCartsService() {
  return await cartsData.getAllCartsData();
}

async function getCartIdService(idCart) {
  return await cartsData.getCartIdData(idCart);
}

async function getCartDetailsIdService(idCart) {
  return await cartsData.getCartDetailsIdData(idCart);
}


async function newCartService(newCart) {
  return cartsData.newCartData(newCart);
}

async function newProductToCartService(idCart, idProduct) {
  let cartSelect = await cartsData.getCartIdData(idCart); //Guarda el carrito seleccionado con el id del parametro
  let listProducts = cartSelect.products; //Guarda la LISTA de productos que tiene el carrito
  const existeProduct = listProducts.findIndex(
    (producto) => producto.product.toString() === idProduct
  );
  
  if (existeProduct > -1) {
    // Si el producto ya está en el carrito, actualiza la cantidad
    listProducts[existeProduct].quantity += 1;
  } else {
    // Si el producto no está en el carrito, agrégalo
    listProducts.push({ product: idProduct, quantity: 1 });
  }

  await cartsData.newProductToCartData(cartSelect);
  
  return cartSelect;
}

async function deletProdcutFromCartService(idCart, idProduct) {
  let cartSelect = await cartsData.getCartIdData(idCart);
  let listProducts = cartSelect.products;
  cartSelect.products = listProducts.filter(
    (producto) => producto.product != idProduct
  );
  await cartsData.deletProdcutFromCartData(cartSelect);
  return cartSelect;
}

async function deleteAllProductsFromCarService(idCart) {
  let cartSelect = await cartsData.getCartIdData(idCart);
  cartSelect.products = [];
  await cartsData.getCartIdData(cartSelect);
  return cartSelect;
}

export default {
  getAllCartsService,
  getCartIdService,
  newCartService,
  newProductToCartService,
  deletProdcutFromCartService,
  deleteAllProductsFromCarService,
  getCartDetailsIdService
};
