import { Product } from "../model";

class ProductRepo {
    
    getAllProduct = async () => {
        return await Product.find();
    }

    AllProduct = async (sort : string,skip : number ,limit : number) => {
        return await Product.find().sort(sort).skip(skip).limit(limit)
    }
    
    findById =  async (id : string) => {
        const product : any = await Product.findById(id).select("-__v -createdAt -quantity")
        return product
    }
    
    findByParameterOne = async (parameter : string) => {
        return await Product.findOne({
            label: parameter
        })
    }
    
    findByParameterMany = async (parameter : any) => {
        if(parameter.label && parameter.price && parameter.isAvailable){
            return await Product.find({
                $and: [
                    {
                label: parameter.label,
                price: { $lte : parameter.price},
                isAvailable : parameter.isAvailable
                    }
                
            ]})
        }
        if(parameter.label && parameter.price){
            return await Product.find(
    
                {$and : [
                    { label: parameter.label },
                    { price:{ $lte : parameter.price} }
                ]}
            )
        }
    
        if(parameter.label && parameter.isAvailable){
            return await Product.find(
    
                {$and : [
                    { label: parameter.label },
                    { isAvailable: parameter.isAvailable }
                ]}
            )
        }
    
        if(parameter.price && parameter.isAvailable){
            return await Product.find(
    
                {$and : [
                    { price:{ $lte : parameter.price} },
                    { isAvailable: parameter.isAvailable }
                ]}
            )
        }
        if(parameter.label || parameter.price || parameter.isAvailable){
            return await Product.find(    
                {$or : [
                    { label: parameter.label || null },
                    { price:{ $lte : parameter.price || null}  },
                    { isAvailable: parameter.isAvailable || null }
                ]}
            )
        }
    
    }
    
    addProduct =  async (payload : any) => {
        return await Product.create(payload)
    }
    
    updateProduct =  async(parameter : string, payload : any) => {
        return await Product.updateOne({label:parameter},{
            price: payload?.price,
            quantity: payload?.quantity,
            isAvailable: payload?.isAvailable
        })
    }

    checkAvailability =  async(parameter : string) => {
        const checkAvailability : any = await Product.find({label:parameter})
        if(checkAvailability?.quantity < 1){
            await Product.findByIdAndUpdate(checkAvailability?.id,
                {isAvailable : false}
            )
            return false
        }
        return true
    }

    delete = async (id : string) => {
        return await Product.findByIdAndDelete(id)
    }

}


export default ProductRepo