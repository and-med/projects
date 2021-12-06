CREATE TABLE IF NOT EXISTS activities(
    id serial PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL
);