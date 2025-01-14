// Base de données SQL :
/*
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  date DATE,
  recurrence VARCHAR(50)
);

CREATE TABLE attendance (
  id SERIAL PRIMARY KEY,
  user_id INT,
  event_id INT,
  status VARCHAR(50),
  FOREIGN KEY (event_id) REFERENCES events(id)
);
*/