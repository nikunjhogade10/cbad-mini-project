# CBAD Mini Project — Complete Docker Commands & CI/CD Reference Guide
## Covering All 4 Units of Syllabus + Full CI/CD GitHub Actions & Docker Pipeline

---

## 📑 Table of Contents
1. [Unit I — Introduction to Containers](#-unit-i--introduction-to-containers)
2. [Unit II — Introduction to Docker & Compose](#-unit-ii--introduction-to-docker--compose)
3. [Unit III — Security, Networking & Storage](#-unit-iii--security-networking--storage)
4. [Unit IV — Advanced Concepts, Monitoring & Production](#-unit-iv--advanced-concepts-monitoring--production)
5. [CI/CD Pipeline with Docker & GitHub Actions (Video Demonstration Implementation)](#-cicd-pipeline-with-docker--github-actions)
   - [Pipeline Architecture & Workflow](#pipeline-architecture--workflow)
   - [Prerequisites & Initial Setup (SSH & Docker Hub Secrets)](#prerequisites--initial-setup)
   - [The 3 Sequential Jobs Explained](#the-3-sequential-jobs-explained)
   - [Step-by-Step CI/CD Commands](#step-by-step-cicd-commands)
   - [Testing Scenarios: Success, Simulated Failure & Recovery](#testing-scenarios-success-simulated-failure--recovery)
6. [Master Command Cheat Sheet](#-master-command-cheat-sheet)

---

## 🟦 Unit I — Introduction to Containers

**Syllabus Topic:** Introduction to Containers, Containerization history, Container components & architecture, Container runtime, Understanding containerization technologies: Docker, Microservice, CaaS, Serverless.

### Commands Used in This Project

```bash
# ── Container Basics ────────────────────────────────────────

# Check Docker installation and engine information
docker --version
docker info

# Pull base images used in our microservice architecture
docker pull nginx:alpine          # Base image for cbad_frontend container
docker pull node:18-alpine        # Base image for cbad_backend container
docker pull mysql:8.0             # Base image for cbad_mysql database container

# Build individual service images manually from Dockerfiles
docker build -t cbad-frontend .
docker build -t cbad-backend ./backend

# Run standalone containers manually (without compose orchestration)
docker run -d -p 8080:80 --name cbad_frontend cbad-frontend
docker run -d -p 5050:5050 --name cbad_backend cbad-backend

# List running containers
docker ps

# List all containers (including stopped/exited)
docker ps -a

# Stop and restart specific containers
docker stop cbad_frontend
docker start cbad_frontend

# Remove containers
docker rm cbad_frontend

# Manage local Docker images
docker images
docker rmi cbad-frontend

# Inspect container low-level metadata (JSON)
docker inspect cbad_frontend
docker inspect cbad_backend
docker inspect cbad_mysql

# Monitor real-time container resource usage (CPU%, Memory, Net I/O)
docker stats
```

### Implementation in This Project

| Service Name | Base Image | Port Mapping | Responsibility |
|---|---|---|---|
| `cbad_frontend` | `nginx:alpine` | `8080:80` | Serves HTML5, CSS3 design system, and client JavaScript |
| `cbad_backend` | `node:18-alpine` | `5050:5050` | Express REST API for student profiles, marks, attendance, etc. |
| `cbad_mysql` | `mysql:8.0` | `3307:3306` | Relational database engine with persistent tables & seed data |

---

## 🟩 Unit II — Introduction to Docker & Compose

**Syllabus Topic:** Docker Lifecycle, Docker Components, Docker Hub, Dockerfile instructions, Docker Commands, Docker Compose orchestration.

### Commands Used in This Project

```bash
# ── Primary Project Orchestration Commands ───────────────────

# Build images and start all 3 containers in foreground
docker compose up --build

# Build images and start all 3 containers in detached (background) mode
docker compose up --build -d

# Check status of compose services
docker compose ps

# Build container images only without launching them
docker compose build

# Force clean rebuild of all images without using Docker layer cache
docker compose build --no-cache

# Stop and safely tear down all containers (preserves database volume)
docker compose down

# Stop and delete containers AND volumes (CAUTION: wipes MySQL data!)
docker compose down -v

# Stop, remove containers, volumes, and locally built images
docker compose down -v --rmi all

# Restart an individual service without restarting the entire stack
docker compose restart backend
docker compose restart frontend

# View images created and managed by Docker Compose
docker compose images

# ── Docker Hub Integration ───────────────────────────────────

# Authenticate local Docker CLI with Docker Hub registry
docker login -u <your-dockerhub-username>

# Tag local project images with Docker Hub namespace and version tag
docker tag cbad-frontend <your-dockerhub-username>/cbad-frontend:1.0
docker tag cbad-backend <your-dockerhub-username>/cbad-backend:1.0

# Push tagged images to Docker Hub online repository
docker push <your-dockerhub-username>/cbad-frontend:1.0
docker push <your-dockerhub-username>/cbad-backend:1.0

# Pull image from Docker Hub registry
docker pull <your-dockerhub-username>/cbad-frontend:1.0
```

### Dockerfile Breakdown

#### Frontend (`Dockerfile`):
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
* **FROM**: Uses ultralightweight Alpine Linux with Nginx pre-installed (~23MB).
* **COPY**: Injects all static assets into Nginx's default document root.
* **EXPOSE**: Informs Docker that the container listens on port 80.
* **CMD**: Keeps Nginx running in the foreground to prevent container exit.

#### Backend (`backend/Dockerfile`):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 5050
ENV PORT=5050 NODE_ENV=production
CMD ["node", "src/server.js"]
```
* **WORKDIR**: Sets container working directory to `/app`.
* **Layer Caching**: Copies `package.json` first and runs `npm install` before copying source code, ensuring npm dependencies aren't re-downloaded unless dependencies change.

---

## 🟧 Unit III — Security, Networking & Storage

**Syllabus Topic:** Docker Volumes, Types of Storage, Persistent Storage, Container Networking, Network Types, Docker DNS, Container Security, Managing Secrets, Environment Variables, Security Tools (Trivy, Snyk).

### Commands Used in This Project

```bash
# ── Volumes & Storage ────────────────────────────────────────

# List all Docker volumes on the host system
docker volume ls

# Inspect MySQL volume details and mount path
docker volume inspect cbadminiproject_mysql_data

# Backup MySQL persistent volume into a compressed archive
docker run --rm \
  -v cbadminiproject_mysql_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/cbad_mysql_backup.tar.gz -C /data .

# Remove unattached/dangling volumes
docker volume prune

# ── Container Networking ─────────────────────────────────────

# List all Docker networks
docker network ls

# Inspect the bridge network generated by Docker Compose
docker network inspect cbadminiproject_default

# Test internal Docker DNS resolution from backend to database
docker exec cbad_backend ping db
docker exec cbad_backend nslookup db

# ── Environment Variables & Secrets ──────────────────────────

# Inspect active environment variables inside backend container
docker exec cbad_backend env

# ── Security Scanning (Trivy) ────────────────────────────────

# Scan frontend and backend container images for CVE vulnerabilities
trivy image cbadminiproject-frontend
trivy image cbadminiproject-backend

# Filter scan for HIGH and CRITICAL security vulnerabilities only
trivy image --severity HIGH,CRITICAL cbadminiproject-backend
```

### Storage & Networking Architecture

```
Storage:
  [Named Volume] mysql_data ──────> /var/lib/mysql (persistent data survives down)
  [Bind Mount]   ./database/schema.sql ─> /docker-entrypoint-initdb.d/01_schema.sql:ro
  [Bind Mount]   ./database/seed.sql   ─> /docker-entrypoint-initdb.d/02_seed.sql:ro

Networking:
  Bridge Network: cbadminiproject_default
  DNS Resolution: Backend resolves "db" -> cbad_mysql container internal IP (172.x.x.x)
  Port Exposure:
    Host 8080:80   -> cbad_frontend
    Host 5050:5050 -> cbad_backend
    Host 3307:3306 -> cbad_mysql
```

---

## 🟥 Unit IV — Advanced Concepts, Monitoring & Production

**Syllabus Topic:** Advanced Image Building, Multi-Stage Builds, CI/CD Integration, Introduction to Kubernetes, Docker & Microservices, Performance Tuning, Docker in Production.

### Commands Used in This Project

```bash
# ── Health Checks & Live Monitoring ──────────────────────────

# View health check states of all containers
docker compose ps

# View specific MySQL health check result
docker inspect --format='{{.State.Health.Status}}' cbad_mysql

# ── Live Logs & Debugging ────────────────────────────────────

# Stream real-time logs for all microservices
docker compose logs -f

# Follow logs for backend specifically
docker compose logs -f backend

# Show last 50 lines of database container logs
docker compose logs --tail=50 db

# ── Interactive Shell Execution ──────────────────────────────

# Execute interactive shell inside running backend container
docker exec -it cbad_backend sh

# Access MySQL database directly via command-line client
docker exec -it cbad_mysql mysql -u cbad_user -pcbad_password_2026 cbad_db

# Query database directly from host
docker exec cbad_mysql mysql -u root -pcbad_root_secret cbad_db -e "SELECT count(*) FROM students;"

# ── Image Layer Inspection & Optimization ────────────────────

# Inspect image build layers and sizes
docker history cbadminiproject-frontend
docker history cbadminiproject-backend

# Clean up build cache and unused containers
docker system prune
docker system df
```

---

## 🚀 CI/CD Pipeline with Docker & GitHub Actions

### Overview
This pipeline automates the complete lifecycle: **Code Change → Automated Testing → Image Build → Docker Hub Registry Push → Automatic Deployment**.

Whenever a developer pushes code to the `main` branch, GitHub Actions executes 3 sequential jobs. If any stage fails, the entire pipeline halts immediately, protecting production from faulty code.

---

### Pipeline Architecture & Workflow

```
 ┌────────────────┐
 │ Developer Host │
 └───────┬────────┘
         │ 1. git push origin main (via SSH / Personal Access Token)
         ▼
 ┌────────────────────────────────────────────────────────┐
 │            GitHub Actions Runner (ubuntu-latest)       │
 │                                                        │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ Job 1: Build & Test                              │  │
 │  │  • Checkout repo (actions/checkout@v4)           │  │
 │  │  • Install Node.js & dependencies                │  │
 │  │  • Run unit tests (HTTP 200, string checks)      │  │
 │  │  • Test local Docker image build                 │  │
 │  └────────────────────────┬─────────────────────────┘  │
 │                           │ (Only if Job 1 PASSES)     │
 │                           ▼                            │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ Job 2: Push Image to Docker Hub                  │  │
 │  │  • Authenticate with DOCKER_USERNAME & TOKEN     │  │
 │  │  • Build multi-platform Docker images            │  │
 │  │  • Push tagged images: latest, 1.0, commit-SHA   │  │
 │  └────────────────────────┬─────────────────────────┘  │
 │                           │ (Only if Job 2 PASSES)     │
 │                           ▼                            │
 │  ┌──────────────────────────────────────────────────┐  │
 │  │ Job 3: Deploy Updated Container                  │  │
 │  │  • Pull fresh image from Docker Hub              │  │
 │  │  • Stop & remove old container (prevent naming    │  │
 │  │    conflicts and port collisions)                │  │
 │  │  • Spawn updated production container            │  │
 │  │  • Verify container health                      │  │
 │  └──────────────────────────────────────────────────┘  │
 └────────────────────────────────────────────────────────┘
```

---

### Prerequisites & Initial Setup

#### 1. SSH Authentication Setup (Local Machine → GitHub)
Used to securely push code without typing passwords every time:

```bash
# 1. Generate SSH key using the ED25519 algorithm
ssh-keygen -t ed25519 -C "nikunj.hogade@mit.edu.in"

# 2. Start the SSH agent and add your private key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Copy public key to clipboard (macOS / Linux)
cat ~/.ssh/id_ed25519.pub | pbcopy
# On Windows PowerShell:
# Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

# 4. Add key to GitHub:
# Go to GitHub.com -> Settings -> SSH and GPG keys -> New SSH Key -> Paste and Save

# 5. Test connection
ssh -T git@github.com
# Expected output: "Hi <username>! You've successfully authenticated..."
```

#### 2. Linking Docker Hub to GitHub (Repository Secrets)
To enable GitHub Actions to push images to your Docker Hub account:

1. **Generate Docker Hub Access Token**:
   - Go to [Docker Hub](https://hub.docker.com/) → **Account Settings** → **Personal Access Tokens**.
   - Click **Generate New Token**.
   - Set description (e.g. `github-actions-ci-cd`) with **Read, Write, Delete** permissions.
   - Copy the generated token string.

2. **Add GitHub Repository Secrets**:
   - In your GitHub Repository, navigate to **Settings** → **Secrets and variables** → **Actions**.
   - Click **New repository secret**:
     - Name: `DOCKER_USERNAME` | Value: `<your-dockerhub-username>`
     - Name: `DOCKER_TOKEN`    | Value: `<your-docker-hub-access-token>`

---

### The 3 Sequential Jobs Explained

#### **Job 1: Build & Test (`build-and-test`)**
* **Trigger**: Automatic on `push` or `pull_request` to `main`.
* **Environment**: `ubuntu-latest`.
* **Actions Performed**:
  1. Checks out repository files using `actions/checkout@v4`.
  2. Sets up Node.js v18 and installs npm dependencies (`npm ci`).
  3. Executes automated unit tests (`npm test` / `node --test test/api.test.js`).
  4. Inspects HTTP status codes (`200 OK`) and asserts expected strings (`status === 'UP'`, `service === 'Student Management System'`).
  5. Performs local `docker build` to guarantee Dockerfiles compile without errors.
* **Fail-Safe**: If tests fail, the workflow aborts instantly.

#### **Job 2: Push Image (`push-image`)**
* **Trigger**: Executes only after Job 1 succeeds (`needs: [build-and-test]`).
* **Actions Performed**:
  1. Authenticates against Docker Hub using GitHub secrets (`DOCKER_USERNAME`, `DOCKER_TOKEN`).
  2. Configures Docker Buildx.
  3. Tags images with `:latest`, `:1.0`, and commit SHA (`:${{ github.sha }}`).
  4. Pushes production-ready container images directly to Docker Hub registry.

#### **Job 3: Deploy Image (`deploy-image`)**
* **Trigger**: Executes only after Job 2 succeeds (`needs: [push-image]`).
* **Actions Performed**:
  1. Authenticates and pulls latest image from Docker Hub (`docker pull`).
  2. Safely halts and removes previous containers (`docker stop ... || true` and `docker rm ... || true`) to eliminate naming/port conflicts.
  3. Launches the freshly pulled container image in detached mode (`docker run -d -p 8080:80 ...`).
  4. Runs post-deployment health check (`docker ps`).

---

### Step-by-Step CI/CD Commands

```bash
# ── 1. Local Development & Testing ───────────────────────────

# Run unit tests locally before pushing
cd backend
npm test

# Run Python pytest test suite (as shown in video)
cd ..
python3 -m pytest test_app.py

# ── 2. Git Workflow (Triggering the Pipeline) ─────────────────

# Stage changes
git add .

# Commit with a descriptive message
git commit -m "feat: implement automated CI/CD pipeline and test suite"

# Push to GitHub to trigger GitHub Actions
git push origin main

# ── 3. Manual Testing in Docker Container (Job 1 Simulation) ─

# Build backend test image locally
docker build -t cbad-backend:test ./backend

# Run automated tests inside an isolated container
docker run --rm cbad-backend:test npm test

# ── 4. Manual Push to Docker Hub (Job 2 Simulation) ──────────

# Log in to Docker Hub
docker login -u <your-dockerhub-username>

# Tag images
docker tag cbad-frontend <your-dockerhub-username>/cbad-frontend:1.0
docker tag cbad-frontend <your-dockerhub-username>/cbad-frontend:latest
docker tag cbad-backend <your-dockerhub-username>/cbad-backend:1.0
docker tag cbad-backend <your-dockerhub-username>/cbad-backend:latest

# Push to registry
docker push <your-dockerhub-username>/cbad-frontend:latest
docker push <your-dockerhub-username>/cbad-backend:latest

# ── 5. Manual Container Deployment (Job 3 Simulation) ────────

# Pull latest image from registry
docker pull <your-dockerhub-username>/cbad-frontend:latest

# Stop and remove existing container
docker stop cbad_frontend_live || true
docker rm cbad_frontend_live || true

# Run updated container
docker run -d -p 8080:80 --name cbad_frontend_live <your-dockerhub-username>/cbad-frontend:latest

# Verify live status
docker ps
```

---

### Testing Scenarios: Success, Simulated Failure & Recovery

#### Scenario A: Successful Pipeline
1. Developer edits application code or frontend views.
2. Commits and pushes changes:
   ```bash
   git commit -m "update: student dashboard layout"
   git push origin main
   ```
3. GitHub Actions triggers `.github/workflows/ci-cd.yml`.
4. Job 1 runs `npm test` → All 4 tests pass with HTTP 200.
5. Job 2 logs into Docker Hub and pushes the updated images.
6. Job 3 deploys the new container image.
7. **Status**: All 3 jobs display green checkmarks (✅).

#### Scenario B: Deliberately Simulated Failure (Video Lecture Demonstration)
In the lecture, a test failure was deliberately introduced to show how CI protects production:
1. Open `backend/test/api.test.js` (or `test_app.py`).
2. Deliberately modify the expected string from `'UP'` to `'random'`:
   ```javascript
   // Change from:
   assert.strictEqual(data.status, 'UP');
   // To intentional mismatch:
   assert.strictEqual(data.status, 'random');
   ```
3. Commit and push:
   ```bash
   git commit -m "test: simulate failing test assertion"
   git push origin main
   ```
4. **Result in GitHub Actions**:
   - **Job 1 (Build & Test)**: Fails with `AssertionError [ERR_ASSERTION]: Expected values to be strictly equal: 'UP' !== 'random'`.
   - **Job 2 (Push Image)**: **SKIPPED** (due to `needs: [build-and-test]`).
   - **Job 3 (Deploy Image)**: **SKIPPED**.
5. **Key Concept Demonstrated**: The pipeline acts as a safety gate. Broken code cannot get tagged, cannot be pushed to Docker Hub, and cannot replace the live application.

#### Scenario C: Pipeline Recovery
1. Revert the test assertion back to `'UP'`.
2. Commit and push:
   ```bash
   git commit -m "fix: restore valid test assertion"
   git push origin main
   ```
3. GitHub Actions re-triggers.
4. Job 1 passes → Job 2 publishes new image → Job 3 successfully deploys.
5. **Status**: Fully recovered with all stages green.

---

## 📋 Master Command Cheat Sheet

| Command | Category / Unit | Purpose in This Project |
|---|---|---|
| `docker compose up --build -d` | Units I & II | Builds all images and starts the 3-tier stack in background |
| `docker compose down` | Unit II | Stops containers while preserving persistent database data |
| `docker compose down -v` | Unit III | Stops containers and deletes persistent MySQL volume |
| `docker compose ps` | Units I & IV | Lists all running containers with port mappings and health status |
| `docker compose logs -f backend` | Unit IV | Follows real-time streaming logs from Express API |
| `docker stats` | Unit IV | Live CPU%, Memory, and Network usage monitor |
| `docker volume ls` | Unit III | Inspects persistent named volumes (`mysql_data`) |
| `docker network inspect cbadminiproject_default` | Unit III | Views internal bridge network and container IP allocations |
| `docker exec -it cbad_backend sh` | Unit IV | Opens shell inside running Node.js backend container |
| `docker exec -it cbad_mysql mysql -u cbad_user -pcbad_password_2026 cbad_db` | Unit III | Opens interactive SQL prompt inside MySQL container |
| `trivy image cbadminiproject-backend` | Unit III | Security vulnerability scanner for container images |
| `ssh-keygen -t ed25519 -C "email"` | CI/CD | Generates secure SSH key pair for GitHub authentication |
| `ssh -T git@github.com` | CI/CD | Verifies SSH connection between local CLI and GitHub |
| `npm test` | CI/CD | Runs unit tests checking HTTP 200 & response payloads |
| `docker login -u <username>` | CI/CD & Unit II | Authenticates Docker CLI with Docker Hub |
| `docker push <user>/<image>:<tag>` | CI/CD & Unit II | Publishes container image to Docker Hub registry |
| `docker pull <user>/<image>:<tag>` | CI/CD & Unit II | Fetches verified production image from Docker Hub |
| `docker system prune` | Unit IV | Removes unused Docker containers, networks, and build cache |
