const Joi = require('joi');
const mongoose = require('mongoose');



const genreScheama = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreScheama)

const genreScheameJoi = Joi.object({
    name: Joi
    .string()
    .min(5)
    .max(50)
})

function validate(req) {
  return genreScheameJoi.validate(req)
}

  module.exports.Genre = Genre
  module.exports.validate = validate
  module.exports.genreScheama = genreScheama

