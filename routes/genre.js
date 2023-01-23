const _ = require('lodash')
const {Genre, validate } = require('../mod/genres')
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const {error , value} = validate(req.body)
  if (error) return res.status(400).send(error.message)

  const genre = new Genre(_.pick(value,'name'))
  await genre.save()
  res.send(genre)
})
  

router.put('/:name', async (req, res) => {


  const genre = await Genre.findOne({name: req.params.name})
  if(!genre) return res.status(404).send("Genre not found")

  
  const {error , value} = validate(req.body)
  if (error) return res.status(400).send(error.message)

  genre.name = req.body.name
  await genre.save()
  return res.send(genre)
})

router.delete('/:name', async (req, res) => {
  const genre = await Genre.findOneAndDelete(req.params.name);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(`Deleted ${genre.name} genre`);
});



module.exports = router;

