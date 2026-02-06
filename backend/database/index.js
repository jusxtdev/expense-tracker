const { default: mongoose } = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)

const UserSchema = mongoose.model('User', new mongoose.Schema({
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
        minLenght : 2,
        maxLength : 20
    },
    hashedPass : {
        type : String,
        required : true,
        minLenght : 6,
    }
}))

UserSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 0 })

const User = mongoose.model('User', UserSchema);

module.exports = User