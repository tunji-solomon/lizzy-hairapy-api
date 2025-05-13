import { OrderPayload } from "../interfaces";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema<OrderPayload>({

    username : {
        type : String,
        required : true
    },

    orderId : {
        type : String,
        required : true
    },

    totalCost : {
        type : Number,
        required : true
    },

    products : {
        type : Array,
        required : true
    },

    paymentReceiptUrl : {
        type : String,
        required : true
    },

    publicId : {
        type : String,
        required :true
    },

    paymentConfirmed : {
        type : Boolean,
        required : false,
        default : false
    }

},

{
     timestamps : true
}

)

const Order = mongoose.model<OrderPayload>("lizzy-orders", orderSchema)

export default Order