import { ProductRepo } from "../repository";
import { Response } from "express";
import { Cloudinary } from "../utils";

class ProductService {
    private readonly productRepo;

    constructor(){
        this.productRepo = new ProductRepo()
    }

    async addProduct (req : any, payload: any, res: Response) : Promise<object> {


        const { imgUrl, publicId } = await Cloudinary.uploadToCloudinary(req.file.path, res)

        payload.imgUrl = imgUrl,
        payload.publicId = publicId
        await this.productRepo.addProduct(payload)

        return res.status(201).json({
            status : "Success",
            message : "Product added successfully"
        })
    }

    async allProducts (req : any, res : Response) :Promise<object> {

        const Products = await this.productRepo.getAllProduct()
        if(Products.length === 0)return res.status(400).json({
            status: 'Success',
            message: 'No product has been added yet'
        })

        const page : any = req.query.page || 1;
        const limit : any = req.query.limit || 2;
        const skip : number = ( page -1 ) * limit;

        const sortBy : any = req.query.sortBy || 'createdAt';
        const sortOrder : any =  req.query.sortOrder === 'asc'? 1 : -1;
        const totalProduct = Products.length;
        const totalPages : number = Math.ceil(totalProduct/limit);
        const sortObj : any = {}
        sortObj[sortBy] = sortOrder

        const products = await this.productRepo.AllProduct(sortObj, skip, limit)

        return res.status(200).json({
            status : "Success",
            message: 'Products fetched succesfully',
            data: {
                products: products,
                page: page,
                totalPages,
            }
        })
    }

    async deleteProduct (req : any, res : Response) : Promise<any> {

        const { id } = req.params

        const isExist = await this.productRepo.findById(id)
        if(!isExist) {
            return res.status(404).json({
                status :"Failed",
                message : `Product with id : ${id} not found `
            })
        }

        await Cloudinary.deletFromCloudiary(isExist?.publicId, res)

        const deleted = await this.productRepo.delete(id)

        return res.status(200).json({
            status : "Success",
            message : "Product deleted successfully",
            data : deleted
        })
    }
}

export default new ProductService()