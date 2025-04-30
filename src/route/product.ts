import { Router } from "express";
import { ProductController } from "../controller";
import { multerMiddleware } from "../middleware";

const router = Router()
router.use(multerMiddleware.single("image"))
router.post("/create", ProductController.create)
router.get("/products", ProductController.getAll)

export default router