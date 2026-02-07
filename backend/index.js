const express = require('express')
const cors = require('cors')
const { rootRouter } = require('./routes/root')
const { connectDB } = require('./database')

const config = require('./config')

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

module.exports = { config }