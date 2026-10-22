# Containerized Student Management System - Project Brain

## Architecture Overview
This is a responsive, desktop-first web application frontend for a Student Management System. It consists of two main portals:
1. **Student Portal** (`/student/`): Dashboard, profile, attendance, marks, assignments, timetable, announcements, notifications, and settings.
2. **Admin Portal** (`/admin/`): Dashboard, student management, subjects, attendance marking, marks entry, assignment creation, announcements, analytics, and system health.

## Technology Stack
- **HTML5**: Semantic structure.
- **Vanilla CSS**: Custom design system (`assets/css/design-system.css`) and reusable components (`assets/css/components.css`). Responsive grid and flexbox layouts.
- **Vanilla JavaScript**: Logic for UI interactions (tabs, modals, sidebars), mock data, and Chart.js integration (`assets/js/app.js`).
- **Chart.js**: Data visualization (bar, radar, doughnut, line charts).

## File Structure
- `index.html`: Login page (entry point).
- `forgot-password.html`: Password recovery page.
- `assets/`: Contains `css/`, `js/`, and images.
  - `css/design-system.css`: Core design tokens (colors, typography, spacing).
  - `css/components.css`: UI components (buttons, cards, tables, forms).
  - `css/sidebar.css`: Sidebar layout and styles.
  - `js/app.js`: Global logic, mock data, utility functions.
  - `js/student-sidebar.js`: Student navigation injection.
  - `js/admin-sidebar.js`: Admin navigation injection.
- `student/`: Student portal pages.
- `admin/`: Admin portal pages.

## Current Status
- Both Student and Admin portals are fully designed and implemented with realistic mock data.
- UI components are consistent and responsive.
- Next step is to serve the application locally to view it in a browser.

## Running the Application
Since this is a static HTML/CSS/JS site, you don't need `npm run dev`. You can serve it using any simple local HTTP server.

**Recommended Command:**
`python3 -m http.server 8000` or `npx serve .`
