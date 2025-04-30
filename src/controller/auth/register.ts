import { AuthService } from "../../service";
import { Request, Response } from "express";
import { AuthSchema } from "../../schema";

const register = async (req : Request, res : Response) :Promise<any> => {
    try {
        const { error } = AuthSchema.register(req.body)
        if(error){
            return res.status(400).json({
                status : "Failed",
                message : error.details[0].context?.label === "confirm" ?
                        "Password and confirm password mismatch" :
                        error.details[0].context?.label
            })
        }
        const register = await AuthService.register(req.body, res)
        return register
        
    } catch (error : any) {
        console.log(error.message)
        return res.status(400).json({
            status : 'Failed',
            message : "Something went wrong, Please try"
        })    
    }
}

export default register