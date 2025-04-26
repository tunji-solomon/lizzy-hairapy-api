import mongoose from "mongoose";
import { ProductPayload } from "../interfaces";

const productSchema = new mongoose.Schema<ProductPayload>({

    name : {
        type : String,
        required : true,
        trim : true
    },

    price : {
        type : Number,
        required : true,
    },

    quantity : {
        type : Number,
        required : true
    },

    category : {
        type : Array,
        required : true
    },

    image : {
        type : String,
        required : true
    }

})

const Product = mongoose.model<ProductPayload>("product", productSchema)

export default Product
