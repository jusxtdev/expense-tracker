const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true,
    },
    firstName : {
        type : String,
        required : true,
        minLenght : 2,
        maxLength : 20
    },
    lastName : {
        type : String,
        required : false,
        minLength : 2,
        maxLength : 20
    },
    hashedPass : {
        type : String,
        required : true,
        minLength : 6,
    },
})

const User = mongoose.model('User', UserSchema);

module.exports = User