const { default: mongoose, mongo } = require("mongoose");

const expenseSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    amount : {
        type : Number,
        required : true,
    },
    description : {
        type : String,
        required : false
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

module.exports = Expense