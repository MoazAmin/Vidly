const mongoose = require('mongoose')
const joi      = require('joi')

const customerSchemaMongoose = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        min : 3,
        max : 30
    },
    phone : {
        type: String,
        required : true
    },
    isGold : {
        type: Boolean,
        required : true 
    }
})
const Customer = mongoose.model('Customer', customerSchemaMongoose)

const customerSchema = joi.object({
    name : joi.string()
    .min(3)
    .max(30)
    .required(),

    phone: joi.string()
    .min(10)
    .max(10)
    ,
    isGold : joi.boolean()
})

function validate(req) {
    return customerSchema.validate(req)
}

module.exports.Customer = Customer ;
module.exports.validate = validate ;
