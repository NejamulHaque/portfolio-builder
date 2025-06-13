const express = require('express');
const { savePortfolio, getPortfolio } = require('../controllers/portfolioController');

router.post('/save', savePortfolio);
router.get('/:username', getPortfolio);

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection

router.get('/:username', (req, res) => {
  const { username } = req.params;
  const query = 'SELECT * FROM portfolios WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(results[0]);
  });
});

module.exports = router;
