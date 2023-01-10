const mongoose = require('mongoose')
const joi      = require('joi')

const Customer = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        min : 3,
        max : 30
    },
    phone : {
        type: Number,
        required : true
    },
    isGold : {
        type: Boolean,
        required : true 
    }
})

const customerSchema = joi.object({
    name : joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    phone: joi.string()
    .min(10)
    .max(10)
    ,
    isGold : joi.boolean()
})



module.exports.Customer = Customer ;
module.exports.customerSchema = customerSchema ;
