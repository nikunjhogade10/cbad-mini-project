const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/attendance
router.get('/', (req, res) => {
  const attendance = db.getAttendance();
  const totalClasses = attendance.reduce((sum, a) => sum + a.total, 0);
  const totalPresent = attendance.reduce((sum, a) => sum + a.present, 0);
  const overallPercentage = totalClasses > 0 ? ((totalPresent / totalClasses) * 100).toFixed(1) : 0;

  res.json({
    success: true,
    overallPercentage: parseFloat(overallPercentage),
    totalClasses,
    totalPresent,
    totalAbsent: totalClasses - totalPresent,
    data: attendance
  });
});

// POST /api/attendance/mark (Admin mark attendance)
router.post('/mark', (req, res) => {
  const { id, present, total } = req.body;
  if (!id || present === undefined || total === undefined) {
    return res.status(400).json({ success: false, error: 'Subject id, present, and total classes required' });
  }
  const updated = db.updateAttendance(id, parseInt(present), parseInt(total));
  res.json({ success: true, message: 'Attendance updated', data: updated });
});

module.exports = router;
