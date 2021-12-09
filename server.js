const heroesData = require("./databases/heroes.json");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("bye world");
});

app.get("/heroes", (req, res) => {
    res.json(heroesData);
});

app.listen(port, () => {
    console.log(`Server listening at: http://localhost:${port}`);
});