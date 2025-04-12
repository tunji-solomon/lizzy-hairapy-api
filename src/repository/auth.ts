import { User } from "../model"
class AuthRepo {

    async create (payload : any) : Promise<object> {
        return await User.create(payload)
    }

    async getAll () : Promise<object> {
        return await User.find({}).select("-password -createdAt")
    }

    async findByParameter (parameter : any) : Promise<any> {
        return await User.findOne(
            {email : parameter}
        ).select("-password -createdAt")
    }

    async findPassword (parameter : any ) : Promise<any> {
        return await User.findOne(
            {email : parameter}
        )
    }
}

export default AuthRepo