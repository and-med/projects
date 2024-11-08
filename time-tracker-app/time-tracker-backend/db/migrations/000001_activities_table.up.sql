CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    username VARCHAR(256) NOT NULL,
    first_name VARCHAR(256) NOT NULL,
    last_name VARCHAR(256) NOT NULL,
    password_hash VARCHAR(512) NOT NULL
);

CREATE TABLE IF NOT EXISTS activities(
    id serial PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    description VARCHAR(512) NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_activities_user_id 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS time_logs(
    id serial PRIMARY KEY,
    activity_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_at TIMESTAMP NOT NULL,
    end_at TIMESTAMP NULL,
    CONSTRAINT fk_time_logs_activity_id
    FOREIGN KEY(activity_id) REFERENCES activities(id)
);
