import { Request, Response } from 'express';
import { CartService } from '../../service';
import { logger } from '../../utils/tools';


export const addToCart = async (req : Request, res : Response) => {

    try {
        const addProduct : any =  await CartService.addProduct(req.body, res)
        return addProduct; 
    } catch (error) {
        logger(error, res)          
    }
}

export const viewCart = async (req : Request, res : Response) => {

    try {
        const cart : any = await CartService.viewItems(res)
        return cart
    } catch (error) {
        logger(error, res)              
    }
}

export const removeItem = async (req : Request, res : Response) => {

    try {
        const removedItem : any = await CartService.removeItem(req.query, res)
        return removedItem   
    } catch (error) {
        logger(error, res)                  
    }
}

export const deleteCart = async (req : Request, res : Response) => {
    try {
        const delCart : any = await CartService.deleteCart(res);
        return delCart
    } catch (error) {
        logger(error, res)
    }
}

