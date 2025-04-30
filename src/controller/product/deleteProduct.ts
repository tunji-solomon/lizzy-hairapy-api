import { ProductService } from "../../service";
import { Request, Response } from "express";
import { logger } from "../../utils/tools";

const deleteProduct = async (req : Request, res : Response) : Promise<any> => {

    try {

        const deleted = await ProductService.deleteProduct(req, res)
        return deleted
        
    } catch (error) {
        logger(error, res) 
    }
}

export default deleteProduct