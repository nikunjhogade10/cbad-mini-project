// ============================================================
// STUDENT SIDEBAR HTCAPML — injected into each student page
// ============================================================
const STUDENT_SIDEBAR = `
<aside class="sidebar" id="mainSidebar">
  <!-- Brand -->
  <a href="../index.html" class="sidebar-brand">
    <div class="sidebar-brand-logo">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
      </svg>
    </div>
    <div class="sidebar-brand-text">
      <div class="sidebar-brand-name">SMS Portal</div>
      <div class="sidebar-brand-sub">Academic Management</div>
    </div>
  </a>

  <!-- User -->
  <div class="sidebar-user">
    <div class="sidebar-user-avatar">NH</div>
    <div class="sidebar-user-info">
      <div class="sidebar-user-name">Nikunj Hogade</div>
      <div class="sidebar-user-id">MIT2026CS101</div>
    </div>
  </div>

  <!-- Navigation -->
  <nav class="sidebar-nav">
    <a href="dashboard.html" class="nav-item" id="nav-dashboard">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      <span class="nav-item-text">Dashboard</span>
    </a>

    <a href="profile.html" class="nav-item" id="nav-profile">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
      <span class="nav-item-text">My Profile</span>
    </a>

    <!-- Academics -->
    <div class="sidebar-section-label">Academics</div>
    <a href="javascript:void(0)" class="nav-item" id="nav-academics" data-subnav="subnav-academics">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      <span class="nav-item-text">Academics</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="subnav-academics">
      <a href="marks-ta1.html"     class="subnav-item" id="snav-ta1"><span class="subnav-dot"></span>TA-1 Marks</a>
      <a href="marks-ta2.html"     class="subnav-item" id="snav-ta2"><span class="subnav-dot"></span>TA-2 Marks</a>
      <a href="marks-overall.html" class="subnav-item" id="snav-overall"><span class="subnav-dot"></span>Overall Performance</a>
    </div>

    <!-- Assignments -->
    <div class="sidebar-section-label">Assignments</div>
    <a href="javascript:void(0)" class="nav-item" id="nav-assignments" data-subnav="subnav-assignments">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
      </svg>
      <span class="nav-item-text">Assignments</span>
      <span class="nav-item-badge">3</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="subnav-assignments">
      <a href="assignments.html?tab=all"            class="subnav-item" id="snav-assign-all"><span class="subnav-dot"></span>All Assignments</a>
      <a href="assignments.html?tab=submitted"      class="subnav-item" id="snav-assign-sub"><span class="subnav-dot"></span>Submitted</a>
      <a href="assignments.html?tab=not-submitted"  class="subnav-item" id="snav-assign-ns"><span class="subnav-dot"></span>Not Submitted</a>
    </div>

    <!-- Attendance -->
    <div class="sidebar-section-label">Attendance</div>
    <a href="javascript:void(0)" class="nav-item" id="nav-attendance" data-subnav="subnav-attendance">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
      </svg>
      <span class="nav-item-text">Attendance</span>
      <svg class="nav-item-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </a>
    <div class="subnav" id="subnav-attendance">
      <a href="attendance.html"         class="subnav-item" id="snav-att-overall"><span class="subnav-dot"></span>Overall Attendance</a>
      <a href="attendance-subject.html" class="subnav-item" id="snav-att-subject"><span class="subnav-dot"></span>Subject-wise</a>
    </div>

    <!-- Other -->
    <div class="sidebar-section-label">Portal</div>
    <a href="timetable.html" class="nav-item" id="nav-timetable">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <span class="nav-item-text">Timetable</span>
    </a>
    <a href="announcements.html" class="nav-item" id="nav-announcements">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
      </svg>
      <span class="nav-item-text">Announcements</span>
      <span class="nav-item-badge">3</span>
    </a>
    <a href="notifications.html" class="nav-item" id="nav-notifications">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
      <span class="nav-item-text">Notifications</span>
      <span class="nav-item-badge">5</span>
    </a>

    <!-- Settings -->
    <div class="sidebar-section-label">Account</div>
    <a href="settings.html" class="nav-item" id="nav-settings">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <span class="nav-item-text">Settings</span>
    </a>
  </nav>

  <!-- Footer -->
  <div class="sidebar-footer">
    <a href="../index.html" class="nav-item">
      <svg class="nav-item-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
      </svg>
      <span class="nav-item-text">Logout</span>
    </a>
  </div>
</aside>
<div class="sidebar-overlay hidden" id="sidebarOverlay"></div>
`;

// Inject sidebar
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sidebarContainer');
  if (container) container.innerHTML = STUDENT_SIDEBAR;
  if (typeof initSidebar === 'function') initSidebar();

  // Mark current page active
  const currentFile = window.location.pathname.split('/').pop().split('?')[0];
  const navMap = {
    'dashboard.html':           ['nav-dashboard'],
    'profile.html':             ['nav-profile'],
    'marks-ta1.html':           ['nav-academics', 'snav-ta1'],
    'marks-ta2.html':           ['nav-academics', 'snav-ta2'],
    'marks-overall.html':       ['nav-academics', 'snav-overall'],
    'assignments.html':         ['nav-assignments', 'snav-assign-all'],
    'assignment-detail.html':   ['nav-assignments'],
    'attendance.html':          ['nav-attendance', 'snav-att-overall'],
    'attendance-subject.html':  ['nav-attendance', 'snav-att-subject'],
    'timetable.html':           ['nav-timetable'],
    'announcements.html':       ['nav-announcements'],
    'notifications.html':       ['nav-notifications'],
    'settings.html':            ['nav-settings'],
  };

  const ids = navMap[currentFile] || [];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.add('active');
      // Open subnav if it's a subnav item
      const subnav = el.closest('.subnav');
      if (subnav) {
        subnav.classList.add('open');
        const parentId = subnav.id.replace('subnav-', 'nav-');
        const parent = document.getElementById(parentId);
        if (parent) parent.classList.add('expanded');
      }
    }
  });
});
