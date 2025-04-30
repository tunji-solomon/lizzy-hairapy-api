import { Router } from "express";
import { ProductController } from "../controller";
import { multerMiddleware, authMiddleware } from "../middleware";

const router = Router()
router.get("/products", ProductController.allProduct)
router.use(authMiddleware.authenticate, authMiddleware.isAdmin, multerMiddleware.single("image"))
router.post("/add", ProductController.addProduct)
router.delete('/delete/:id',ProductController.deleteProduct)

export default router