import { Router, raw, response } from "express";
import productsModel from "../../dao/models/products.model.js";
import productsController from "../../controlles/productsController.js";
import mongoose from "mongoose";
import { isAdmin } from "../../utils.js";

const router = Router();


router.get("/products", productsController.getProductsController);

router.get("/products/:pid", productsController.getProductId);

/* router.post("/products", isAdmin, productsController.newProduct);  */
 router.post("/products", productsController.newProduct); 
/* 
router.put("/products/:pid", isAdmin, productsController.putProduct); */
router.put("/products/:pid", productsController.putProduct);

router.delete("/products/:pid",isAdmin, productsController.deleteProduct);


export default router;
