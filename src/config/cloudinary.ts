import cloudinaryModule from "cloudinary";
import env from './env'

const cloudinary = cloudinaryModule.v2
cloudinary.config(String(env.CLOUDINARY_URL))

export default cloudinary