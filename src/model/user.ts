import mongoose from 'mongoose'
import { UserPayload } from '../interfaces'

const userSchema = new mongoose.Schema<UserPayload>({

    username : {
        type : String,
        required : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true
    }

},

{timestamps : true}

)

const User = mongoose.model<UserPayload>('user', userSchema)

export default User