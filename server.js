/* Package Imports */
const heroesData = require("./databases/heroes.json");
const bodyParser = require("body-parser");
const express = require("express");
const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hero_api",
    password: "1015",
    port: 5432,
});

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

app.get("/heroes", async (req, res) => {
    await pool.query(
        `SELECT 
            heroes.id, 
            heroes.name, 
            heroes.alias, 
            teams.name AS team, 
            ARRAY_AGG(powers.name) AS powers
        FROM heroes 
        LEFT JOIN teams ON teams.id = heroes.team_id
        JOIN heroes_powers ON heroes_powers.hero_id = heroes.id
        JOIN powers ON powers.id = heroes_powers.power_id 
        GROUP BY heroes.id, teams.id 
        ORDER BY heroes.id`, 
        (error, results) => {
            if (error) {
                console.error(error);
            }
            res.json(results.rows);
        });
});

app.post("/heroes", async (req, res) => {
    const data = req.body.data;

    // Check if the POST request has team in data object
    if (data.team) {
        // Create a new team if it doesn't already exist
        await pool.query(
            `INSERT INTO teams (name) SELECT '${data.team}'
                WHERE NOT EXISTS (
                    SELECT 1 FROM teams WHERE name = '${data.team}'
                )`,
            (error, results) => {
                if (error) {
                    console.error(error);
                }
            }
        );

        // Creates a new hero with a team referenced
        await pool.query(
            `INSERT INTO heroes (name, alias, team_id)
                VALUES (
                    '${data.name}',
                    '${data.alias}',
                    (SELECT id FROM teams WHERE name='${data.team}')
                )`,
            (error, results) => {
                if (error) {
                    console.error(error);
                }
            }
        );
    } else {
        // Creates a new hero without a team referenced
        await pool.query(
            `INSERT INTO heroes (name, alias)
                VALUES (
                    '${data.name}',
                    '${data.alias}'
                )`,
            (error, results) => {
                if (error) {
                    console.error(error);
                }
            }
        );
    }

    // Create new powers if needed and the relationship to the created hero
    if (data.powers.length) {
        for (const p of data.powers) {
            pool.query(
                `INSERT INTO powers (name) SELECT '${p}'
                  WHERE NOT EXISTS (
                    SELECT 1 FROM powers WHERE name = '${p}'
                  )`,
                (error, results) => {
                    if (error) {
                        console.error(error);
                    }
                }
            );

            pool.query(
                `INSERT INTO heroes_powers (hero_id, power_id)
                  VALUES (
                    (SELECT id FROM heroes WHERE name='${data.name}'),
                    (SELECT id FROM powers WHERE name='${p}')
                  )`,
                (error, results) => {
                    if (error) {
                        console.error(error);
                    }
                }
            );
        }
    }

    res.json(data);
});

app.get("/heroes/:id", async (req, res) => {
    const heroID = parseInt(req.params.id);

    await pool.query(
        `SELECT 
            heroes.id, 
            heroes.name, 
            heroes.alias, 
            teams.name AS team, 
            ARRAY_AGG(powers.name) AS powers
        FROM heroes 
        LEFT JOIN teams ON teams.id = heroes.team_id
        JOIN heroes_powers ON heroes_powers.hero_id = heroes.id
        JOIN powers ON powers.id = heroes_powers.power_id
        WHERE heroes.id = ${heroID}
        GROUP BY heroes.id, teams.id 
        ORDER BY heroes.id`, 
        (error, results) => {
            if (error) {
                console.error(error);
            }
            res.json(results.rows);
        });
});

app.put("/heroes/:id", async (req, res) => {
    const data = req.body.data;
    const heroID = parseInt(req.params.id);

    // Update/insert TEAMS
    if (data.team) {
        await pool.query(`INSERT INTO teams (name) SELECT '${data.team}'
                            WHERE NOT EXISTS (SELECT 1 FROM teams WHERE name = '${data.team}')`,
            (error, results) => {
                if (error) {
                    console.error(error);
                }
        });

        await pool.query(`UPDATE heroes SET 
                            name = '${data.name}', 
                            alias = '${data.alias}', 
                            team_id = (SELECT id FROM teams WHERE name = '${data.team}') WHERE id = ${heroID}`,
            (error, results) => {
                if (error) {
                    console.error(error);
                }
        });
    } else {
        await pool.query(`UPDATE heroes SET 
                            name = '${data.name}', 
                            alias = '${data.alias}', 
                            team_id = (SELECT id FROM teams WHERE name = '${data.teamnm}') WHERE id = ${heroID}`,
            (error, results) => {
                if (error) {
                    console.error(error);
                }
        });
    }

    // DELETE existing heroes_powers relationships
    await pool.query(
        `DELETE FROM heroes_powers WHERE hero_id = ${heroID}`,
        (error, results) => {
            if (error) {
                console.error(error);
            }
        }
    );

    // insert POWERS + relationship
    if (data.powers) {
        for (const power of data.powers) {
            await pool.query (`INSERT INTO powers (name) SELECT '${power}'
                            WHERE NOT EXISTS (SELECT 1 FROM powers WHERE name = '${power}')`,
                (error, results) => {
                    if (error) {
                        console.error(error);
                    }
                });

            // heroes_powers relationship
            await pool.query (`INSERT INTO heroes_powers (hero_id, power_id)
                                VALUES ((SELECT id FROM heroes WHERE name = '${data.name}'), 
                                (SELECT id FROM powers WHERE name = '${power}'))`, 
                (error, results) => {
                    if (error) {
                        console.error(error);
                    }
                });
        }
    }

    res.json(req.body.data);
});

app.delete("/heroes/:id", async (req, res) => {
    const heroID = parseInt(req.params.id);

    await pool.query (`DELETE FROM heroes WHERE EXISTS id = ${heroID}`,
        (error, results) => {
            if (error) {
                console.error(error);
            }
        });

    pool.query (`DELETE FROM heroes_powers WHERE EXISTS id = ${heroID}`,
        (error, results) => {
            if (error) {
                console.error(error);
            }
        });

    res.send(`Hero ID: ${heroID} has been deleted.`)
});

/* Server Listening on Port */
app.listen(port, () => {
    console.log(`Server listening at: http://localhost:${port}`);
});

// heroes_powers relationship deletion
// what about if incomplete data insertion = ???
// DELETE route logic