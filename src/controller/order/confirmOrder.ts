import { Response } from "express";
import { OrderService } from "../../service";
import { logger } from "../../utils/tools";

const confirmOrder = async (req : any, res : Response) : Promise<any> => {
    try {

        const confirm = await OrderService.confirmOrder(req.body, res);
        return confirm
        
    } catch (error) {
        logger(error, res)  
    }
}

export default confirmOrder;