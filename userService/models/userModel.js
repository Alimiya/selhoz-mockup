const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    iin: { type: String},
    password: {type: String, required:true},
    subscription: {type: String, enum:["Free", "Lite", "Premium"], default:"Free"},
    subscriptionExpiry: {type: Date, default: Date.now},
    amount: {type:Number, default:0}
})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel