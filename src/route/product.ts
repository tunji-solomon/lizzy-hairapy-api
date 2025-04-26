import { Router } from "express";
import { ProductController } from "../controller";

const router = Router()

router.post("/create", ProductController.create)
router.get("/products", ProductController.getAll)

export default router