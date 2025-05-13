import { Response } from "express";
import { CartRepo, ProductRepo } from "../repository";


class CheckoutService {

    private readonly productRepo
    private readonly cartRepo

    constructor () {
        this.productRepo = new ProductRepo()
        this.cartRepo = new CartRepo()
    }

    async reviewCart (res : Response) : Promise<object> {

        const { id } = res.locals

        const cartItmes : any = await this.cartRepo.findByParameterOne(id)

        if (!cartItmes){
            return res.status(200).json({
                status : "Success",
                message : "User hasnt created cart yet. add products to create one"
            })
        }

        return res.status(200).json({
            status : "Success",
            message : "Cart items fetched successfully",
            cart : {
                count: cartItmes?.length,
                items : cartItmes
            }
        })
    }

    async payment (res : Response) : Promise<object> {

        return res.status(200).json({
            message : "Success",
            data : {
                'account name' : "Test",
                'Account number' : '###########',
                'Bank' : 'testBank'
            }
        })
    }
}

export default new CheckoutService ()