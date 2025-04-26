import { ProductRepo } from "../repository";
import { Response } from "express";

class ProductService {
    private readonly productRepo;

    constructor(){
        this.productRepo = new ProductRepo()
    }

    async create (payload: any, res: Response) : Promise<object> {

        await this.productRepo.create(payload)

        return res.status(201).json({
            status : "Success",
            message : "Product added successfully"
        })
    }

    async allProducts (res : Response) :Promise<object> {

        const products = await this.productRepo.getAll()

        return res.status(200).json({
            status : "Success",
            message : "Products fetched successfully",
            data : products
        })
    }
}

export default new ProductService()