import express, { Express} from 'express'
import { env } from './config'
import routes from './route'
import { dbConnect } from './datasource'


const Port = env.PORT || 1998
const app : Express = express ()

// database connection
dbConnect()

app.get('', (req : any , res : any) => {
    res.json({
        message : " Welcome to Lizzy Hairapy"
    })
})

app.use(express.json())
app.use('/', routes)

app.listen(Port, ()=> {
    console.log(`App listening at port:${Port}`)
})



