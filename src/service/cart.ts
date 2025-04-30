import { CartRepo, ProductRepo } from "../repository";
import { Response } from "express";


class CartService {

    private readonly productRepo;
    private readonly cartRepo

    constructor(){
        this.productRepo = new ProductRepo()
        this.cartRepo = new CartRepo()
    }

    addProduct = async (payload : any, res : Response) => {
        
        const { productId, quantity } = payload
        const { id } = res.locals

        const getProduct : any =  await this.productRepo.findById(productId)
        if(!getProduct){
            return res.status(404).json({
                status: "Failed",
                message: "Product with Id not found"
            })
        }

        if(getProduct.isAvailable === false)return res.status(404).json({
            status: 'failed',
            message: `Item: ${getProduct.label} is out of stock now, try some other time.`
        })

        const product = {
            id:getProduct?.id,
            label: getProduct?.label,
            price: getProduct?.price,
            quantity: Number(quantity) || 1
        }

        delete payload.id
        payload.cart = product
        payload.total = product?.price * product.quantity

        const existingCart : any = await this.cartRepo.findByParameterOne(id);
        if(existingCart){
           const existingProduct = existingCart.cart.find((item : any) => item.id === product.id)

            if(existingProduct){
                existingProduct.quantity += product.quantity;
                existingProduct['totalOrderPrice'] = payload.total
                await this.cartRepo.updateOne(id,existingProduct)
            }else{
                await this.cartRepo.addProduct(id,payload)
            }
            
        }else{
            payload.userId = id
            await this.cartRepo.addProduct(id,payload);
        }

        const updatedCart : any = await this.cartRepo.findByParameterOne(id)
        return res.status(200).json({
            status: "Success",
            message: "Product added to cart",
            cart: updatedCart
        })


    }

    viewItems = async (res : Response) => {

        const { id } = res.locals

        const existingCart : any = await this.cartRepo.findByParameterOne(id)
        if(!existingCart){
            return res.status(404).json({
                status: "Failed",
                message: "User does not have any existing cart. add items now to create one"
            })
        }
        return res.status(200).json({
            status: "Success",
            message: "Cart records fetched successfully",
            cart: existingCart
        })
    }

    removeItem = async (payload : any, res : Response) => {

        const { id, quantity } = payload;
        const { userId } = res.locals.user
        const productExist : any = await this.productRepo.findById(id)
        if(!productExist){
            return res.status(404).json({
                status: 'Failed',
                message: "Product not found"
            })
        }

        const getCart : any = await this.cartRepo.findByParameterOne(userId)
        if(!getCart){
            return res.status(404).json({
                status: 'Failed',
                message: 'User has not added any item yet'
            })
        }

        if(getCart?.cart.length === 0){
            return res.json({
                message: 'Cart is empty'
            })
        }

        const isItemExist : any  = getCart.cart.find((item : any) => item.id === productExist.id)
        if(!isItemExist) return res.status(404).json({
            status: 'Failed',
            message: "Cart does not contain the given item"
        })

        if(isItemExist.quantity < quantity)return res.status(500).json({
            status: 'Failed',
            message: `Item in cart: ${isItemExist.quantity} is less than quantity selected to be removed:${quantity}`
        })

        productExist['quantity'] = quantity
        await this.cartRepo.removeItem(userId,productExist)

        const updatedCart = await this.cartRepo.findByParameterOne(userId)
        return res.status(201).json({
            status: 'Success',
            message: 'Item removed from cart',
            cart: updatedCart

        })

    }

    deleteCart = async(res : Response) => {

        const { id } = res.locals
        const getCart : any = await this.cartRepo.findByParameterOne(id)
        if(!getCart) return res.status(404).json({
            status: 'failed',
            message: `user hasn't created any cart yet`
        })
        await this.cartRepo.deleteCart(getCart?.id)
        return res.status(201).json({
            status: 'Success',
            message: "Cart deleted successfully"
        })
    }
}
export default new CartService()