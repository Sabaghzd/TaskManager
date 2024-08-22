-- Seed data for initial setup

-- Insert initial users
INSERT INTO users (username, password_hash) VALUES
                                                ('user1', 'hash1'),
                                                ('user2', 'hash2');

-- Insert example tasks
INSERT INTO tasks (title, description, due_date) VALUES
                                                     ('Complete project report', 'Finish the report for the project.', '2024-08-30 17:00:00'),
                                                     ('Call the client', 'Discuss the project details with the client.', '2024-08-20 10:00:00');
