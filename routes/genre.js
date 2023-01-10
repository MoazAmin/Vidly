const {Genre, genreSchema } = require('../mod/genres')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error, value } = genreSchema.validate({name: req.body.name})
  if(error) {
    return res.status(400).send(error.message)
}
else {
  let genre_new = new Genre({
    name: req.body.name
  })
  await genre_new.save()
  res.send(genre_new)
}
})
  

router.put('/:id', async (req, res) => {
  const genre = Genre.findById({_id: req.params.id})
  const new_genre = req.body.name;
  const { error, value }  = genreSchema.
  validate({name : req.body.name}) ;
  if(error) {
      return res.status(400).send(error.message)
  }
  else {
    await Genre.findByIdAndUpdate({_id : req.params.id}, { name: new_genre})
  }
})

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});


module.exports = router;

