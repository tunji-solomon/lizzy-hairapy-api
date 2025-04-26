import { ProductService } from "../../service";
import { Request, Response } from "express";

const create = async (req : Request, res : Response) : Promise<any> => {

    try {

        const create = await ProductService.create(req.body, res)
        return create
        
    } catch (error) {
        console.log(error)

        res.status(400).json({
            status : "Failed",
            message : "Something went wrong please try again"
        })  
    }

}

export default create