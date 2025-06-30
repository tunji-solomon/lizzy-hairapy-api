import { createClient} from 'redis';
import { env } from '../config';

const redisClient = createClient({
    socket: {
        host: String(env.REDIS_HOST),
        port: Number(env.REDIS_PORT)
    }
})

redisClient
        .connect()
        .then(()=> console.log("Redis connected successfully"))
        .catch((err) => console.log("Error connecting to redis", err) )

export default redisClient;


