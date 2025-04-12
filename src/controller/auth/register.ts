import { AuthService } from "../../service";
import { Request, Response } from "express";

const register = async (req : Request, res : Response) :Promise<any> => {
    try {
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