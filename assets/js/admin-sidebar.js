// ============================================================
// ADMIN SIDEBAR HTCAPML — injected into each admin page
// ============================================================
const ADMIN_SIDEBAR = `
<aside class="sidebar" id="mainSidebar">
  <a href="../index.html" class="sidebar-brand">
    <div class="sidebar-brand-logo">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    </div>
    <div class="sidebar-brand-text">
      <div class="sidebar-brand-name">Admin Portal</div>
      <div class="sidebar-brand-sub">Management System</div>
    </div>
  </a>

  <div class="sidebar-user">
    <div class="sidebar-user-avatar" style="background:linear-gradient(135deg,#dc2626,#7c3aed);">AD</div>
    <div class="sidebar-user-info">
      <div class="sidebar-user-name">Admin User</div>
      <div class="sidebar-user-id">MIT.Admin · CSE Dept.</div>
    </div>
  </div>

  <nav class="sidebar-nav">
    <a href="dashboard.html" class="nav-item" id="anav-dashboard">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
      <span class="nav-item-text">Dashboard</span>
    </a>

    <div class="sidebar-section-label">Student Management</div>
    <a href="javascript:void(0)" class="nav-item" id="anav-students" data-subnav="asubnav-students">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      <span class="nav-item-text">Students</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-students">
      <a href="students.html"     class="subnav-item" id="asnav-students"><span class="subnav-dot"></span>All Students</a>
      <a href="add-student.html"  class="subnav-item" id="asnav-add-student"><span class="subnav-dot"></span>Add Student</a>
    </div>

    <a href="javascript:void(0)" class="nav-item" id="anav-subjects" data-subnav="asubnav-subjects">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
      <span class="nav-item-text">Subjects</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-subjects">
      <a href="subjects.html"     class="subnav-item" id="asnav-subjects"><span class="subnav-dot"></span>All Subjects</a>
      <a href="add-subject.html"  class="subnav-item" id="asnav-add-subject"><span class="subnav-dot"></span>Add Subject</a>
    </div>

    <div class="sidebar-section-label">Attendance</div>
    <a href="javascript:void(0)" class="nav-item" id="anav-attendance" data-subnav="asubnav-attendance">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
      <span class="nav-item-text">Attendance</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-attendance">
      <a href="attendance-mark.html"    class="subnav-item" id="asnav-mark-att"><span class="subnav-dot"></span>Mark Attendance</a>
      <a href="attendance-records.html" class="subnav-item" id="asnav-att-records"><span class="subnav-dot"></span>Attendance Records</a>
      <a href="attendance-reports.html" class="subnav-item" id="asnav-att-reports"><span class="subnav-dot"></span>Attendance Reports</a>
    </div>

    <div class="sidebar-section-label">Marks &amp; Assessment</div>
    <a href="javascript:void(0)" class="nav-item" id="anav-marks" data-subnav="asubnav-marks">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      <span class="nav-item-text">Marks</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-marks">
      <a href="marks-ta1.html"     class="subnav-item" id="asnav-marks-ta1"><span class="subnav-dot"></span>TA-1 Marks</a>
      <a href="marks-ta2.html"     class="subnav-item" id="asnav-marks-ta2"><span class="subnav-dot"></span>TA-2 Marks</a>
      <a href="marks-overall.html" class="subnav-item" id="asnav-marks-overall"><span class="subnav-dot"></span>Overall Marks</a>
    </div>

    <div class="sidebar-section-label">Assignments</div>
    <a href="javascript:void(0)" class="nav-item" id="anav-assignments" data-subnav="asubnav-assignments">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
      <span class="nav-item-text">Assignments</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-assignments">
      <a href="create-assignment.html"    class="subnav-item" id="asnav-create-assign"><span class="subnav-dot"></span>Create Assignment</a>
      <a href="assignments.html"           class="subnav-item" id="asnav-all-assign"><span class="subnav-dot"></span>All Assignments</a>
      <a href="submission-status.html"    class="subnav-item" id="asnav-submission"><span class="subnav-dot"></span>Submission Status</a>
    </div>

    <div class="sidebar-section-label">Administration</div>
    <a href="javascript:void(0)" class="nav-item" id="anav-timetable" data-subnav="asubnav-timetable">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      <span class="nav-item-text">Timetable</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-timetable">
      <a href="timetable.html"        class="subnav-item" id="asnav-timetable"><span class="subnav-dot"></span>Manage Timetable</a>
    </div>

    <a href="javascript:void(0)" class="nav-item" id="anav-announcements" data-subnav="asubnav-announcements">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6"/></svg>
      <span class="nav-item-text">Announcements</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="asubnav-announcements">
      <a href="announcements.html"        class="subnav-item" id="asnav-announcements"><span class="subnav-dot"></span>Create &amp; Manage</a>
    </div>

    <a href="analytics.html" class="nav-item" id="anav-analytics">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>
      <span class="nav-item-text">Analytics</span>
    </a>

    <a href="system-health.html" class="nav-item" id="anav-health">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
      <span class="nav-item-text">System Health</span>
      <span class="nav-item-badge" style="background:var(--success-500);">●</span>
    </a>

    <div class="sidebar-section-label">Account</div>
    <a href="settings.html" class="nav-item" id="anav-settings">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      <span class="nav-item-text">Settings</span>
    </a>
  </nav>

  <div class="sidebar-footer">
    <a href="../index.html" class="nav-item">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
      <span class="nav-item-text">Logout</span>
    </a>
  </div>
</aside>
<div class="sidebar-overlay hidden" id="sidebarOverlay"></div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sidebarContainer');
  if (container) container.innerHTML = ADMIN_SIDEBAR;
  if (typeof initSidebar === 'function') initSidebar();

  const currentFile = window.location.pathname.split('/').pop().split('?')[0];
  const navMap = {
    'dashboard.html':          ['anav-dashboard'],
    'students.html':           ['anav-students', 'asnav-students'],
    'add-student.html':        ['anav-students', 'asnav-add-student'],
    'subjects.html':           ['anav-subjects', 'asnav-subjects'],
    'add-subject.html':        ['anav-subjects', 'asnav-add-subject'],
    'attendance-mark.html':    ['anav-attendance', 'asnav-mark-att'],
    'attendance-records.html': ['anav-attendance', 'asnav-att-records'],
    'attendance-reports.html': ['anav-attendance', 'asnav-att-reports'],
    'marks-ta1.html':          ['anav-marks', 'asnav-marks-ta1'],
    'marks-ta2.html':          ['anav-marks', 'asnav-marks-ta2'],
    'marks-overall.html':      ['anav-marks', 'asnav-marks-overall'],
    'create-assignment.html':  ['anav-assignments', 'asnav-create-assign'],
    'assignments.html':        ['anav-assignments', 'asnav-all-assign'],
    'submission-status.html':  ['anav-assignments', 'asnav-submission'],
    'timetable.html':          ['anav-timetable', 'asnav-timetable'],
    'announcements.html':      ['anav-announcements', 'asnav-announcements'],
    'analytics.html':          ['anav-analytics'],
    'system-health.html':      ['anav-health'],
    'settings.html':           ['anav-settings'],
  };

  (navMap[currentFile] || []).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
      const subnav = el.closest('.subnav');
      if (subnav) {
        subnav.classList.add('open');
        const parentId = subnav.id.replace('asubnav-', 'anav-');
        const parent = document.getElementById(parentId);
        if (parent) parent.classList.add('expanded');
      }
    }
  });
});
