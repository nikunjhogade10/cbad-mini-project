const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/student/profile
router.get('/profile', (req, res) => {
  res.json({ success: true, data: db.getStudent() });
});

// PUT /api/student/profile
router.put('/profile', (req, res) => {
  const updated = db.updateStudent(req.body);
  res.json({ success: true, message: 'Profile updated successfully', data: updated });
});

module.exports = router;
