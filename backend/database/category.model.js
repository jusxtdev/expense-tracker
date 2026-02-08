import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },

    // foreign ref
    expenses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Expense'
        }
    ]
})


const Category = mongoose.model('Category', categorySchema)

export {Category}