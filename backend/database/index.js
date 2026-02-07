const { default: mongoose } = require("mongoose");

require('dotenv').config()

const DB_URL = process.env.DB_URL

async function connectDB() {
    await mongoose.connect(DB_URL)    
}

module.exports = {connectDB}
