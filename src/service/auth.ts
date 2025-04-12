import { AuthRepo } from "../repository";
import { Response } from "express";
import { Tools } from "../utils";

class AuthService {
    private readonly authrepo;

    constructor() {
        this.authrepo = new AuthRepo ()
    }

    async register (payload : any, res : Response) : Promise<object> {

        const { email, password } = payload

        const isEmailExist = await this.authrepo.findByParameter(email)
        if(isEmailExist) return res.status(400).json({
            status: "Failed",
            message : "User with email already exist. please login"
        })

        const hashedPassword = await Tools.hashPassword(password)
        payload.password = hashedPassword

        const newUser: any = await this.authrepo.create(payload)
        return res.status(201).json({
            status : "Success",
            message : "Registration successful",
            newUser
        })
    }

    async login (payload : any, res : Response) : Promise<object> {

        const { email, password } = payload;

        const user : any = await this.authrepo.findPassword(email);
        if(!user) return res.status(400).json({
            status : 'Failed',
            message : 'User with email does not found'
        })

        const compare =  await Tools.comparePassword(password, user?.password)
        if(!compare) return res.status(400).json({
            status : 'Failed',
            message : "Invalid credentials"
        })

        const token = Tools.generateToken(
            {
                id : user.id,
                username : user.username,
                email : user.email
            },
            "30min"
        );

        return res.status(200).json({
            status : 'Success',
            message : 'Log in successfully',
            user : {
                Id : user.id,
                username : user.username,
                email : user.email
            },
            token
        })
    }
}

export default new AuthService()