-- Migration version 2: Create tasks table
CREATE TABLE tasks (
                       id SERIAL PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       description TEXT,
                       due_date TIMESTAMP,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
