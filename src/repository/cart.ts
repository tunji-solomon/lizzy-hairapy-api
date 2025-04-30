import { Cart } from "../model"

class CartRepo {

    addProduct = async (id : string, payload : any) => {
        
        const cartExist : any = await Cart.findOne({userId:id}).select('-userId -_id -__v')
        if(!cartExist){
            return await Cart.create({
                userId: payload.userId,
                cart: payload.cart,
                total: payload.total
            })
        } 
        
        cartExist?.cart.push(payload.cart);
        const update : any = cartExist?.cart;
        const total : number = payload.total + cartExist?.total
        return await Cart.updateOne({ userId:id},
            {
                cart: update,
                total: total
            }
        )

    }


    findByParameterOne = async (parameter : any) => {
        return await Cart.findOne({
            $or: [
                {_id: parameter},
                {userId: parameter},
            ]
        })
  
    }


    updateOne = async (id : string, payload : any) => {
        const cartExist : any = await Cart.findOne({userId:id}).select('-userId  -_id -__v')
        for(let i=0; i < cartExist.cart.length; i++){
            if(cartExist.cart[i].id  === payload.id){
                cartExist.cart[i] = {
                    id : payload.id,
                    label : payload.label,
                    price : payload.price,
                    quantity : payload.quantity
                }
            }

             cartExist.cart[-1] = payload
        }
        const total : number = cartExist.total + payload.totalOrderPrice
        const update : any = cartExist?.cart;
        return await Cart.updateOne({userId:id},
            {
                cart : update,
                total : total

            }
        )   
    }

    removeItem = async (id : string, payload : any) => {
        const existingCart : any = await Cart.findOne({userId : id}).select('-userId  -_id -__v')
        let updateCart;
        updateCart = existingCart?.cart.filter((item : any ) => {
            if(item.id === payload.id){
                if(item.quantity > 1){
                    item.quantity = item.quantity - payload.quantity
                }else{
                    const newCart : any = existingCart.cart.splice(existingCart.cart.indexOf(item), 1)
                    return

                }
            }
            return item
            })

        const total : number = existingCart?.total - (payload.price * payload.quantity)
        return await Cart.updateOne({userId : id},
            {
                cart : updateCart,
                total : total
            }
        )
    }

    deleteCart = async (id : string) => {
        return await Cart.findByIdAndDelete(id)
    }
}

export default CartRepo