import { UserPayload } from "../interfaces";
import Joi from 'joi';

class AuthSchema {
    static passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\dA-Za-z]).{8,15}$/

    register = (payload : UserPayload) => {
        const Schema : Joi.ObjectSchema = Joi.object({
            username : Joi.string()
                        .label("Please enter username")
                        .required(),
            email : Joi.string()
                        .label("Enter a valid email")
                        .email({ minDomainSegments : 2, tlds : { allow : ["com", "io", "org"]}})
                        .required(),
            password : Joi.string()
                        .label("Password must contain special character and must be minimum of 8")
                        .pattern(AuthSchema.passwordRegex)
                        .required(),
            role : Joi.string(),
            confirm :  Joi.ref("password")

        }).with("password", "confirm")

        return Schema.validate(payload)
    }
}

export default new AuthSchema ()