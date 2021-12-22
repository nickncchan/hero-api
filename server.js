/* Package Imports */
const heroesData = require("./databases/heroes.json");
const bodyParser = require("body-parser");
const express = require("express");

/* Express Server Initialization */
const app = express();

/* Middleware */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/* Global Variables*/
const port = 3000;


/* Endpoints/Routes */
app.get("/", (req, res) => {
    res.send("i hate superheroes");
});

app.get("/heroes", (req, res) => {
    res.json(heroesData);
});

app.get("/heroes/:id", (req, res) => {
    const heroID = req.params.id;
    const hero = heroesData.heroes[heroID - 1];
    if (hero === undefined) {
        res.send('you\'ve gone too far');
    }
    res.json(hero);
});

app.post("/heroes", (req, res) => {
    const newHero = req.body;
    newHero.id = heroesData.heroes.length + 1;
    heroesData.heroes.push(newHero);
    console.log(heroesData);
    res.json(newHero);
});


/* Server Listening on Port */
app.listen(port, () => {
    console.log(`Server listening at: http://localhost:${port}`);
});

