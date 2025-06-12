import { Router } from "express";
import { OrderController } from "../controller";
import { authMiddleware, multerMiddleware } from "../middleware";

const router = Router()
router.use(authMiddleware.authenticate);
router.post("/create", multerMiddleware.single("image"),OrderController.createOrder);
router.get("/orders", OrderController.orders);
router.use(authMiddleware.isAdmin)
router.get("/getAll", OrderController.getAll);
router.post("/confirmOrder", OrderController.confirmOrder);

export default router
