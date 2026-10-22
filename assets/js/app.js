// ============================================================
// SHARED APPLICATION JAVASCRIPT
// Containerized Student Management System
// ============================================================

// ── Sample Data ────────────────────────────────────────────
const APP_DATA = {
  student: {
    name: 'Nikunj Hogade',
    firstName: 'Nikunj',
    id: 'MIT2026CS101',
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
    { name: 'Design and Analysis of Algorithm', code: 'DAA', faculty: 'Prof. Savitri Chougule', credits: 4, ta1: 18, ta2: 17, maxMarks: 20 },
    { name: 'Container Based Application Development', code: 'CBAD', faculty: 'Prof. Tushar Mane', credits: 4, ta1: 19, ta2: 18, maxMarks: 20 },
    { name: 'Program Elective - I', code: 'PE-I', faculty: 'Prof. Deepa Mishra', credits: 3, ta1: 16, ta2: 15, maxMarks: 20 },
    { name: 'CNEL Network Engineering Lab', code: 'CNEL', faculty: 'Prof. Sushant Shirbhate', credits: 2, ta1: 17, ta2: 16, maxMarks: 20 },
    { name: 'CNEL Application Programming Models Lab', code: 'CAPCAPML', faculty: 'Prof. Namrata Naikwade', credits: 2, ta1: 16, ta2: 17, maxMarks: 20 },
    { name: 'Container Based Application Development Lab', code: 'CBADL', faculty: 'Prof. Tushar Mane', credits: 2, ta1: 18, ta2: 17, maxMarks: 20 },
    { name: 'Aptitude & Professional Skills Core', code: 'SCIL', faculty: 'Trainer', credits: 1, ta1: 15, ta2: 16, maxMarks: 20 },
    { name: 'Foreign Language', code: 'SHD', faculty: 'Trainer', credits: 1, ta1: 18, ta2: 19, maxMarks: 20 }
  ],
  attendance: [
    { subject: 'Container Based Application Development', code: 'CBAD', present: 18, absent: 2, total: 20 },
    { subject: 'Program Elective - I', code: 'PE-I', present: 17, absent: 3, total: 20 },
    { subject: 'Design and Analysis of Algorithm', code: 'DAA', present: 16, absent: 4, total: 20 },
    { subject: 'CNEL Network Engineering Lab', code: 'CNEL', present: 19, absent: 1, total: 20 },
    { subject: 'CNEL Application Programming Models Lab', code: 'CAPCAPML', present: 17, absent: 3, total: 20, },
    { subject: 'Container Based Application Development Lab', code: 'CBADL', present: 16, absent: 4, total: 20 }
  ],
  assignments: [
    { title: 'CBAD Practical 1', subject: 'Container Based Application Development', section: 'Unit 2', assigned: '01 Sep 2026', due: '10 Sep 2026', marks: 10, status: 'Submitted', obtained: 9, description: 'Create a multi-container application using CBAD Compose with frontend, backend, and database services. Include health checks and networking configuration.' },
    { title: 'CBAD Assignment 1', subject: 'Container Based Application Development', section: 'Unit 2', assigned: '02 Sep 2026', due: '15 Sep 2026', marks: 10, status: 'Not Submitted', obtained: null, description: 'Write optimized CBADfiles for Python and Node.js applications using multi-stage builds and layer caching strategies.' },
    { title: 'CBAD Project', subject: 'Container Based Application Development', section: 'Unit 3', assigned: '05 Sep 2026', due: '20 Sep 2026', marks: 10, status: 'Pending Evaluation', obtained: null, description: 'Configure CBAD bridge networks, overlay networks, and implement service discovery between containers.' },
    { title: 'SQL Query Optimization', subject: 'Program Elective - I', section: 'Unit 3', assigned: '28 Aug 2026', due: '08 Sep 2026', marks: 15, status: 'Submitted', obtained: 13, description: 'Analyze and optimize SQL queries for a given schema. Create indexes and explain query execution plans.' },
    { title: 'ER Diagram for E-Commerce', subject: 'Program Elective - I', section: 'Unit 1', assigned: '20 Aug 2026', due: '30 Aug 2026', marks: 10, status: 'Submitted', obtained: 9, description: 'Design a complete ER diagram for an e-commerce application with all entities, relationships, and constraints.' },
    { title: 'Graph Algorithm Implementation', subject: 'Design and Analysis of Algorithm', section: 'Unit 4', assigned: '03 Sep 2026', due: '18 Sep 2026', marks: 20, status: 'Not Submitted', obtained: null, description: 'Implement Dijkstra\'s and Floyd-Warshall algorithms and compare their time complexities with visualization.' },
    { title: 'AWS EC2 Deployment', subject: 'CNEL Network Engineering Lab', section: 'Unit 2', assigned: '01 Sep 2026', due: '12 Sep 2026', marks: 15, status: 'Pending Evaluation', obtained: null, description: 'Deploy a web application on AWS EC2 with load balancing and auto-scaling configuration.' }
  ],
  timetable: {
    'Monday': [
      { time: '9:00–10:00',  subject: 'Container Based Application Development', code: 'CBAD', faculty: 'Dr. A. Desai',    room: 'Lab 301' },
      { time: '10:00–11:00', subject: null },
      { time: '11:00–12:00', subject: 'CNEL Application Programming Models Lab',           code: 'CAPCAPML', faculty: 'Dr. N. Patil',   room: 'Room 205' },
      { time: '12:00–1:00',  subject: 'PE-I',                       code: 'PE-I', faculty: 'Prof. R. Kulkarni', room: 'Room 102' },
      { time: '2:00–3:00',   subject: 'Container Based Application Development Lab',          code: 'CBADL', faculty: 'Prof. A. Joshi', room: 'Room 304' },
      { time: '3:00–4:00',   subject: null }
    ],
    'Tuesday': [
      { time: '9:00–10:00',  subject: 'DAA',                        code: 'DAA', faculty: 'Dr. P. Sharma',  room: 'Room 201' },
      { time: '10:00–11:00', subject: 'CNEL Network Engineering Lab',            code: 'CNEL', faculty: 'Prof. V. Nair',  room: 'Room 110' },
      { time: '11:00–12:00', subject: null },
      { time: '12:00–1:00',  subject: 'PE-I Lab',                   code: 'PE-I', faculty: 'Prof. R. Kulkarni', room: 'Lab 101' },
      { time: '2:00–3:00',   subject: 'CNEL Application Programming Models Lab',           code: 'CAPCAPML', faculty: 'Dr. N. Patil',   room: 'Lab 302' },
      { time: '3:00–4:00',   subject: null }
    ],
    'Wednesday': [
      { time: '9:00–10:00',  subject: 'Container Based Application Development', code: 'CBAD', faculty: 'Dr. A. Desai',    room: 'Lab 301' },
      { time: '10:00–11:00', subject: 'DAA',                        code: 'DAA', faculty: 'Dr. P. Sharma',  room: 'Room 201' },
      { time: '11:00–12:00', subject: 'CNEL Network Engineering Lab',            code: 'CNEL', faculty: 'Prof. V. Nair',  room: 'Room 110' },
      { time: '12:00–1:00',  subject: null },
      { time: '2:00–3:00',   subject: 'Container Based Application Development Lab',          code: 'CBADL', faculty: 'Prof. A. Joshi', room: 'Room 304' },
      { time: '3:00–4:00',   subject: 'PE-I',                       code: 'PE-I', faculty: 'Prof. R. Kulkarni', room: 'Room 102' }
    ],
    'Thursday': [
      { time: '9:00–10:00',  subject: 'CNEL Application Programming Models Lab',           code: 'CAPCAPML', faculty: 'Dr. N. Patil',   room: 'Room 205' },
      { time: '10:00–11:00', subject: null },
      { time: '11:00–12:00', subject: 'Container Based Application Development', code: 'CBAD', faculty: 'Dr. A. Desai',    room: 'Lab 301' },
      { time: '12:00–1:00',  subject: 'DAA',                        code: 'DAA', faculty: 'Dr. P. Sharma',  room: 'Room 201' },
      { time: '2:00–3:00',   subject: null },
      { time: '3:00–4:00',   subject: 'Container Based Application Development Lab Lab',      code: 'CBADL', faculty: 'Prof. A. Joshi', room: 'Lab 205' }
    ],
    'Friday': [
      { time: '9:00–10:00',  subject: 'PE-I',                       code: 'PE-I', faculty: 'Prof. R. Kulkarni', room: 'Room 102' },
      { time: '10:00–11:00', subject: 'CNEL Network Engineering Lab',            code: 'CNEL', faculty: 'Prof. V. Nair',  room: 'Room 110' },
      { time: '11:00–12:00', subject: 'CNEL Application Programming Models Lab',           code: 'CAPCAPML', faculty: 'Dr. N. Patil',   room: 'Room 205' },
      { time: '12:00–1:00',  subject: null },
      { time: '2:00–3:00',   subject: 'CBAD Practicals',         code: 'CBAD', faculty: 'Dr. A. Desai',    room: 'Lab 301' },
      { time: '3:00–4:00',   subject: 'DAA',                        code: 'DAA', faculty: 'Dr. P. Sharma',  room: 'Room 201' }
    ],
    'Saturday': [
      { time: '9:00–10:00',  subject: 'CNEL Network Engineering Lab Lab',        code: 'CNEL', faculty: 'Prof. V. Nair',  room: 'Lab 203' },
      { time: '10:00–11:00', subject: 'Container Based Application Development Lab',          code: 'CBADL', faculty: 'Prof. A. Joshi', room: 'Room 304' },
      { time: '11:00–12:00', subject: null },
      { time: '12:00–1:00',  subject: null },
      { time: '2:00–3:00',   subject: null },
      { time: '3:00–4:00',   subject: null }
    ]
  },
  announcements: [
    { id: 1, title: 'TA-2 Examination Schedule', desc: 'Internal Assessment 2 (TA-2) will commence from 15 September 2026. Timetable has been uploaded to the portal. Students are advised to prepare accordingly.', date: '01 Sep 2026', category: 'Examination', priority: 'High', read: false },
    { id: 2, title: 'CBAD Lab Assignment Released', desc: 'A new CBAD Practical 1 assignment has been published for CBAD. Due date is 10 September 2026. Please check the assignments section.', date: '01 Sep 2026', category: 'Assignment', priority: 'Normal', read: false },
    { id: 3, title: 'Attendance Regularization Notice', desc: 'Students with attendance below 75% in any subject must submit an attendance regularization request to the department office by 10 September 2026.', date: '31 Aug 2026', category: 'Attendance', priority: 'High', read: false },
    { id: 4, title: 'TA-1 Marks Published', desc: 'TA-1 marks for all subjects have been published on the portal. Students may view their marks under the Academics section. Any discrepancies should be reported within 3 days.', date: '28 Aug 2026', category: 'Academic', priority: 'Normal', read: true },
    { id: 5, title: 'Seminar on AI in Healthcare', desc: 'Department of CSE is organizing a seminar on "Artificial Intelligence in Healthcare" on 8 September 2026 at 11:00 AM in Seminar Hall A. Attendance is encouraged.', date: '27 Aug 2026', category: 'General', priority: 'Low', read: true }
  ]
};

// ── Backend API Client ─────────────────────────────────────
const API_BASE_URL = 'http://localhost:5050/api';

async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.warn(`[API Fallback] Could not fetch ${endpoint}:`, err.message);
    return null; // Gracefully fall back to APP_DATA in frontend pages
  }
}

// ── Helpers ─────────────────────────────────────────────────
function getGrade(percentage) {
  if (percentage >= 90) return { grade: 'A+', label: 'Excellent', color: 'green' };
  if (percentage >= 80) return { grade: 'A',  label: 'Very Good', color: 'green' };
  if (percentage >= 70) return { grade: 'B+', label: 'Good',      color: 'blue'  };
  if (percentage >= 60) return { grade: 'B',  label: 'Average',   color: 'blue'  };
  if (percentage >= 50) return { grade: 'C',  label: 'Below Average', color: 'amber' };
  return { grade: 'F', label: 'Fail', color: 'red' };
}

function getAttendanceStatus(pct) {
  if (pct >= 90) return { label: 'Excellent', color: 'green' };
  if (pct >= 75) return { label: 'Good',      color: 'green' };
  if (pct >= 65) return { label: 'Warning',   color: 'amber' };
  return { label: 'Critical', color: 'red' };
}

function getStatusBadge(status) {
  const map = {
    'Submitted':        { cls: 'badge-green',  dot: 'badge-dot-green'  },
    'Not Submitted':    { cls: 'badge-red',    dot: 'badge-dot-red'    },
    'Pending Evaluation':{ cls: 'badge-amber', dot: 'badge-dot-amber'  },
    'Evaluated':        { cls: 'badge-blue',   dot: 'badge-dot-blue'   },
    'Active':           { cls: 'badge-green',  dot: 'badge-dot-green'  },
    'Inactive':         { cls: 'badge-gray',   dot: 'badge-dot-gray'   },
    'Draft':            { cls: 'badge-gray',   dot: 'badge-dot-gray'   },
    'Published':        { cls: 'badge-green',  dot: 'badge-dot-green'  },
  };
  return map[status] || { cls: 'badge-gray', dot: 'badge-dot-gray' };
}

// ── Sidebar Navigation ──────────────────────────────────────

// Subnav toggle — registered ONCE at module level so double-calling
// initSidebar() never causes the open-then-close-on-same-click bug.
document.addEventListener('click', function(e) {
  const item = e.target.closest('.nav-item[data-subnav]');
  if (item) {
    e.preventDefault();
    e.stopPropagation();
    const targetId = item.dataset.subnav;
    const subnav = document.getElementById(targetId);
    if (!subnav) return;
    const isOpen = subnav.classList.contains('open');
    if (isOpen) {
      subnav.classList.remove('open');
      item.classList.remove('expanded');
    } else {
      // Close all other open subnavs first
      document.querySelectorAll('.subnav.open').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.nav-item.expanded').forEach(i => i.classList.remove('expanded'));
      subnav.classList.add('open');
      item.classList.add('expanded');
    }
  }
});

let _sidebarInitialized = false;
function initSidebar() {
  // Guard: only run setup once, even if called from multiple DOMContentLoaded handlers
  if (_sidebarInitialized) return;
  _sidebarInitialized = true;

  // 1. Auto-inject Top-Left Return Back Arrow in topbar
  const topbarLeft = document.querySelector('.topbar-left');
  if (topbarLeft && !topbarLeft.querySelector('.btn-back-nav')) {
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-back-nav';
    backBtn.title = 'Return to previous page';
    backBtn.setAttribute('aria-label', 'Return to previous page');
    backBtn.innerHTML = `
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
      </svg>
    `;
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.history.length > 1 && document.referrer) {
        window.history.back();
      } else {
        window.location.href = 'dashboard.html';
      }
    });
    const toggleBtn = topbarLeft.querySelector('.sidebar-toggle');
    if (toggleBtn) {
      toggleBtn.after(backBtn);
    } else {
      topbarLeft.prepend(backBtn);
    }
  }

  // 2. Mobile sidebar toggle button
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar   = document.querySelector('.sidebar');
  const overlay   = document.getElementById('sidebarOverlay');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebar && sidebar.classList.toggle('mobile-open');
      if (overlay) overlay.classList.toggle('hidden');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar && sidebar.classList.remove('mobile-open');
      overlay.classList.add('hidden');
    });
  }

  // 3. Mark active nav items based on current URL
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop().split('?')[0] || 'dashboard.html';
  document.querySelectorAll('.nav-item, .subnav-item').forEach(el => {
    const href = el.getAttribute('href');
    if (href && (href === filename || href.includes(filename))) {
      el.classList.add('active');
      const subnav = el.closest('.subnav');
      if (subnav) {
        subnav.classList.add('open');
        const parentId = subnav.id.replace('subnav-', 'nav-').replace('asubnav-', 'anav-');
        const parentNav = document.getElementById(parentId);
        if (parentNav) parentNav.classList.add('expanded');
      }
    }
  });
}

// ── Toast Notifications ─────────────────────────────────────
function showToast(type, title, message, duration = 4000) {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const icons = {
    success: `<svg class="toast-icon success" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    error:   `<svg class="toast-icon error"   fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    warning: `<svg class="toast-icon warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    info:    `<svg class="toast-icon info"    fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    ${icons[type] || ''}
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  `;
  container.appendChild(toast);
  if (duration > 0) setTimeout(() => toast.remove(), duration);
}

function createToastContainer() {
  const c = document.createElement('div');
  c.className = 'toast-container';
  document.body.appendChild(c);
  return c;
}

// ── Modal ───────────────────────────────────────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── Tabs ────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('[data-tab-group]').forEach(tabGroup => {
    const groupId = tabGroup.dataset.tabGroup;
    const tabs = document.querySelectorAll(`[data-tab="${groupId}"]`);
    const panels = document.querySelectorAll(`[data-panel="${groupId}"]`);

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tabTarget;
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.add('hidden'));
        tab.classList.add('active');
        const panel = document.querySelector(`[data-panel-id="${target}"]`);
        if (panel) panel.classList.remove('hidden');
      });
    });
  });
}

// ── Toggle Switches ─────────────────────────────────────────
function initToggles() {
  document.querySelectorAll('.toggle-switch').forEach(toggle => {
    const track = toggle.querySelector('.toggle-track');
    const input = toggle.querySelector('input[type="checkbox"]');
    if (track && input) {
      // Sync initial state
      if (input.checked) track.classList.add('checked');
      toggle.addEventListener('click', () => {
        input.checked = !input.checked;
        track.classList.toggle('checked', input.checked);
      });
    }
  });
}

// ── Dropdown Menus ──────────────────────────────────────────
function initDropdowns() {
  document.addEventListener('click', function(e) {
    const trigger = e.target.closest('[data-dropdown]');
    if (trigger) {
      e.stopPropagation();
      const menuId = trigger.dataset.dropdown;
      const menu = document.getElementById(menuId);
      if (menu) {
        const isOpen = menu.classList.contains('open');
        // Close all
        document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
        if (!isOpen) menu.classList.add('open');
      }
    } else {
      document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
    }
  });
}

// ── Password show/hide ──────────────────────────────────────
function initPasswordToggle() {
  document.querySelectorAll('[data-pwd-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const inputId = btn.dataset.pwdToggle;
      const input = document.getElementById(inputId);
      if (input) {
        const isText = input.type === 'text';
        input.type = isText ? 'password' : 'text';
        btn.querySelector('.eye-show') && (btn.querySelector('.eye-show').style.display = isText ? '' : 'none');
        btn.querySelector('.eye-hide') && (btn.querySelector('.eye-hide').style.display = isText ? 'none' : '');
      }
    });
  });
}

// ── Password Strength ───────────────────────────────────────
function calcPasswordStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score; // 0-4
}

function initPasswordStrength() {
  const pwdInput = document.getElementById('newPassword') || document.getElementById('password');
  const strengthBar = document.getElementById('strengthBar');
  const strengthLabel = document.getElementById('strengthLabel');
  if (!pwdInput || !strengthBar) return;

  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const classes = ['', 'weak', 'fair', 'good', 'strong'];
  const segments = strengthBar.querySelectorAll('.strength-bar-segment');

  pwdInput.addEventListener('input', () => {
    const score = calcPasswordStrength(pwdInput.value);
    segments.forEach((seg, i) => {
      seg.className = 'strength-bar-segment';
      if (i < score) seg.classList.add('filled', classes[score]);
    });
    if (strengthLabel) {
      strengthLabel.textContent = pwdInput.value ? labels[score] : '';
      strengthLabel.style.color = score <= 1 ? 'var(--error-600)' : score === 2 ? 'var(--warning-600)' : score === 3 ? 'var(--primary-600)' : 'var(--success-600)';
    }
  });
}

// ── Circular Progress ───────────────────────────────────────
function drawCircularProgress(el, percentage, color = '') {
  const size   = parseInt(el.dataset.size) || 120;
  const stroke = parseInt(el.dataset.stroke) || 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;
  const fillClass = color ? `circular-progress-fill ${color}` : 'circular-progress-fill';

  el.innerHTCAPML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle class="circular-progress-track" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}"/>
      <circle class="${fillClass}" cx="${size/2}" cy="${size/2}" r="${r}" stroke-width="${stroke}"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/>
    </svg>
    <div class="circular-progress-label">
      <span class="circular-progress-value">${percentage}%</span>
      ${el.dataset.sub ? `<span class="circular-progress-sub">${el.dataset.sub}</span>` : ''}
    </div>
  `;
}

function initCircularProgress() {
  document.querySelectorAll('.circular-progress[data-pct]').forEach(el => {
    drawCircularProgress(el, parseInt(el.dataset.pct), el.dataset.color || '');
  });
}

// ── Progress Bars ───────────────────────────────────────────
function initProgressBars() {
  document.querySelectorAll('.progress-bar[data-pct]').forEach(bar => {
    bar.style.width = bar.dataset.pct + '%';
  });
}

// ── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initTabs();
  initToggles();
  initDropdowns();
  initPasswordToggle();
  initPasswordStrength();
  initCircularProgress();
  initProgressBars();
});
