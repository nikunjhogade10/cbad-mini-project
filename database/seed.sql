-- ============================================================
-- Seed Data for Containerized Student Management System (cbad_db)
-- ============================================================

USE cbad_db;

-- Insert Student
INSERT INTO students (id, name, first_name, email, phone, dob, gender, department, program, semester, division, admission_year, roll_number, guardian_name, guardian_phone, guardian_email, initials)
VALUES ('MIT2026CS101', 'Nikunj Hogade', 'Nikunj', 'nikunj.hogade@mit.edu.in', '+91 98765 43210', '15 March 2005', 'Male', 'Computer Science and Engineering', 'B.Tech', 'V', 'A', '2023', 'CS-A-101', 'Santosh Hogade', '+91 99887 76655', 'santosh.hogade@gmail.com', 'NH');

-- Insert Subjects
INSERT INTO subjects (id, name, code, faculty, credits, ta1_marks, ta2_marks, max_marks) VALUES
(1, 'Design and Analysis of Algorithm', 'DAA', 'Prof. Savitri Chougule', 4, 18, 17, 20),
(2, 'Container Based Application Development', 'CBAD', 'Prof. Tushar Mane', 4, 19, 18, 20),
(3, 'Program Elective - I', 'PE-I', 'Prof. Deepa Mishra', 3, 16, 15, 20),
(4, 'Cloud Network Engineering Lab', 'CNEL', 'Prof. Sushant Shirbhate', 2, 17, 16, 20),
(5, 'Cloud Application Programming Models Lab', 'CAPML', 'Prof. Namrata Naikwade', 2, 16, 17, 20),
(6, 'Container Based Application Development Lab', 'CBADL', 'Prof. Tushar Mane', 2, 18, 17, 20),
(7, 'Aptitude & Professional Skills Core', 'SCIL', 'Trainer', 1, 15, 16, 20),
(8, 'Foreign Language', 'SHD', 'Trainer', 1, 18, 19, 20);

-- Insert Attendance
INSERT INTO attendance (student_id, subject_id, present, absent, total) VALUES
('MIT2026CS101', 2, 18, 2, 20),
('MIT2026CS101', 3, 17, 3, 20),
('MIT2026CS101', 1, 16, 4, 20),
('MIT2026CS101', 4, 19, 1, 20),
('MIT2026CS101', 5, 17, 3, 20),
('MIT2026CS101', 6, 16, 4, 20);

-- Insert Assignments
INSERT INTO assignments (title, subject, section, assigned, due, marks, status, obtained, description) VALUES
('CBAD Practical 1', 'Container Based Application Development', 'Unit 2', '01 Sep 2026', '10 Sep 2026', 10, 'Submitted', 9, 'Create a multi-container application using CBAD Compose with frontend, backend, and database services. Include health checks and networking configuration.'),
('CBAD Assignment 1', 'Container Based Application Development', 'Unit 2', '02 Sep 2026', '15 Sep 2026', 10, 'Not Submitted', NULL, 'Write optimized Dockerfiles for Python and Node.js applications using multi-stage builds and layer caching strategies.'),
('CBAD Project', 'Container Based Application Development', 'Unit 3', '05 Sep 2026', '20 Sep 2026', 10, 'Pending Evaluation', NULL, 'Configure CBAD bridge networks, overlay networks, and implement service discovery between containers.'),
('SQL Query Optimization', 'Program Elective - I', 'Unit 3', '28 Aug 2026', '08 Sep 2026', 15, 'Submitted', 13, 'Analyze and optimize SQL queries for a given schema. Create indexes and explain query execution plans.'),
('ER Diagram for E-Commerce', 'Program Elective - I', 'Unit 1', '20 Aug 2026', '30 Aug 2026', 10, 'Submitted', 9, 'Design a complete ER diagram for an e-commerce application with all entities, relationships, and constraints.'),
('Graph Algorithm Implementation', 'Design and Analysis of Algorithm', 'Unit 4', '03 Sep 2026', '18 Sep 2026', 20, 'Not Submitted', NULL, 'Implement Dijkstra\'s and Floyd-Warshall algorithms and compare their time complexities with visualization.'),
('AWS EC2 Deployment', 'Cloud Network Engineering Lab', 'Unit 2', '01 Sep 2026', '12 Sep 2026', 15, 'Pending Evaluation', NULL, 'Deploy a web application on AWS EC2 with load balancing and auto-scaling configuration.');

-- Insert Announcements
INSERT INTO announcements (title, description, date, category, priority, is_read) VALUES
('TA-2 Examination Schedule', 'Internal Assessment 2 (TA-2) will commence from 15 September 2026. Timetable has been uploaded to the portal. Students are advised to prepare accordingly.', '01 Sep 2026', 'Examination', 'High', FALSE),
('CBAD Lab Assignment Released', 'A new CBAD Practical 1 assignment has been published for CBAD. Due date is 10 September 2026. Please check the assignments section.', '01 Sep 2026', 'Assignment', 'Normal', FALSE),
('Attendance Regularization Notice', 'Students with attendance below 75% in any subject must submit an attendance regularization request to the department office by 10 September 2026.', '31 Aug 2026', 'Attendance', 'High', FALSE),
('TA-1 Marks Published', 'TA-1 marks for all subjects have been published on the portal. Students may view their marks under the Academics section. Any discrepancies should be reported within 3 days.', '28 Aug 2026', 'Academic', 'Normal', TRUE),
('Seminar on AI in Healthcare', 'Department of CSE is organizing a seminar on "Artificial Intelligence in Healthcare" on 8 September 2026 at 11:00 AM in Seminar Hall A. Attendance is encouraged.', '27 Aug 2026', 'General', 'Low', TRUE);

-- Insert Timetable
INSERT INTO timetable (time_slot, mon, tue, wed, thu, fri, sat) VALUES
('08:45–09:40', 'CBAD (TM)', 'CAPML Lab (NSN : 5417)', 'DAA (SPC)', 'SHD (5418)', 'CBAD (TM : 5418)', 'PBL-III Review'),
('09:40–10:35', 'PE-I (CIS/AIML)', 'CAPML Lab (NSN : 5417)', 'PE-I (CIS/AIML)', 'SHD (5418)', 'DAA (SPC : 5418)', 'PBL-III Review'),
('10:50–11:45', 'CNEL Lab (SPS)', 'DAA (SPC : 5418)', 'NPTEL', 'CNEL Lab (SPS : 5613)', 'PE-I (CIS/AIML)', 'CAPML (NSN)'),
('11:45–12:40', 'CNEL Lab (SPS)', 'DAA (SPC : 5418)', 'NPTEL', 'CNEL Lab (SPS : 5613)', 'PE-I (CIS/AIML)', 'CAPML (NSN)'),
('01:40–02:35', 'CAPML (NSN)', 'CBAD (TM : 5418)', 'SCIL', 'SCIL (5418)', 'CBADL Lab (TM : 5606)', 'PBL-III Review'),
('02:35–03:30', 'CAPML (NSN)', 'CBAD (TM : 5418)', 'MOOC', 'SCIL (5418)', 'CBADL Lab (TM : 5606)', 'PBL-III Review'),
('03:40–04:30', 'Remedial Lecture', 'Library', 'Remedial Lecture', 'Mentor Meeting', 'Library', 'Free');
