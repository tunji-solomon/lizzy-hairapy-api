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

    async orders (res: Response): Promise<object> {

        const { username } = res.locals;
        
        const orders = await this.orderRepo.getAll(username);

        return res.status(200).json({
            status: "Success",
            message: "Order records fetched successfully",
            data: orders
        })
    }

    async getAll (res: Response, payload?: any): Promise<object> {

        let allOrders:any;

        if(payload){
            const { paymentConfirmed } = payload
            allOrders = await this.orderRepo.getAllByFilter(paymentConfirmed);

        }else{
            allOrders = await this.orderRepo.getAll();
        }

        return res.status(200).json({
            status: "Success",
            message: "All orders fetched successfully",
            data: allOrders
        })
    }

    async confirmOrder (payload: any, res: Response): Promise<object> {

        const { Id } = payload;

        const order = await this.orderRepo.update(Id)

        return res.status(200).json({
            status: "Success",
            message: "Order payment status confirmation successful",
            data: order
        })
    }
}

export default new OrderService()