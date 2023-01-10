//Requires
const Joi = require("joi");
const Express = require("express");
const mongoose = require('mongoose')
const home = require('./routes/home')
const genres = require('./routes/genre')
const customers = require('./routes/customers')
const movies = require('./routes/movies')


mongoose.set('strictQuery', true);
const app = Express();

//uses
app.use(Express.json());
app.use('/vidly/api/genres',genres)
app.use('/', home)
app.use('/vidly/api/customers', customers)
app.use('/vidly/api/movies', movies)


mongoose.connect('mongodb://127.0.0.1:27017/Vidly')
.then(() => console.log("Vidly database connection passed"))
.catch(() => console.error("Vidly database connection failed"))

















const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to port ${port}`));
