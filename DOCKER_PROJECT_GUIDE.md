# Containerized Student Management System (CBAD Mini Project)
## Comprehensive Architecture, Implementation & Docker Presentation Guide

---

## 📌 1. Project Overview

The **Containerized Student Management System (SMS)** is a modern, responsive, 3-tier web application designed for academic management in colleges and universities. Built specifically for the **Container Based Application Development (CBAD)** course, the system demonstrates how enterprise software can be decoupled into microservices, containerized using Docker, and orchestrated seamlessly using Docker Compose.

### Key Capabilities
- **Student Portal**: Dashboard, Academic Performance (TA-1, TA-2, Overall), Assignment Submissions, Timetable View, Attendance Tracking, Announcements, Notifications, Profile & Settings.
- **Admin & Faculty Portal**: Student Management (Enrollment/Status), Subject Allocation, Attendance Marking, Grade Publishing (TA-1/TA-2 Flow), Analytics Dashboard, System Health Monitoring.
- **Microservices Architecture**: Completely separated Frontend, Backend REST API, and Relational Database.

---

## 🏗️ 2. System Architecture & Tech Stack

```
                     +----------------------------------+
                     |         Web Browser              |
                     |  (http://localhost:8080)         |
                     +-----------------+----------------+
                                       |
                                       v
                     +-----------------+----------------+
                     |    cbad_frontend Container       |
                     |    (Nginx:Alpine - Port 80)      |
                     +-----------------+----------------+
                                       |
                           REST API / JSON Calls
                                       v
                     +-----------------+----------------+
                     |    cbad_backend Container        |
                     |    (Node.js / Express - 5050)    |
                     +-----------------+----------------+
                                       |
                             SQL Queries (mysql2)
                                       v
                     +-----------------+----------------+
                     |    cbad_mysql Container          |
                     |    (MySQL 8.0 - Host Port 3307)   |
                     |    Database: cbad_db             |
                     +----------------------------------+
```

### Component Details
1. **Frontend Tier (`cbad_frontend`)**:
   - **Tech**: HTML5, Vanilla CSS3 (Custom SaaS Design System with glassmorphism & gradients), JavaScript (ES6+).
   - **Server**: Lightweight `nginx:alpine` image.
   - **Role**: Serves the user interfaces for Student and Admin portals fast and securely.

2. **Backend Tier (`cbad_backend`)**:
   - **Tech**: Node.js v18 (Alpine), Express.js REST Framework, CORS middleware, dotenv configuration.
   - **Role**: Provides modular REST endpoints (`/api/student`, `/api/subjects`, `/api/attendance`, `/api/assignments`, `/api/marks`, `/api/announcements`, `/api/timetable`).

3. **Database Tier (`cbad_mysql`)**:
   - **Tech**: MySQL 8.0 Relational Database Engine.
   - **Database Name**: `cbad_db`.
   - **Role**: Persists relational data (`students`, `subjects`, `attendance`, `assignments`, `marks`, `announcements`, `timetable`) with foreign key constraints.

---

## 🐳 3. How Docker is Implemented (Step-by-Step)

Containerization isolates each component so the application can run identically on any host machine without installing Node.js, Nginx, or MySQL locally.

### Step 1: Frontend Containerization (`Dockerfile`)
The frontend uses Nginx to serve static files efficiently.

**File:** [`Dockerfile`](file:///Users/nikunjsantoshhogade/CBAD%20Mini%20Project/Dockerfile)
```dockerfile
# 1. Base image: Official lightweight Nginx on Alpine Linux
FROM nginx:alpine

# 2. Copy static files into Nginx default serve directory
COPY . /usr/share/nginx/html

# 3. Expose port 80
EXPOSE 80

# 4. Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Backend Containerization (`backend/Dockerfile`)
The Node.js Express API service is containerized in its own directory.

**File:** [`backend/Dockerfile`](file:///Users/nikunjsantoshhogade/CBAD%20Mini%20Project/backend/Dockerfile)
```dockerfile
# 1. Base image: Node.js 18 on Alpine Linux
FROM node:18-alpine

# 2. Set working directory in container
WORKDIR /app

# 3. Copy package descriptors & install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# 4. Copy backend source code
COPY . .

# 5. Expose port 5050 & set environment variables
EXPOSE 5050
ENV PORT=5050
ENV NODE_ENV=production

# 6. Start Express server
CMD ["node", "src/server.js"]
```

### Step 3: Database Containerization & Auto-Initialization
MySQL 8.0 is containerized with custom startup initialization.

- **Schema Script** ([`database/schema.sql`](file:///Users/nikunjsantoshhogade/CBAD%20Mini%20Project/database/schema.sql)): Creates DDL tables (`students`, `subjects`, `attendance`, etc.).
- **Seed Script** ([`database/seed.sql`](file:///Users/nikunjsantoshhogade/CBAD%20Mini%20Project/database/seed.sql)): Populates realistic DML data for the CBAD timetable.
- MySQL executes any `.sql` scripts mounted in `/docker-entrypoint-initdb.d/` on first-time container boot.

### Step 4: Multi-Container Orchestration (`docker-compose.yml`)
Docker Compose connects all 3 containers onto a unified bridge network, configures environment variables, ports, volumes, and health dependencies.

**File:** [`docker-compose.yml`](file:///Users/nikunjsantoshhogade/CBAD%20Mini%20Project/docker-compose.yml)
```yaml
version: '3.8'

services:
  # 1. Frontend Nginx Server
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: cbad_frontend
    ports:
      - "8080:80"
    restart: always
    depends_on:
      - backend

  # 2. Backend Express API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: cbad_backend
    ports:
      - "5050:5050"
    environment:
      - PORT=5050
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PORT=3306
      - DB_USER=cbad_user
      - DB_PASSWORD=cbad_password_2026
      - DB_NAME=cbad_db
    restart: always
    depends_on:
      db:
        condition: service_healthy

  # 3. MySQL 8.0 Database Service
  db:
    image: mysql:8.0
    container_name: cbad_mysql
    command: --default-authentication-plugin=mysql_native_password
    ports:
      - "3307:3306"
    environment:
      - MYSQL_DATABASE=cbad_db
      - MYSQL_USER=cbad_user
      - MYSQL_PASSWORD=cbad_password_2026
      - MYSQL_ROOT_PASSWORD=cbad_root_secret
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/01_schema.sql:ro
      - ./database/seed.sql:/docker-entrypoint-initdb.d/02_seed.sql:ro
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "mysqladmin ping -h localhost -u root -pcbad_root_secret || exit 1"]
      interval: 5s
      timeout: 5s
      retries: 15

volumes:
  mysql_data:
    driver: local
```

---

## 💻 4. Step-by-Step Command Guide

### 1. Build and Start All Containers
To build the images, create the network, initialize the MySQL database, and run all services:
```bash
docker compose up --build
```
*(To run in detached background mode, add `-d`: `docker compose up --build -d`)*

### 2. View Running Containers & Status
Check the status of all active containers:
```bash
docker compose ps
```
Or system-wide:
```bash
docker ps
```

### 3. Check Container Logs
View real-time backend API logs:
```bash
docker logs -f cbad_backend
```
View MySQL initialization logs:
```bash
docker logs -f cbad_mysql
```

### 4. Execute Interactive Shell Inside Containers
Log into the running MySQL container and execute SQL queries:
```bash
docker exec -it cbad_mysql mysql -ucbad_user -pcbad_password_2026 cbad_db
```
*(Once inside MySQL prompt)*:
```sql
SHOW TABLES;
SELECT * FROM subjects;
SELECT * FROM students;
```

Log into the running Backend container shell:
```bash
docker exec -it cbad_backend sh
```

### 5. Stop and Clean Up Stack
Stop containers while preserving data:
```bash
docker compose down
```
Stop containers and delete volumes (fresh database reset):
```bash
docker compose down -v
```

---

## 🎓 5. Frequently Asked Presentation / Viva Questions

### Q1: Why did you use Docker for this project?
**Answer**: Docker eliminates the *"it works on my machine"* problem. By containerizing the Frontend, Backend, and MySQL database, anyone can clone the repository and run `docker compose up` to launch the complete system in seconds without installing Node.js, Nginx, or MySQL on their host machine.

### Q2: What is the difference between Dockerfile and Docker Compose?
**Answer**: A `Dockerfile` defines how to build a *single* container image (e.g., frontend Nginx or backend Node). `Docker Compose` is an orchestration tool defined in `docker-compose.yml` that configures and runs *multiple* interconnected containers together on a shared network with environment variables, volume persistence, and dependency rules.

### Q3: How do the containers communicate with each other?
**Answer**: Docker Compose automatically creates an internal bridge network (`cbadminiproject_default`). Containers can communicate using their service names as hostnames. For example, `cbad_backend` connects to `cbad_mysql` using `DB_HOST=db` on port `3306`.

### Q4: How is database persistence handled when a container is restarted?
**Answer**: We use a named Docker volume (`mysql_data:/var/lib/mysql`). The database files are stored safely on the host machine's Docker storage driver, ensuring data is not lost even if the `cbad_mysql` container is stopped or recreated.

### Q5: Why is host port 3307 mapped to container port 3306 for MySQL?
**Answer**: Host machines often have a local MySQL instance running on default port `3306`. Mapping `"3307:3306"` avoids host port collision while keeping internal container communication on standard port `3306`.
