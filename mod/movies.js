const mongoose = require('mongoose')
const joi      = require('joi')
const { genreScheama } = require('./genres')


const Movie = new mongoose.model("Movie", mongoose.Schema({
    title: {
        type: String,
        required : true,
        min : 3,
        max : 30,
        trim: true
    },
    genre : {
        type: genreScheama,
        required: true
    },
    numberInStock : {
        type : Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate :{
        type : Number,
        required: true,
        min: 0,
        max: 255
    }
}))

const Moiveschema =  joi.object({
        title: joi.string().min(5).max(50).required(),
        genreId: joi.string().required(),
        numberInStock : joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required()
    })



module.exports.Movie = Movie ;
module.exports.Moiveschema = Moiveschema ;
