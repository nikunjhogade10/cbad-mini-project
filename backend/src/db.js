const path = require('path');
const fs = require('fs');
let mysql = null;
try {
  mysql = require('mysql2/promise');
} catch (e) {
  console.log('mysql2 package not available, using JSON file fallback');
}

// Environment configuration for MySQL
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || 'cbad_user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'cbad_password_2026';
const DB_NAME = process.env.DB_NAME || 'cbad_db';

// Local Seed Fallback Data
const initialSeedData = {
  student: {
    id: 'MIT2026CS101',
    name: 'Nikunj Hogade',
    firstName: 'Nikunj',
    email: 'nikunj.hogade@mit.edu.in',
    phone: '+91 98765 43210',
    dob: '15 March 2005',
    gender: 'Male',
    department: 'Computer Science and Engineering',
    program: 'B.Tech',
    semester: 'V',
    division: 'A',
    admissionYear: '2023',
    rollNumber: 'CS-A-101',
    guardianName: 'Santosh Hogade',
    guardianPhone: '+91 99887 76655',
    guardianEmail: 'santosh.hogade@gmail.com',
    initials: 'NH'
  },
  subjects: [
    { id: 1, name: 'Design and Analysis of Algorithm', code: 'DAA', faculty: 'Prof. Savitri Chougule', credits: 4, ta1: 18, ta2: 17, maxMarks: 20 },
    { id: 2, name: 'Container Based Application Development', code: 'CBAD', faculty: 'Prof. Tushar Mane', credits: 4, ta1: 19, ta2: 18, maxMarks: 20 },
    { id: 3, name: 'Program Elective - I', code: 'PE-I', faculty: 'Prof. Deepa Mishra', credits: 3, ta1: 16, ta2: 15, maxMarks: 20 },
    { id: 4, name: 'Cloud Network Engineering Lab', code: 'CNEL', faculty: 'Prof. Sushant Shirbhate', credits: 2, ta1: 17, ta2: 16, maxMarks: 20 },
    { id: 5, name: 'Cloud Application Programming Models Lab', code: 'CAPML', faculty: 'Prof. Namrata Naikwade', credits: 2, ta1: 16, ta2: 17, maxMarks: 20 },
    { id: 6, name: 'Container Based Application Development Lab', code: 'CBADL', faculty: 'Prof. Tushar Mane', credits: 2, ta1: 18, ta2: 17, maxMarks: 20 },
    { id: 7, name: 'Aptitude & Professional Skills Core', code: 'SCIL', faculty: 'Trainer', credits: 1, ta1: 15, ta2: 16, maxMarks: 20 },
    { id: 8, name: 'Foreign Language', code: 'SHD', faculty: 'Trainer', credits: 1, ta1: 18, ta2: 19, maxMarks: 20 }
  ],
  attendance: [
    { id: 1, subject: 'Container Based Application Development', code: 'CBAD', present: 18, absent: 2, total: 20 },
    { id: 2, subject: 'Program Elective - I', code: 'PE-I', present: 17, absent: 3, total: 20 },
    { id: 3, subject: 'Design and Analysis of Algorithm', code: 'DAA', present: 16, absent: 4, total: 20 },
    { id: 4, subject: 'Cloud Network Engineering Lab', code: 'CNEL', present: 19, absent: 1, total: 20 },
    { id: 5, subject: 'Cloud Application Programming Models Lab', code: 'CAPML', present: 17, absent: 3, total: 20 },
    { id: 6, subject: 'Container Based Application Development Lab', code: 'CBADL', present: 16, absent: 4, total: 20 }
  ],
  assignments: [
    { id: 1, title: 'CBAD Practical 1', subject: 'Container Based Application Development', section: 'Unit 2', assigned: '01 Sep 2026', due: '10 Sep 2026', marks: 10, status: 'Submitted', obtained: 9, description: 'Create a multi-container application using CBAD Compose with frontend, backend, and database services. Include health checks and networking configuration.' },
    { id: 2, title: 'CBAD Assignment 1', subject: 'Container Based Application Development', section: 'Unit 2', assigned: '02 Sep 2026', due: '15 Sep 2026', marks: 10, status: 'Not Submitted', obtained: null, description: 'Write optimized Dockerfiles for Python and Node.js applications using multi-stage builds and layer caching strategies.' },
    { id: 3, title: 'CBAD Project', subject: 'Container Based Application Development', section: 'Unit 3', assigned: '05 Sep 2026', due: '20 Sep 2026', marks: 10, status: 'Pending Evaluation', obtained: null, description: 'Configure CBAD bridge networks, overlay networks, and implement service discovery between containers.' },
    { id: 4, title: 'SQL Query Optimization', subject: 'Program Elective - I', section: 'Unit 3', assigned: '28 Aug 2026', due: '08 Sep 2026', marks: 15, status: 'Submitted', obtained: 13, description: 'Analyze and optimize SQL queries for a given schema. Create indexes and explain query execution plans.' },
    { id: 5, title: 'ER Diagram for E-Commerce', subject: 'Program Elective - I', section: 'Unit 1', assigned: '20 Aug 2026', due: '30 Aug 2026', marks: 10, status: 'Submitted', obtained: 9, description: 'Design a complete ER diagram for an e-commerce application with all entities, relationships, and constraints.' },
    { id: 6, title: 'Graph Algorithm Implementation', subject: 'Design and Analysis of Algorithm', section: 'Unit 4', assigned: '03 Sep 2026', due: '18 Sep 2026', marks: 20, status: 'Not Submitted', obtained: null, description: "Implement Dijkstra's and Floyd-Warshall algorithms and compare their time complexities with visualization." },
    { id: 7, title: 'AWS EC2 Deployment', subject: 'Cloud Network Engineering Lab', section: 'Unit 2', assigned: '01 Sep 2026', due: '12 Sep 2026', marks: 15, status: 'Pending Evaluation', obtained: null, description: 'Deploy a web application on AWS EC2 with load balancing and auto-scaling configuration.' }
  ],
  announcements: [
    { id: 1, title: 'TA-2 Examination Schedule', desc: 'Internal Assessment 2 (TA-2) will commence from 15 September 2026. Timetable has been uploaded to the portal. Students are advised to prepare accordingly.', date: '01 Sep 2026', category: 'Examination', priority: 'High', read: false },
    { id: 2, title: 'CBAD Lab Assignment Released', desc: 'A new CBAD Practical 1 assignment has been published for CBAD. Due date is 10 September 2026. Please check the assignments section.', date: '01 Sep 2026', category: 'Assignment', priority: 'Normal', read: false },
    { id: 3, title: 'Attendance Regularization Notice', desc: 'Students with attendance below 75% in any subject must submit an attendance regularization request to the department office by 10 September 2026.', date: '31 Aug 2026', category: 'Attendance', priority: 'High', read: false },
    { id: 4, title: 'TA-1 Marks Published', desc: 'TA-1 marks for all subjects have been published on the portal. Students may view their marks under the Academics section. Any discrepancies should be reported within 3 days.', date: '28 Aug 2026', category: 'Academic', priority: 'Normal', read: true },
    { id: 5, title: 'Seminar on AI in Healthcare', desc: 'Department of CSE is organizing a seminar on "Artificial Intelligence in Healthcare" on 8 September 2026 at 11:00 AM in Seminar Hall A. Attendance is encouraged.', date: '27 Aug 2026', category: 'General', priority: 'Low', read: true }
  ],
  timetable: [
    { time: '08:45–09:40', mon: 'CBAD (TM)', tue: 'CAPML Lab (NSN : 5417)', wed: 'DAA (SPC)', thu: 'SHD (5418)', fri: 'CBAD (TM : 5418)', sat: 'PBL-III Review' },
    { time: '09:40–10:35', mon: 'PE-I (CIS/AIML)', tue: 'CAPML Lab (NSN : 5417)', wed: 'PE-I (CIS/AIML)', thu: 'SHD (5418)', fri: 'DAA (SPC : 5418)', sat: 'PBL-III Review' },
    { time: '10:50–11:45', mon: 'CNEL Lab (SPS)', tue: 'DAA (SPC : 5418)', wed: 'NPTEL', thu: 'CNEL Lab (SPS : 5613)', fri: 'PE-I (CIS/AIML)', sat: 'CAPML (NSN)' },
    { time: '11:45–12:40', mon: 'CNEL Lab (SPS)', tue: 'DAA (SPC : 5418)', wed: 'NPTEL', thu: 'CNEL Lab (SPS : 5613)', fri: 'PE-I (CIS/AIML)', sat: 'CAPML (NSN)' },
    { time: '01:40–02:35', mon: 'CAPML (NSN)', tue: 'CBAD (TM : 5418)', wed: 'SCIL', thu: 'SCIL (5418)', fri: 'CBADL Lab (TM : 5606)', sat: 'PBL-III Review' },
    { time: '02:35–03:30', mon: 'CAPML (NSN)', tue: 'CBAD (TM : 5418)', wed: 'MOOC', thu: 'SCIL (5418)', fri: 'CBADL Lab (TM : 5606)', sat: 'PBL-III Review' },
    { time: '03:40–04:30', mon: 'Remedial Lecture', tue: 'Library', wed: 'Remedial Lecture', thu: 'Mentor Meeting', fri: 'Library', sat: 'Free' }
  ]
};

const DB_FILE = path.join(__dirname, '..', 'cbad_data.json');

class DatabaseStore {
  constructor() {
    this.data = initialSeedData;
    this.useMySQL = false;
    this.pool = null;
    this.loadJson();
    this.initMySQL();
  }

  loadJson() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
      } else {
        this.saveJson();
      }
    } catch (err) {
      this.data = initialSeedData;
    }
  }

  saveJson() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving JSON data file:', err);
    }
  }

  async initMySQL() {
    if (!mysql) return;
    try {
      this.pool = mysql.createPool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        connectTimeout: 3000
      });
      // Test connection
      const connection = await this.pool.getConnection();
      connection.release();
      this.useMySQL = true;
      console.log(`✅ Connected to MySQL database [${DB_NAME}] on ${DB_HOST}:${DB_PORT}`);
    } catch (err) {
      console.log(`ℹ️ MySQL connection unavailable (${err.code || err.message}). Operating on persistent JSON store.`);
      this.useMySQL = false;
    }
  }

  // Student Profile
  getStudent() { return this.data.student; }
  updateStudent(updated) {
    this.data.student = { ...this.data.student, ...updated };
    this.saveJson();
    return this.data.student;
  }

  // Subjects
  getSubjects() { return this.data.subjects; }
  addSubject(subj) {
    subj.id = this.data.subjects.length + 1;
    this.data.subjects.push(subj);
    this.saveJson();
    return subj;
  }

  // Attendance
  getAttendance() { return this.data.attendance; }
  updateAttendance(id, present, total) {
    const item = this.data.attendance.find(a => a.id === parseInt(id));
    if (item) {
      item.present = present;
      item.total = total;
      item.absent = total - present;
      this.saveJson();
    }
    return item;
  }

  // Assignments
  getAssignments() { return this.data.assignments; }
  addAssignment(assign) {
    assign.id = this.data.assignments.length + 1;
    assign.assigned = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    assign.status = 'Not Submitted';
    assign.obtained = null;
    this.data.assignments.push(assign);
    this.saveJson();
    return assign;
  }
  submitAssignment(id) {
    const item = this.data.assignments.find(a => a.id === parseInt(id));
    if (item) {
      item.status = 'Submitted';
      this.saveJson();
    }
    return item;
  }

  // Announcements
  getAnnouncements() { return this.data.announcements; }
  addAnnouncement(notice) {
    notice.id = this.data.announcements.length + 1;
    notice.date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    notice.read = false;
    this.data.announcements.unshift(notice);
    this.saveJson();
    return notice;
  }

  // Timetable
  getTimetable() { return this.data.timetable; }
}

const db = new DatabaseStore();
module.exports = db;
