import { Router } from "express";
import mockingController from "../../controlles/mockingController.js";

const router = Router();

router.get('/mockingproducts', mockingController.mockingController)


export default router;