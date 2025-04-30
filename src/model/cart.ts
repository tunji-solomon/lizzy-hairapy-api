import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: String,
    cart: Array,
    total: Number,
    isCheckout: { type: Boolean, default : false }
    },
    {
    timestamps : true
    }
)

const Cart = mongoose.model("lizzy-cart", cartSchema)

export default Cart