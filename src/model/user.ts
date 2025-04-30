import mongoose from 'mongoose'
import { UserPayload } from '../interfaces'

const userSchema = new mongoose.Schema<UserPayload>({

    username : {
        type : String,
        required : true,
        trim : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true
    },
    
    role : {
        type : String,
        default : "user"
    }

},

{
    timestamps : true,

}

)

const User = mongoose.model<UserPayload>('lizzy-user', userSchema)

export default User