import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 20
    },
    amount : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : false,
        minLength : 2,
        maxLength : 45
    },
    date : {
        type : Date,
        default : Date.now()
    },
    
    // Foreign Ref
    categories : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category'
        }
    ]
})


const Expense = mongoose.model('Expense', expenseSchema)

export {Expense}