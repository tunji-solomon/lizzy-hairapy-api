import { ProductService } from "../../service";
import { Response } from "express";

const allProduct = async (req : any, res : Response) : Promise<any> => {

    try {

        const allProduct = await ProductService.allProducts(req, res)
        return allProduct
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status : "Failed",
            message : "Something went wrong please try again"
        })  
    }

}

export default allProduct