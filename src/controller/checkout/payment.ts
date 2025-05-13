import { Request, Response } from "express";
import { CheckoutService } from "../../service";
import { logger } from "../../utils/tools";

const payment = async (req : Request, res : Response) : Promise<any> => {
    try {

        const reviewed = await CheckoutService.payment(res)
        return reviewed
        
    } catch (error) {
        logger(error, res)
    }
}

export default payment
