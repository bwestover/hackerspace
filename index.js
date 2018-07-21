const http = require('http');
const { Client } = require('pg');

const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;
const server = http.createServer((req, res) => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  client.connect()
    .then(() => client.query('SELECT * FROM hellotable'))
    .then((result) => {
      for (let row of result.rows) {
        console.log(JSON.stringify(row));
      }
      res.end("hello rows");
      client.end();
    })
    .catch(() => {
      res.end('ERROR');
      client.end();
    });
});

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}/`);
});
