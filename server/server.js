const express = require('express');
const app = express();
const port = 8080;

const db_messages = require('./messages.json');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get("/entries", (req, res) => {
    res.send(JSON.stringify(db_messages))
})

app.post("/entries", (req, res) => {
    // get entry
    // send to database
    // respond with okay

    // For example dev purposes
    db_messages.unshift({name: req.body.name, message: req.body.message})
    res.send(JSON.stringify(db_messages))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});