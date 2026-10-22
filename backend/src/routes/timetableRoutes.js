const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/timetable
router.get('/', (req, res) => {
  res.json({ success: true, data: db.getTimetable() });
});

module.exports = router;
