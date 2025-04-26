import { ProductService } from "../../service";
import { Request, Response } from "express";

const getAll = async (req : Request, res : Response) : Promise<any> => {

    try {

        const getAll = await ProductService.allProducts(res)
        return getAll
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status : "Failed",
            message : "Something went wrong please try again"
        })  
    }

}

export default getAll