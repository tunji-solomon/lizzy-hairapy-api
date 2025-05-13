import { Router } from "express";
import { OrderController } from "../controller";
import { authMiddleware, multerMiddleware } from "../middleware";


const router = Router()
router.use(authMiddleware.authenticate)
router.post("/create", multerMiddleware.single("image"),OrderController.createOrder)

export default router
