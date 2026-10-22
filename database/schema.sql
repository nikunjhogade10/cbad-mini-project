-- ============================================================
-- Containerized Student Management System - MySQL Database Schema
-- Database: cbad_db
-- ============================================================

CREATE DATABASE IF NOT EXISTS cbad_db;
USE cbad_db;

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS timetable;
DROP TABLE IF EXISTS announcements;
DROP TABLE IF EXISTS marks;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS students;

-- 1. Students Table
CREATE TABLE students (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(30),
    dob VARCHAR(30),
    gender VARCHAR(20),
    department VARCHAR(100) NOT NULL,
    program VARCHAR(50) NOT NULL,
    semester VARCHAR(10) NOT NULL,
    division VARCHAR(10) NOT NULL,
    admission_year VARCHAR(10) NOT NULL,
    roll_number VARCHAR(30) NOT NULL,
    guardian_name VARCHAR(100),
    guardian_phone VARCHAR(30),
    guardian_email VARCHAR(100),
    initials VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Subjects Table
CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    faculty VARCHAR(100) NOT NULL,
    credits INT NOT NULL DEFAULT 3,
    ta1_marks INT DEFAULT 0,
    ta2_marks INT DEFAULT 0,
    max_marks INT DEFAULT 20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Attendance Table
CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    subject_id INT NOT NULL,
    present INT NOT NULL DEFAULT 0,
    absent INT NOT NULL DEFAULT 0,
    total INT NOT NULL DEFAULT 0,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Assignments Table
CREATE TABLE assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    section VARCHAR(50) DEFAULT 'Unit 1',
    assigned VARCHAR(30) NOT NULL,
    due VARCHAR(30) NOT NULL,
    marks INT NOT NULL DEFAULT 10,
    status VARCHAR(50) NOT NULL DEFAULT 'Not Submitted',
    obtained INT DEFAULT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Marks Table
CREATE TABLE marks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    subject_id INT NOT NULL,
    ta1_score INT DEFAULT 0,
    ta2_score INT DEFAULT 0,
    max_score INT DEFAULT 20,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Announcements Table
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date VARCHAR(30) NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    priority VARCHAR(20) NOT NULL DEFAULT 'Normal',
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Timetable Table
CREATE TABLE timetable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    time_slot VARCHAR(30) NOT NULL,
    mon VARCHAR(100),
    tue VARCHAR(100),
    wed VARCHAR(100),
    thu VARCHAR(100),
    fri VARCHAR(100),
    sat VARCHAR(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
