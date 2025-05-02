import { Request, Response } from "express";
import { CheckoutService } from "../../service";
import { logger } from "../../utils/tools";

export const reviewCart = async (req : Request, res : Response) : Promise<any> => {
    try {

        const reviewed = await CheckoutService.reviewCart(res)
        return reviewed
        
    } catch (error) {
        logger(error, res)
    }
}
