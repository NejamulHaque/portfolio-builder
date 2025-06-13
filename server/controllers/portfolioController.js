const Portfolio = require('../models/Portfolio');

exports.savePortfolio = async (req, res) => {
  try {
    const { username, data } = req.body;
    const saved = await Portfolio.findOneAndUpdate(
      { username },
      { data },
      { upsert: true, new: true }
    );
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ username: req.params.username });
    if (!portfolio) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(portfolio);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
};