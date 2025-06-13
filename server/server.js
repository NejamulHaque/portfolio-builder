const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// ✅ Save Portfolio (POST)
app.post('/api/portfolio/save', (req, res) => {
  const { username, name, bio, github, linkedin, projects } = req.body;

  const query = `
    INSERT INTO portfolios (username, name, bio, github, linkedin, projects)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE name=?, bio=?, github=?, linkedin=?, projects=?
  `;

  const values = [
    username, name, bio, github, linkedin, projects,
    name, bio, github, linkedin, projects
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('❌ Error saving portfolio:', err);
      return res.status(500).json({ error: 'Insert failed' });
    }
    res.json({ message: '✅ Portfolio saved', result });
  });
});

// ✅ Fetch Portfolio by Username (GET)
app.get('/api/portfolio/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT * FROM portfolios WHERE username = ?';

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('❌ Error fetching portfolio:', err);
      return res.status(500).json({ error: 'Query failed' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.json(results[0]);
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));