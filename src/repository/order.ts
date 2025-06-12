import { Order } from "../model";

class OrderRepo {

    async createOrder (payload : any) : Promise<object> {
        return await Order.create(payload)
    }

    async findById (id : string) : Promise<any> {
        return await Order.findById({ id })
    }

    async findByParameter (parameter : string) : Promise<any> {
        return await Order.findOne(
            {userId : parameter}
        )
    }

    async getAll (parameter?: string): Promise<object> {
        if (parameter){
            return await Order.find({username: parameter})
        }
        return await Order.find()
    }

    async getAllByFilter (parameter: any): Promise<object> {
        return await Order.find({paymentConfirmed: parameter})
    }

    async update (Id: string): Promise<object> {
        return await Order.updateOne({ id:Id },
            {paymentConfirmed: true}
        )
    }
}

export default OrderRepo