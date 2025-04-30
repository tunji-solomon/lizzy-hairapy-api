import { TokenExpiredError } from "jsonwebtoken";
import { Tools } from "../utils";
import { NextFunction, Request, Response } from "express"

export const authenticate = (req : Request, res : Response, next : NextFunction) : any => {
    try {
        const token = Tools.checkToken(req)
        if(!token){

            return res.status(400).json({
                status : "Failed",
                message : "No token in header"
            })
        }
        res.locals = Tools.verifyToken(token)
        next()
    } catch (error) {
        if ( error instanceof(TokenExpiredError)){
            return res.status(400).json({
                status : "Failed",
                message : 'Token expired, Authorization failed',
                badToken : true
            })
        }
        else {
            return res.status(400).json({
                status : "Failed",
                message : "Invalid token"
            })
        }  
    }
}

export const isAdmin = (req : Request, res: Response, next : NextFunction) : any => {

    const { role } = res.locals
    if (role !== 'admin') {
        return res.status(400).json({
            status : "Failed",
            message : "Authorization denied"
        })
    }
    next()
} 