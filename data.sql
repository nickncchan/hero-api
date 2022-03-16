-- Teams Data
INSERT INTO teams (name)
    VALUES ('Avengers');
    
INSERT INTO teams (name)
    VALUES ('X-Men');


-- Heroes Data
INSERT INTO heroes (name, alias, team_id)
    VALUES ('James ''Logan'' Howlett', 'Wolverine', (SELECT id FROM teams WHERE name = 'Avengers'));

INSERT INTO heroes (name, alias, team_id)
    VALUES ('Peter Parker', 'Spider-Man', (SELECT id FROM teams WHERE name = 'X-Men'));

INSERT INTO heroes (name, alias, team_id)
    VALUES ('Thor Odinson', null, (SELECT id FROM teams WHERE name = 'Avengers'));

INSERT INTO heroes (name, alias, team_id)
    VALUES ('Charles Xavier', 'Professor X', (SELECT id FROM teams WHERE name = 'X-Men'));

INSERT INTO heroes (name, alias, team_id)
    VALUES ('Frank Castle', 'Punisher', null);


-- Powers Data
INSERT INTO powers (name)
    VALUES ('Regenerative Healing Factor');

INSERT INTO powers (name)
    VALUES ('Retractable Claws');

INSERT INTO powers (name)
    VALUES ('Superhuman Sense and Reflexes');

INSERT INTO powers (name)
    VALUES ('Superhuman Strength and Stamina');

INSERT INTO powers (name)
    VALUES ('Spider Physiology');

INSERT INTO powers (name)
    VALUES ('Spider Sense');

INSERT INTO powers (name)
    VALUES ('Asgardian Physiology');

INSERT INTO powers (name)
    VALUES ('God of Thunder');

INSERT INTO powers (name)
    VALUES ('Telepathy');

INSERT INTO powers (name)
    VALUES ('Telekinesis');

INSERT INTO powers (name)
    VALUES ('Maximum Human Conditioning');

INSERT INTO powers (name)
    VALUES ('Weapons Master');


-- heroes_powers Data

-- Wolverine
INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Wolverine'), 
            (SELECT id FROM powers WHERE name = 'Regenerative Healing Factor'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Wolverine'), 
            (SELECT id FROM powers WHERE name = 'Retractable Claws'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Wolverine'), 
            (SELECT id FROM powers WHERE name = 'Superhuman Sense and Reflexes'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Wolverine'), 
            (SELECT id FROM powers WHERE name = 'Superhuman Strength and Stamina'));

-- Spider-Man
INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Spider-Man'), 
            (SELECT id FROM powers WHERE name = 'Spider Physiology'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Spider-Man'), 
            (SELECT id FROM powers WHERE name = 'Regenerative Healing Factor'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Spider-Man'), 
            (SELECT id FROM powers WHERE name = 'Superhuman Sense and Reflexes'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Spider-Man'), 
            (SELECT id FROM powers WHERE name = 'Superhuman Strength and Stamina'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Spider-Man'), 
            (SELECT id FROM powers WHERE name = 'Spider Sense'));

-- Thor Odinson
INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE name = 'Thor Odinson'), 
            (SELECT id FROM powers WHERE name = 'Asgardian Physiology'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE name = 'Thor Odinson'), 
            (SELECT id FROM powers WHERE name = 'God of Thunder'));

-- Professor X
INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Professor X'), 
            (SELECT id FROM powers WHERE name = 'Telepathy'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Professor X'), 
            (SELECT id FROM powers WHERE name = 'Telekinesis'));

-- Punisher
INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Punisher'), 
            (SELECT id FROM powers WHERE name = 'Maximum Human Conditioning'));

INSERT INTO heroes_powers (hero_id, power_id)
    VALUES ((SELECT id FROM heroes WHERE alias = 'Punisher'), 
            (SELECT id FROM powers WHERE name = 'Weapons Master'));