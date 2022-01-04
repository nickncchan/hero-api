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

app.post("/heroes", (req, res) => {
    const newHero = req.body;
    newHero.id = heroesData.heroes.length + 1;
    heroesData.heroes.push(newHero);
    console.log(heroesData);
    console.log(req.body);
    res.json(newHero);
});

app.get("/heroes/:id", (req, res) => {
    const reqID = req.params.id;
    const hero = heroesData.heroes[reqID - 1];

    if (hero === undefined) {
        res.send('you\'ve gone too far');
    }

    res.json(hero);
});

app.put("/heroes/:id", (req, res) => {
    const reqID = req.params.id;
    const reqData = req.body;
    const heroesDatabase = heroesData.heroes;
    
    const findID = heroesDatabase.findIndex((hero) => hero.id === parseInt(reqID));
    
    const existingHero = heroesDatabase[findID];
    
    // Method 1
    for (const key in reqData) {
        existingHero[key] = reqData[key];
    }

    // Method 2
    // for (const key in reqData) {
    //     if (existingHero[key]) {
    //         existingHero[key] = reqData[key];
    //     }
    // }

    // Method 3
    // for (const key in existingHero) {
    //     if (reqData[key]) {
    //         existingHero[key] = reqData[key];
    //     }
    // }

    console.log(existingHero);
    res.json(existingHero);
});

/* Server Listening on Port */
app.listen(port, () => {
    console.log(`Server listening at: http://localhost:${port}`);
});

