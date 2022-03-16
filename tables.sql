-- DROPS all the tables if we need to reset our DB
-- Not needed, just included for ease of testing if we need to reset our DB data
DROP TABLE IF EXISTS heroes_powers;
DROP TABLE IF EXISTS heroes;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS powers;

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE heroes (
    id SERIAL PRIMARY KEY,
    name TEXT,
    alias TEXT,
    team_id INTEGER REFERENCES teams(id)
);

CREATE TABLE powers (
    id SERIAL PRIMARY KEY,
    name TEXT
);

-- ON DELETE CASCADE means that if the `hero` is deleted 
-- from the `heroes` table, we will also delete any entries
-- referencing the deleted hero.
CREATE TABLE heroes_powers (
    id SERIAL PRIMARY KEY,
    hero_id INTEGER REFERENCES heroes(id) ON DELETE CASCADE ,
    power_id INTEGER REFERENCES powers(id)
);