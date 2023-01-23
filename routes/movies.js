const { Movie, validate, validateTitle} = require ('../mod/movies')
const { Genre } = require('../mod/genres')
const express = require('express')
const router = express.Router()

router.get('/', async (req,res) => {
    const movies = await Movie.find().sort('name')
    return res.send(movies) 
})

router.post('/', async (req,res) => {
    const { error, value }  = validate(req.body)
    if(error) return res.status(400).send(error.message)

    const genre = await Genre.findById((req.body.genre))
    if(!genre) return res.status(400).send("Genre not found")
    
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id : genre._id,
            name: genre.name
        },
        numberInStock : req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    await movie.save()
    res.send(movie)
})

router.put('/:id', async (req,res) => {

    const {error, value} = validateTitle(req.body)
    if(error) return res.status(400).send(error.message)

    const movie = await Movie.findByIdAndUpdate({_id : req.params.id}, {
         $set: { title: req.body.title }
        })

    if(!movie) return res.status(400).send("Genre ID not found")

    return res.send(movie)
})

router.delete('/:id', async (req,res) => {
    const movie = await Movie.findByIdAndRemove({_id: req.params.id})
    if(!movie) return res.status(400).send("Movie ID not found")

    return res.send(`Deleted ${movie.title} successfully`)
})






















module.exports = router;