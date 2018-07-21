CREATE TABLE hackers (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  languages VARCHAR,
  frameworks VARCHAR,
  databases VARCHAR,
  idea VARCHAR
);

INSERT INTO hackers (name, languages, frameworks, databases, idea)
  VALUES ('Tyler', 'JavaScript, HTML', 'Express, React', 'mysql', 'Try to take over the world!');
