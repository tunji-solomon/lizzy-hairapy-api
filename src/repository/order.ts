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
}

export default OrderRepo