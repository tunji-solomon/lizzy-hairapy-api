import { Response } from "express";
import { OrderService } from "../../service";
import { logger } from "../../utils/tools";

const createOrder = async (req : any, res : Response) : Promise<any> => {
    try {

        if(!req.file){
            return res.status(400).json({
                status : "Failed",
                message : "No file was uploaded"
            })
        }

        const createOrder = await OrderService.create(req, res)
        return createOrder
        
    } catch (error) {
        logger(error, res)
        
    }
}

export default createOrder