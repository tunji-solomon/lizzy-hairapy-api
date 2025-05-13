import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { env } from '../config';
import { Response } from 'express';
import { idText } from 'typescript';

const hashPassword = async (password : string) : Promise<string> => {
    const salt = await bcrypt.genSalt(12)
    const hash = bcrypt.hash(password, salt)
    return hash
}

const comparePassword = async (PlainPassword : string, hashedPassword : string) : Promise<boolean> => {
    return await bcrypt.compare(PlainPassword,hashedPassword)
}

const generateToken = (payload : any, time : any) : string => {
    const token = jwt.sign(payload,String(env.JWT_SECRET), { expiresIn : time})
    return token
}

const checkToken = (req : any) => {

    const header = req.headers?.authorization
    
    if(header&& header.split(" ")[0] === "Bearer"
    ) {
        return header.split(" ")[1]
    }
        return null
}

const verifyToken = (token : string) : any => {

    return jwt.verify(token, String(env.JWT_SECRET))
}

const logger = (error : any, res : Response) => {
    console.log(`SERVER ERROR: `,error)
    return res.status(500).json({
        status: 'failed',
        message: 'something went wrong, Try again later'
    })  
}

const generateId = () => {

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz"
    let uniqueId = ""
    while (uniqueId.length < 6){
        let random = Math.floor(Math.random() * characters.length)
        uniqueId += characters[random]
    }
  
    return uniqueId
  
  }


export {
    hashPassword,
    comparePassword,
    generateToken,
    checkToken,
    verifyToken,
    logger,
    generateId
}