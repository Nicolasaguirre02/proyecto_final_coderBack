import express from "express";
import { Router } from "express";
import productsService from "../services/productsService.js";
import CustomError from "../services/errors/CustomError.js";
import { generarProductErrorInfo } from "../services/errors/info.js";
import EError from "../services/errors/enums.js";

const router = express.Router();

async function getProductsController(req, res) {
  try {
    let limite = parseInt(req.query.limit) || 10;
    let pagina = parseInt(req.query.page) || 1;
    let order = parseInt(req.query.order) || 1;
    let disponible = req.query.disponible || true;

    const respuestaProducto = await productsService.getProductsService(
      limite,
      pagina,
      order,
      disponible
    );

    res.send({ status: "Succes", playload: respuestaProducto });
  } catch (error) {
    res.json("Erro al listar productos", error);
  }
}

async function getProductId(req, res) {
  try {
    let productID = req.params.pid;

    let respuestaProducto = await productsService.getProductIdService(
      productID
    );

    if (!respuestaProducto) {
      res.send({ status: "error", error: "Producto no encontrado" });
    }
    res.send({ response: "Succes", playload: respuestaProducto });
  } catch (error) {
    res.json("error al buscar producto por ID", error);
  }
}

async function newProduct(req, res) {
  try {
    let { titulo, price, disponible } = req.body;

    if (!titulo || !price || !disponible) {
      CustomError.createError({
        name:"Error al crear el producto",
        cause: generarProductErrorInfo({titulo, price, disponible}),
        message:"Error al intentar crear producto",
        code:EError.INVALID_TYPES_ERROR
      })
    }
    let result = await productsService.newProductService({
      titulo,
      price,
      disponible,
    });
    res.json({ response: "Succes", playload: result });
  } catch (error) {
    req.looger.error("Error al crear un nuevo producto")
    res.json({ respuesta: "Error al crear un nuevo producto", error });
  }
}

async function putProduct(req, res) {
  try {
    let productID = req.params.pid;
    let productModificado = req.body;
    if (
      !productModificado.titulo ||
      !productModificado.price ||
      !productModificado.disponible
    ) {
      req.logger.warning("Faltan parametros")
      res.json({ status: "error", error: "Faltan parametros" });
    }
    let respuestaProduct = await productsService.putProductService(
      productID,
      productModificado
    );
    res.json({ status: "Succes", playload: respuestaProduct });
  } catch (error) {
    res.json({ respuesta: "Error al modificar el producto", error });
  }
}

async function deleteProduct(req, res) {
  try {
    let productID = req.params.pid;
    let resultado = await productsService.deleteProductService(productID);
    res.json({ status: "Succes", playload: resultado });
  } catch (error) {
    res.json({ status: "error", error: "Error al eliminar" });
  }
}

export default {
  getProductsController,
  getProductId,
  newProduct,
  putProduct,
  deleteProduct,
};
