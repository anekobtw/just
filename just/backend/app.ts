import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
const db = new sqlite3.Database("websites.db");

app.use(express.json());
app.use(cors());

db.run(`
  CREATE TABLE IF NOT EXISTS websites (
    url TEXT,
    email TEXT UNIQUE,
    is_running BOOL,
    last_checked TIMESTAMP,
    ping INTEGER
  )
`);

function getAllWebsites(): Promise<
  { url: string; email: string; is_running: boolean; last_checked: string; ping: number }[]
> {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM websites", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as { url: string; email: string; is_running: boolean; last_checked: string; ping: number }[]);
      }
    });
  });
}

setInterval(async () => {
  let websites = await getAllWebsites();
  for (let website of websites) {
    const start = Date.now();
    try {
      const res = await fetch(website.url);
      const ping = Date.now() - start;
      const is_running = res.ok;

      db.run("UPDATE websites SET last_checked = ?, ping = ?, is_running = ? WHERE url = ?", [new Date().toISOString(), ping, is_running, website.url]);
      console.log(`${website.url} status: ${res.status}, ping: ${ping}ms, running: ${is_running}`);
    } catch (err) {
      db.run("UPDATE websites SET last_checked = ?, is_running = ? WHERE url = ?", [new Date().toISOString(), false, website.url]);
      console.log(`${website.url} is down`);
    }
  }
}, 5000);

// Get all websites (without exposing email addresses)
app.get("/api/get-websites", async (req, res) => {
  try {
    const websites = await getAllWebsites();
    const sanitized = websites.map(({ url, is_running, last_checked, ping }) => ({ url, is_running, last_checked, ping }));
    res.json(sanitized);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new website
app.post("/api/add-website", (req, res) => {
  let { url, email } = req.body;
  db.run("INSERT INTO websites VALUES (?, ?, ?, ?, ?)", [url, email, true, new Date().toISOString(), 0]);
  res.json({ status: "success" });
});

app.listen(8080, () => console.log("Server listening on 8080"));
