const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const path = require('path');
const app = express();
const port = 3000;


if (process.argv.length !== 3) {
  console.log("Please provide exactly one argument.");
  process.exit(1); // Exit with error code 1
}

// Access the argument
const dbpath = process.argv[2];

// Create and connect to the SQLite database
const db = new sqlite3.Database(dbpath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }
});


// Serve the SQLite database file
app.get(dbpath, (req, res) => {
  const filePath = path.join(__dirname, dbpath);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('Could not send file');
    }
  });
});

// Start the HTTP server
const httpServer = http.createServer(app);
httpServer.listen(port, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${port}/${dbpath}`);
});
