const mongoose = require('mongoose')
const joi      = require('joi')
const { genreScheama } = require('./genres')



const movieScheamaMongoose = new mongoose.Schema({
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
})

const Movie = mongoose.model('Movie', movieScheamaMongoose)

const Moiveschema =  joi.object({
        title: joi.string().min(5).max(50).required(),
        genre: joi.string().required().min(24).max(25),
        numberInStock : joi.number().min(0).required(),
        dailyRentalRate: joi.number().min(0).required() });

const titleScheama =  joi.object({
            title: joi.string().min(5).max(50).required()
        })

function validate(req) {
    return Moiveschema.validate(req)
}

function validateTitle(req){
    return titleScheama.validate(req)
}

module.exports.Movie = Movie ;
module.exports.validate = validate ;
module.exports.validateTitle = validateTitle ;
