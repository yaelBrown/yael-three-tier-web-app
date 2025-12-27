const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;

const db_messages = require('./messages.json');
const pool = require('./utils/pool');
const { CONSTANTS } = require('./utils/constants');

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}))

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get("/entries", async (req, res) => {
  // Local Dev examples  
  // res.send(JSON.stringify(db_messages))

  try {
    const [rows] = await pool.query(
      "SELECT id, name, message, created_at FROM entries ORDER BY created_at DESC"
    )
    res.json(rows);
  } catch (err) {
    console.error(err)
    res.status(500).json({err})
  }
})

app.post("/entries", async (req, res) => {
  // For example dev purposes
  // db_messages.unshift({name: req.body.name, message: req.body.message})
  // res.send(JSON.stringify(db_messages))
  
  // get entry
  const { name, message } = req.body

  if (!name || !message) {
    return res.status(400).json({ err: "Missing fields" })
  }

  // send to database
  try {
    const [result] = await pool.execute(
      "INSERT INTO entries (name, message) VALUES (?, ?)",
      [name, message]
    )

    // respond with okay
    res.status(201).json({
      id: result.insertId,
      name,
      message
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({err})
  }
})

app.get("/health", async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'db down' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});