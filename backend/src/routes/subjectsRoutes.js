const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/subjects
router.get('/', (req, res) => {
  res.json({ success: true, count: db.getSubjects().length, data: db.getSubjects() });
});

// POST /api/subjects (Admin create subject)
router.post('/', (req, res) => {
  const { name, code, faculty, credits } = req.body;
  if (!name || !code) {
    return res.status(400).json({ success: false, error: 'Subject name and code are required' });
  }
  const newSubj = db.addSubject({ name, code, faculty: faculty || 'TBD', credits: parseInt(credits) || 3, ta1: 0, ta2: 0, maxMarks: 20 });
  res.status(201).json({ success: true, message: 'Subject created successfully', data: newSubj });
});

module.exports = router;
