const heroesData = require("./databases/heroes.json");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("i hate superheroes");
});

app.get("/heroes", (req, res) => {
    res.json(heroesData);
});

app.get("/heroes/:id", (req, res) => {
    const heroID = req.params['id'];
    const hero = heroesData.heroes[heroID - 1];
    if (hero === undefined) {
        res.send('you\'ve gone too far');
    }
    res.json(hero);
});

app.listen(port, () => {
    console.log(`Server listening at: http://localhost:${port}`);
});