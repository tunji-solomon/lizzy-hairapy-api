import { OrderRepo, CartRepo } from "../repository";
import { Cloudinary, Tools } from "../utils";
import { Response } from "express";

class OrderService {

    private readonly orderRepo
    private readonly cartRepo

    constructor() {
        this.orderRepo = new OrderRepo()
        this.cartRepo = new CartRepo()
    }

    async create (req : any, res : Response) : Promise<object> {
        const { username, id } = res.locals

        const getCart = await this.cartRepo.findByParameterOne(id)
        if(!getCart){
            return res.status(400).json({
                status : "success",
                message : "User has not added any item to cart yet"
            })
        }

        const { imgUrl, publicId } = await Cloudinary.uploadToCloudinary(req.file.path, res)

        let payload = {

            username : username,
            orderId : Tools.generateId(),
            totalCost : getCart.total,
            products : getCart.cart,
            paymentReceiptUrl : imgUrl,
            publicId

        }

        await this.orderRepo.createOrder(payload)

        await this.cartRepo.deleteCart(getCart.id)

        return res.status(201).json({
            status : "Success",
            message : "Your order has been created, awaiting payment confirmation"
        })
    }
}

export default new OrderService()