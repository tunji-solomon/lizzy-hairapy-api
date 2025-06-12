import { Response } from "express";
import { OrderService } from "../../service";
import { logger } from "../../utils/tools";

const orders = async (req : any, res : Response) : Promise<any> => {
    try {

        const createOrder = await OrderService.getAll(res, req.body);
        return createOrder
        
    } catch (error) {
        logger(error, res)  
    }
}

export default orders;