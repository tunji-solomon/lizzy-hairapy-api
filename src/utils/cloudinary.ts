import { cloudinary } from "../config";
import { Response } from "express";

export const uploadToCloudinary = async (filePath : any, res: Response) => {

        const upload : any = await cloudinary.uploader.upload(filePath)

        return {
            imgUrl : upload.secure_url,
            publicId : upload.public_id
        };
}

export const deletFromCloudiary = async (public_id : string, res : Response) => {

    try {

        const result = await cloudinary.uploader.destroy(public_id)
        return result
        
    } catch (error : any ) {

        console.log("Cloudinary Error: ", error.message)
        return res.status(400).json({
            status: "Failed",
            message : "Something went wrong"
        })
        
    }


}