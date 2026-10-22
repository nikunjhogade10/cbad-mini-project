const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/assignments
router.get('/', (req, res) => {
  const { status, subject } = req.query;
  let list = db.getAssignments();

  if (status) {
    list = list.filter(a => a.status.toLowerCase() === status.toLowerCase());
  }
  if (subject) {
    list = list.filter(a => a.subject.toLowerCase().includes(subject.toLowerCase()));
  }

  res.json({ success: true, count: list.length, data: list });
});

// GET /api/assignments/:id
router.get('/:id', (req, res) => {
  const assign = db.getAssignments().find(a => a.id === parseInt(req.params.id));
  if (!assign) {
    return res.status(404).json({ success: false, error: 'Assignment not found' });
  }
  res.json({ success: true, data: assign });
});

// POST /api/assignments (Admin create assignment)
router.post('/', (req, res) => {
  const { title, subject, section, due, marks, description } = req.body;
  if (!title || !subject || !due) {
    return res.status(400).json({ success: false, error: 'Title, subject, and due date are required' });
  }
  const newAssign = db.addAssignment({ title, subject, section: section || 'Unit 1', due, marks: parseInt(marks) || 10, description: description || '' });
  res.status(201).json({ success: true, message: 'Assignment created', data: newAssign });
});

// POST /api/assignments/:id/submit (Student submit assignment)
router.post('/:id/submit', (req, res) => {
  const updated = db.submitAssignment(req.params.id);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Assignment not found' });
  }
  res.json({ success: true, message: 'Assignment submitted successfully', data: updated });
});

module.exports = router;
