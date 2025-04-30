import { Router } from "express";
import { CartController } from "../controller";
import { authMiddleware } from "../middleware";

const router = Router()

router.use(authMiddleware.authenticate)
router.post('/add', CartController.addToCart)
router.get('/view', CartController.viewCart)
router.delete('/delete', CartController.deleteCart)
router.post('/remove', CartController.removeItem)

export default router
