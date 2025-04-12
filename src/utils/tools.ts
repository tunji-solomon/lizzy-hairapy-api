import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken'
import { env } from '../config';

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

export {
    hashPassword,
    comparePassword,
    generateToken
}