const { default: mongoose } = require("mongoose");
const config = require("../config");



const DB_URL = config.DB_URL

async function connectDB() {
    await mongoose.connect(DB_URL)    
}

module.exports = {connectDB}
