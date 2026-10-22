const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/marks
router.get('/', (req, res) => {
  const subjects = db.getSubjects();
  const marks = subjects.map(s => {
    const totalObtained = s.ta1 + s.ta2;
    const totalMax = s.maxMarks * 2;
    const percentage = ((totalObtained / totalMax) * 100).toFixed(1);
    return {
      id: s.id,
      name: s.name,
      code: s.code,
      faculty: s.faculty,
      credits: s.credits,
      ta1: s.ta1,
      ta2: s.ta2,
      maxMarks: s.maxMarks,
      percentage: parseFloat(percentage)
    };
  });

  res.json({ success: true, data: marks });
});

module.exports = router;
