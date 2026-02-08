import mongoose from "mongoose";
import { DB_URL } from "../config.js";


async function connectDB() {
    await mongoose.connect(DB_URL)    
}

export { connectDB }
