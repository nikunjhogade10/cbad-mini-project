const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/announcements
router.get('/', (req, res) => {
  res.json({ success: true, count: db.getAnnouncements().length, data: db.getAnnouncements() });
});

// POST /api/announcements (Admin create announcement)
router.post('/', (req, res) => {
  const { title, desc, category, priority } = req.body;
  if (!title || !desc) {
    return res.status(400).json({ success: false, error: 'Title and description are required' });
  }
  const newNotice = db.addAnnouncement({ title, desc, category: category || 'General', priority: priority || 'Normal' });
  res.status(201).json({ success: true, message: 'Announcement created successfully', data: newNotice });
});

module.exports = router;
