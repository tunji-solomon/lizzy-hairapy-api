import mongoose from 'mongoose';
import { env } from '../config';

const dbConnect = async () => {

    try {

        await mongoose.connect(env.DB_URL as string)
        console.log('Database connected successfully')
        
    } catch (error) {

        console.log('Error connecting to database')
        process.exit(1)
        
    }
}

export default dbConnect
