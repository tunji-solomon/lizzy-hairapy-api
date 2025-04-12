import { AuthService } from "../../service";
import { Request, Response } from "express";

const login = async (req : Request, res : Response) :Promise<any> => {
    try {
        const login = await AuthService.login(req.body, res)
        return login
        
    } catch (error : any) {
        console.log(error.message)
        return res.status(400).json({
            status : 'Failed',
            message : "Something went wrong, Please try"
        })    
    }
}

export default login

