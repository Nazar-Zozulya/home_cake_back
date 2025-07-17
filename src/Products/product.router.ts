import { Router } from "express";
import { productController } from "./product.controller";



const router = Router()


router.get("/all", productController.getAllProducts)
router.post("/create", productController.createProduct)
router.get("/:id", productController.getProductById)


export default router;