import { ProductService } from "../../service";
import { Response } from "express";

const addProduct = async (req : any, res : Response)  : Promise<any> => {

    try {

        if(!req.file){
            return res.status(400).json({
                status : "Failed",
                message : "No file was uploaded"
            })
        }

        const create = await ProductService.addProduct(req, req.body, res)
        return create
        
    } catch (error) {
        console.log(error)

        res.status(400).json({
            status : "Failed",
            message : "Something went wrong please try again"
        })  
    }

}

export default addProduct