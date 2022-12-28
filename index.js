const Joi = require("joi");
const Express = require("express");
const app = Express();

app.use(Express.json());

const port = process.env.PORT || 3000;

let genres = {
  action: [
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
  horror: [
    {
      id: "3",
      name: "Scream 1",
      info: "A movie where people scream",
    },
  ],
  comedy: [
    {
      id: "4",
      name: "Rush Hour 1",
      info: "Jackie Chan and I forgot being funny",
    },
  ],
};

let length_id = 4;

function getByID(identity) {
  for (let genre in genres) {
    for (let x in genres[genre]) {
      if (genres[genre][x].id === identity) {
        return genres[genre][x];
      }
    }
  }
  return false;
}

function getByIdGenre(identity) {
  for (let genre in genres) {
    for (let x in genres[genre]) {
      if (genres[genre][x].id === identity) {
        return genres[genre];
      }
    }
  }
  return false;
}

function getByIdIndex(identity) {
  for (let genre in genres) {
    for (let x in genres[genre]) {
      if (genres[genre][x].id === identity) {
        return x;
      }
    }
  }
  return false;
}

//Get

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Get all genres/movies
app.get("/vidly/api/genres", (req, res) => {
  res.send(genres);
});

// Get by ID
app.get("/vidly/api/id/:id", (req, res) => {
  const identity = req.params.id;
  const result = getByID(identity);
  if (result === false) {
    res.status(404).send("ID not found");
  }
  res.send(result);
});

//Get by genre
app.get("/vidly/api/:genres", (req, res) => {
  const genre = req.params.genres;
  if (!genres[genre])
    return res.status(404).send("Genre not found or not available");
  res.send(genres[genre]);
});

//POST

app.post("/vidly/api/:genres", (req, res) => {
  //Getting the genre
  const genre = req.params.genres;
  if (!genres[genre])
    return res.status(404).send("Genre not found or not available");

  //Setting a skeletal
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    info: Joi.string().max(100).required(),
  });

  //Validating
  const { error, value } = schema.validate({
    name: req.body.name,
    info: req.body.info,
  });

  if ({ error }.error !== undefined) {
    res
      .status(400)
      .send(
        "Name must be more than 3 characters and Info musnt exceed a 100 charecters"
      );
  } else {
    length_id = length_id + 1;
    const movie = {
      id: String(length_id),
      name: req.body.name,
      info: req.body.info,
    };

    //Posting
    res.send(movie);
    genres[genre].push(movie);
  }
});

// //PUT by ID
app.put("/vidly/api/:id", (req, res) => {
  //Check if params is there
  const identity = req.params.id;
  const result = getByID(identity);
  if (result === false) {
    return res.status(404).send("ID not found");
  }

  const genre = getByIdGenre(identity);
  const index = getByIdIndex(identity);

  //Updating
  //Setting a skeletal
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    info: Joi.string().max(100).required(),
  });

  //Validating
  const { error, value } = schema.validate({
    name: req.body.name,
    info: req.body.info,
  });

  if ({ error }.error !== undefined) {
    return res
      .status(400)
      .send(
        "Name must be more than 3 characters and Info musnt exceed a 100 charecters"
      );
  } else {
    const movie = {
      name: req.body.name,
      info: req.body.info,
    };

    //Posting
    res.send(movie);
    console.log(genre[index]);
    genre[index].name = req.body.name;
    genre[index].info = req.body.info;
  }
});

//Delete by Id

app.delete("/vidly/api/:id", (req, res) => {
  //Check if params is there
  const identity = req.params.id;
  const result = getByID(identity);
  if (result === false) {
    return res.status(404).send("ID not found");
  }
  const genre = getByIdGenre(identity);
  const index = getByIdIndex(identity);

  genre.splice(index,1)
  res.send(genres)
});

app.listen(port, console.log(`Listening to port ${port}`));
