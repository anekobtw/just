import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const db = new sqlite3.Database("websites.db");

app.use(express.json());
app.use(cors());

db.run(`
  CREATE TABLE IF NOT EXISTS websites (
    url TEXT,
    email TEXT UNIQUE,
    last_checked TIMESTAMP
  )
`);


// Get all websites
app.get("/api/get-websites", (req, res) => {
    let result = db.get("SELECT * FROM websites");
    res.json(result);
})


// Add a new website
app.post("/api/add-website", (req, res) => {
    let { url, email } = req.body;

    db.run("INSERT INTO websites VALUES (?, ?, ?)", [url, email, new Date()])

    res.json({"status": "success"})
})

app.listen(8080, () => console.log("Server listening on 8080"))
