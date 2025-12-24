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


function getAllWebsites(): Promise<{ url: string; email: string; last_checked: string }[]> {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM websites", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows as { url: string; email: string; last_checked: string }[]);
    });
  });
}


setInterval(async () => {
    let websites = await getAllWebsites();
    for (let website of websites) {
        const res = await fetch(website.url);
        console.log(`${website.url} status: ${res.status}`);
    }}, 5000
);


// Get all websites
app.get("/api/get-websites", async (req, res) => {
  try {
    const websites = await getAllWebsites();
    res.json(websites);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


// Add a new website
app.post("/api/add-website", (req, res) => {
    let { url, email } = req.body;
    db.run("INSERT INTO websites VALUES (?, ?, ?)", [url, email, new Date()])
    res.json({"status": "success"})
})

app.listen(8080, () => console.log("Server listening on 8080"))
