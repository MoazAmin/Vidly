//Requires
const Express = require("express");
const mongoose = require('mongoose')


mongoose.set('strictQuery', true);

//Middlewear
const app = Express();
app.use(Express.json());

//Routes 
const genres = require('./routes/genre')
app.use('/vidly/api/genres',genres)
const home = require('./routes/home')
app.use('/', home)
const customers = require('./routes/customers')
app.use('/vidly/api/customers', customers)
const movies = require('./routes/movies')
app.use('/vidly/api/movies', movies)


mongoose.connect('mongodb://127.0.0.1:27017/Vidly')
.then(() => console.log("Vidly database connection passed"))
.catch(() => console.error("Vidly database connection failed"))

















const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to port ${port}`));
