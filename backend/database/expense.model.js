const { default: mongoose } = require("mongoose");

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
    }
})