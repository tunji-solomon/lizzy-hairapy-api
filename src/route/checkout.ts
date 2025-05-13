import { Router } from "express";
import { CheckoutController } from "../controller";
import { authMiddleware } from "../middleware";

const router = Router()

router.use(authMiddleware.authenticate)
router.get("/review", CheckoutController.reviewCart);
router.get("/payment", CheckoutController.payment)

export default router