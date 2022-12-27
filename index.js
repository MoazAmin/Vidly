const Joi = require('joi');
const Express = require("express");
const app = Express();

app.use(Express.json());

const port = process.env.PORT || 3000;

let genres = {
  "action": [
    {
      id: "1",
      name: "Mission Impossible 1",
      info: "A crazy guy who jumps and does stunts",
    },
    {
      id: "2",
      name: "Mission Impossible 2",
      info: "A crazy guy who jumps and does stunts again",
    },
  ],
  "horror": [
    {
      id: "3",
      name: "Scream 1",
      info: "A movie where people scream",
    },
  ],
  "comedy": [
    {
      id: "4",
      name: "Rush Hour 1",
      info: "Jackie Chan and I forgot being funny",
    },
  ],
};

let length_id = 4;
let length_gen = 3;



//Get

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Get all genres/movies
app.get("/vidly/api/genres", (req, res) => {
  res.send(genres);
});

//Get by genre
app.get("/vidly/api/:genres", (req, res) => {
    const genre = req.params.genres
    if (!genres[genre]) return res.status(404).send("Genre not found or not available")
    res.send(genres[genre])
});

//Get by ID 
// app.get("/vidly/api/:id", (req, res) => {
//     const identity = req.params.id
    
// }
// )

//POST 

app.post("/vidly/api/:genres", (req,res) => {
    //Getting the genre
    const genre = req.params.genres
    if (!genres[genre]) return res.status(404).send("Genre not found or not available")

    //Setting a skeletal 
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
            ,
        info: Joi.string().max(100).required()
    });

    //Validating 
    const { error, value } = schema.validate({ name: req.body.name , info: req.body.info });
    
    if({error}.error !== undefined) {
        res.status(400).send('Name must be more than 3 characters and Info musnt exceed a 100 charecters')
    } else {
    
    const movie = {
        id : length_id++,
        name: req.body.name,
        info:req.body.info
    } ;

    //Posting
    res.send(movie)
    genres[genre].push(movie)

}})

// //PUT
// app.put("/vidly/api/:id", (req,res) => {
//     //Check if params is there 
//     const identity = req.params.id;

// })

// app.listen(port,console.log(`Listening to port ${port}`))


// function findID(num) {
//     for (let i = 0; i < length_gen; index++) {
//         for (let i = 0; i < ; i++) {
//             const element = array[i];
            
//         }
//     }
// }