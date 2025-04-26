import { Product } from "../model";

class ProductRepo {

    async create(payload : any): Promise<object>{

        return await Product.create(payload)

    }

    async findOne (id : string) : Promise<any> {

        return await Product.findById(id)
    }

    async getAll () : Promise<object> {

        return await Product.find({})
    }

    async update (id : string, payload : any) : Promise<any> {

        return await Product.findByIdAndUpdate(id, {payload})
    }
}

export default ProductRepo