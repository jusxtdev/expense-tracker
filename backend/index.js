import express from 'express'
import cors from 'cors'
import { rootRouter } from './routes/root.js'
import { connectDB } from './database/index.js'
import { DB_URL, JWT_SECRET } from './config.js'

const app = express()

async function createConnectiontoDB(){
    try {
        await connectDB()
    } catch (err){
        console.log(err)
    }
}
createConnectiontoDB()

app.use(express.json())
app.use(cors())
app.use('/api/v1', rootRouter)



app.listen(3000, () => console.log('Backend server running on port 3000'))

export { DB_URL, JWT_SECRET }