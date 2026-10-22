# CBAD Mini Project — Complete Docker Commands & CI/CD Reference Guide
## Covering All 4 Units of Syllabus + Full CI/CD GitHub Actions & Docker Hub Real-World Implementation

---

## 📑 Table of Contents
1. [Unit I — Introduction to Containers](#-unit-i--introduction-to-containers)
2. [Unit II — Introduction to Docker & Compose](#-unit-ii--introduction-to-docker--compose)
3. [Unit III — Security, Networking & Storage](#-unit-iii--security-networking--storage)
4. [Unit IV — Advanced Concepts, Monitoring & Production](#-unit-iv--advanced-concepts-monitoring--production)
5. [CI/CD Pipeline with Docker & GitHub Actions (Complete Real-Life Case Study)](#-cicd-pipeline-with-docker--github-actions)
   - [Core Definitions & Concepts (What, Why, Where)](#1-core-definitions--concepts-what-why-where)
   - [Architecture & Workflow Diagram](#2-architecture--workflow-diagram)
   - [Exactly What We Performed: Real-Life Step-by-Step Timeline](#3-exactly-what-we-performed-real-life-step-by-step-timeline)
   - [The 3 Sequential Jobs In-Depth](#4-the-3-sequential-jobs-in-depth)
   - [Real Execution Logs from GitHub Actions Run #39718375714](#5-real-execution-logs-from-github-actions-run-39718375714)
   - [Testing Scenarios: Pass, Simulated Failure & Recovery](#6-testing-scenarios-pass-simulated-failure--recovery)
   - [CI/CD & GitHub CLI Master Commands](#7-cicd--github-cli-master-commands)
6. [Master Command Cheat Sheet (Units I to IV + CI/CD)](#-master-command-cheat-sheet)

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
* **COPY**: Injects all static assets into Nginx's default document root (`/usr/share/nginx/html`).
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

### 1. Core Definitions & Concepts (What, Why, Where)

#### What is CI (Continuous Integration)?
* **Definition:** A software development practice where developers merge their code changes into a central repository frequently. Each integration is verified by an automated build and automated tests.
* **Why we use it:** To catch bugs and breaking changes early before code reaches staging or production.
* **Where in our project:** Configured in `Job 1: Build & Test` inside `.github/workflows/ci-cd.yml` and executed via `npm test` (`backend/test/api.test.js`) and `test_app.py`.

#### What is CD (Continuous Delivery vs Continuous Deployment)?
* **Continuous Delivery:** Automatically packaging and publishing verified artifacts (such as Docker images pushed to Docker Hub) so they can be released at any time.
* **Continuous Deployment:** Automatically deploying those packaged containers directly into live runtime environments without manual intervention.
* **Where in our project:** Configured in `Job 2: Push Image to Docker Hub` (Delivery) and `Job 3: Deploy Updated Container` (Deployment).

#### GitHub Actions Concepts:
| Term | Definition | Exact File / Value in Our Project |
|---|---|---|
| **Workflow** | An automated configurable process made up of one or more jobs. Defined by a YAML file. | `.github/workflows/ci-cd.yml` |
| **Event / Trigger** | A specific activity that initiates a workflow. | `push: [main]`, `pull_request: [main]`, `workflow_dispatch` |
| **Runner** | A virtual machine hosted by GitHub that executes workflow jobs. | `runs-on: ubuntu-latest` |
| **Job** | A set of steps that execute on the same runner. Jobs run in parallel unless linked with `needs: [...]`. | `build-and-test`, `push-image`, `deploy-image` |
| **Step** | An individual task within a job (can run shell commands or actions). | `npm test`, `docker build`, `docker pull`, etc. |
| **Action** | Reusable standalone application step downloaded from GitHub Marketplace. | `actions/checkout@v4`, `docker/login-action@v3`, `docker/build-push-action@v5` |
| **Secret** | Encrypted sensitive variable stored securely in repository settings. | `secrets.DOCKER_USERNAME` and `secrets.DOCKER_TOKEN` |

#### Docker Hub Concepts:
| Term | Definition | Exact Value in Our Project |
|---|---|---|
| **Registry** | Central online service for storing and distributing Docker images. | Docker Hub (`hub.docker.com`) |
| **User Account** | The registered username owning the repositories. | `nikunj2006` |
| **Personal Access Token (PAT)** | A secure, revocable alphanumeric token used in place of account passwords for CLI and CI/CD tools. | Generated on Docker Hub with `Read, Write, Delete` scope |
| **Repository Name** | The specific image namespace on Docker Hub. | `nikunj2006/cbad-frontend`, `nikunj2006/cbad-backend` |
| **Image Tags** | Version labels assigned to images. | `:latest`, `:1.0`, and git commit SHA hash |

---

### 2. Architecture & Workflow Diagram

```
 ┌────────────────────────────────────────────────────────┐
 │ Local Machine: /Users/nikunjsantoshhogade/CBAD Mini... │
 └──────────────────────────┬─────────────────────────────┘
                            │ 1. git push origin main
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │ GitHub Repository: nikunjhogade10/cbad-mini-project    │
 └──────────────────────────┬─────────────────────────────┘
                            │ Webhook triggers Actions Runner
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │           GitHub Actions Runner (ubuntu-latest)        │
 │                                                        │
 │ ┌────────────────────────────────────────────────────┐ │
 │ │ JOB 1: Build & Test (27s)                          │ │
 │ │ • actions/checkout@v4                              │ │
 │ │ • Node.js v18 & dependencies setup                 │ │
 │ │ • npm test (backend/test/api.test.js)              │ │
 │ │   -> 4/4 tests pass (HTTP 200, "UP", text checks)  │ │
 │ │ • docker build local validation                    │ │
 │ └────────────────────────┬───────────────────────────┘ │
 │                          │ (needs: [build-and-test])   │
 │                          ▼                             │
 │ ┌────────────────────────────────────────────────────┐ │
 │ │ JOB 2: Push Image to Docker Hub (41s)              │ │
 │ │ • Authenticate via secrets.DOCKER_USERNAME & TOKEN │ │
 │ │ • docker/setup-buildx-action@v3                    │ │
 │ │ • docker/build-push-action@v5                      │ │
 │ │ • Tags: :latest, :1.0, :<commit-sha>               │ │
 │ └────────────────────────┬───────────────────────────┘ │
 │                          │                             │
 │                          │ Pushes Images               │
 │                          ▼                             │
 │            ┌───────────────────────────┐               │
 │            │        Docker Hub         │               │
 │            │ nikunj2006/cbad-frontend  │               │
 │            │ nikunj2006/cbad-backend   │               │
 │            └─────────────┬─────────────┘               │
 │                          │                             │
 │                          │ (needs: [push-image])       │
 │                          ▼                             │
 │ ┌────────────────────────────────────────────────────┐ │
 │ │ JOB 3: Deploy Updated Container (11s)              │ │
 │ │ • docker pull nikunj2006/cbad-frontend:latest      │ │
 │ │ • docker pull nikunj2006/cbad-backend:latest       │ │
 │ │ • docker stop & rm old containers                  │ │
 │ │ • docker run -d -p 8080:80 & 5050:5050 containers  │ │
 │ │ • docker ps verification                           │ │
 │ └────────────────────────────────────────────────────┘ │
 └────────────────────────────────────────────────────────┘
```

---

### 3. Exactly What We Performed: Real-Life Step-by-Step Timeline

Here is the exact record of commands and events executed in our project session:

#### Step 1: Pre-requisites & Local Safety (`.gitignore`)
* **Problem:** Project directory had never been initialized with Git, and `node_modules/` (~35MB) would bloat the repository if committed.
* **Action:** Created `.gitignore` at project root ignoring:
  ```gitignore
  node_modules/
  backend/node_modules/
  .DS_Store
  .env
  *.log
  __pycache__/
  ```
* **Initialized Git:**
  ```bash
  git init -b main
  git config user.name "Nikunj Hogade"
  git config user.email "nikunjhogade10@users.noreply.github.com"
  git add .
  git commit -m "feat: complete containerized student management system with CI/CD pipeline"
  ```
  *Result:* Committed 72 files cleanly on branch `main`.

#### Step 2: Creating the Public GitHub Repository
* **Action:** Used GitHub CLI (`gh`) already authenticated with account `@nikunjhogade10`:
  ```bash
  gh repo create cbad-mini-project --public --source=. --remote=origin --push
  ```
  *Result:* Successfully created **`https://github.com/nikunjhogade10/cbad-mini-project`** and pushed the repository.

#### Step 3: First Live Workflow Run & The Real-Life "Missing Secret" Demonstration
* Pushing code to `main` automatically fired workflow run `#39718375714`.
* **Execution Status:**
  ```text
  ✓ Job 1: Build & Test in 25s (ID 119625854864)
  X Job 2: Push Image to Docker Hub in 13s (ID 119625988444)
    X 3. Log into Docker Hub Registry
      X Username and password required
  - Job 3: Deploy Updated Container in 0s (ID 119626066254) [SKIPPED]
  ```
* **Why did this happen?**
  * `Job 1` passed completely because tests are self-contained.
  * `Job 2` failed at step 3 because GitHub Actions did not yet have the Docker Hub secrets (`DOCKER_USERNAME` and `DOCKER_TOKEN`).
  * `Job 3` was automatically **SKIPPED** due to `needs: [push-image]`.
  * *Significance:* This demonstrated the exact prerequisite and fail-safe mechanism taught in the lecture video!

#### Step 4: Setting Docker Hub Secrets via GitHub CLI
* User generated a Docker Hub Personal Access Token for account **`nikunj2006`**.
* Injected both secrets directly into GitHub repository settings:
  ```bash
  gh secret set DOCKER_USERNAME --body "nikunj2006"
  gh secret set DOCKER_TOKEN --body "dckr_pat_********************"
  ```
* Verified secrets:
  ```bash
  gh secret list
  # Output:
  # DOCKER_TOKEN     less than a minute ago
  # DOCKER_USERNAME  less than a minute ago
  ```

#### Step 5: Re-running the Pipeline & 100% Success
* Triggered re-run:
  ```bash
  gh run rerun 39718375714
  ```
* **Final Result:** All 3 jobs completed with green checkmarks (✅) across the board!

---

### 4. The 3 Sequential Jobs In-Depth

#### **Job 1: Build & Test (`build-and-test`)**
* **File Location:** Defined in lines 17–44 of `.github/workflows/ci-cd.yml`
* **Runner Environment:** `ubuntu-latest`
* **Step-by-Step Actions:**
  1. `actions/checkout@v4`: Clones repository onto runner.
  2. `actions/setup-node@v4`: Installs Node.js v18 with npm cache.
  3. `npm ci` (inside `./backend`): Installs clean, reproducible dependencies from `package-lock.json`.
  4. `npm test`: Runs `backend/test/api.test.js` using Node's native test runner (`node --test`).
     * Asserts `GET /api/health` returns `200` and `status === 'UP'`.
     * Asserts `service` string contains `'Student Management System'`.
     * Asserts `GET /api/student/profile` returns `200` and student object.
     * Asserts `GET /api/subjects` returns `200` and subject list array.
     * Asserts `404` handler properly handles invalid routes.
  5. `docker build`: Compiles `cbad-frontend:test` and `cbad-backend:test` locally to verify Dockerfile syntax and build integrity before publishing.
* **Fail-Safe Gate:** If any test fails, Job 1 exits with code 1 and aborts the entire workflow immediately.

#### **Job 2: Push Image to Docker Hub (`push-image`)**
* **File Location:** Defined in lines 46–86 of `.github/workflows/ci-cd.yml`
* **Condition:** `needs: [build-and-test]` (will never run if Job 1 fails).
* **Step-by-Step Actions:**
  1. `actions/checkout@v4`: Clones code.
  2. `docker/setup-buildx-action@v3`: Prepares Docker Buildx engine for advanced container compilation.
  3. `docker/login-action@v3`: Logs in to Docker Hub using secrets:
     ```yaml
     username: ${{ secrets.DOCKER_USERNAME }} # nikunj2006
     password: ${{ secrets.DOCKER_TOKEN }}    # dckr_pat_...
     ```
  4. `docker/build-push-action@v5` (Frontend):
     * Builds root `Dockerfile`.
     * Tags:
       * `nikunj2006/cbad-frontend:latest`
       * `nikunj2006/cbad-frontend:1.0`
       * `nikunj2006/cbad-frontend:${{ github.sha }}`
     * Pushes to Docker Hub registry.
  5. `docker/build-push-action@v5` (Backend):
     * Builds `backend/Dockerfile`.
     * Tags:
       * `nikunj2006/cbad-backend:latest`
       * `nikunj2006/cbad-backend:1.0`
       * `nikunj2006/cbad-backend:${{ github.sha }}`
     * Pushes to Docker Hub registry.

#### **Job 3: Deploy Updated Container (`deploy-image`)**
* **File Location:** Defined in lines 88–139 of `.github/workflows/ci-cd.yml`
* **Condition:** `needs: [push-image]` (executes only after verified image is published).
* **Step-by-Step Actions:**
  1. Pulls fresh images directly from Docker Hub:
     ```bash
     docker pull nikunj2006/cbad-frontend:latest
     docker pull nikunj2006/cbad-backend:latest
     ```
  2. Cleans up any existing containers to prevent Docker port and name collisions:
     ```bash
     docker stop cbad_frontend_live || true
     docker rm cbad_frontend_live || true
     docker stop cbad_backend_live || true
     docker rm cbad_backend_live || true
     ```
  3. Launches freshly pulled containers:
     ```bash
     docker run -d -p 8080:80 --name cbad_frontend_live nikunj2006/cbad-frontend:latest
     docker run -d -p 5050:5050 --name cbad_backend_live nikunj2006/cbad-backend:latest
     ```
  4. Verification: Executes `docker ps` to verify container uptime and port bindings.

---

### 5. Real Execution Logs from GitHub Actions Run #39718375714

Below is the verbatim terminal output from the GitHub Actions execution on our repository:

```text
✓ main CI/CD Pipeline — Docker & GitHub Actions · 39718375714
Triggered via push about 1 minute ago

JOBS
✓ Job 1: Build & Test in 27s (ID 119628348717)
  ✓ Set up job
  ✓ 1. Checkout Repository Code
  ✓ 2. Set up Node.js Environment
  ✓ 3. Install Backend Dependencies
  ✓ 4. Execute Automated Unit Tests (Verify Response Codes & Strings)
  ✓ 5. Verify Local Docker Build (Frontend & Backend)
  ✓ Post 2. Set up Node.js Environment
  ✓ Post 1. Checkout Repository Code
  ✓ Complete job

✓ Job 2: Push Image to Docker Hub in 41s (ID 119628490713)
  ✓ Set up job
  ✓ 1. Checkout Repository Code
  ✓ 2. Set up Docker Buildx
  ✓ 3. Log into Docker Hub Registry (Authenticated as nikunj2006)
  ✓ 4. Build and Push Frontend Docker Image (pushed nikunj2006/cbad-frontend)
  ✓ 5. Build and Push Backend Docker Image (pushed nikunj2006/cbad-backend)
  ✓ Post 5. Build and Push Backend Docker Image
  ✓ Post 4. Build and Push Frontend Docker Image
  ✓ Post 3. Log into Docker Hub Registry
  ✓ Post 2. Set up Docker Buildx
  ✓ Post 1. Checkout Repository Code
  ✓ Complete job

✓ Job 3: Deploy Updated Container in 11s (ID 119628693687)
  ✓ Set up job
  ✓ 1. Checkout Repository
  ✓ 2. Log into Docker Hub
  ✓ 3. Pull Latest Image from Docker Hub
  ✓ 4. Stop and Remove Previous Container (Prevent Port/Name Conflicts)
  ✓ 5. Spawn Updated Container
  ✓ 6. Deployment Health Check
  ✓ Post 2. Log into Docker Hub
  ✓ Post 1. Checkout Repository
  ✓ Complete job
```

---

### 6. Testing Scenarios: Pass, Simulated Failure & Recovery

#### Scenario A: The Normal Passing Flow (Current State)
1. Developer edits code and pushes to GitHub:
   ```bash
   git add .
   git commit -m "feat: enhance timetable UI"
   git push origin main
   ```
2. GitHub Actions runs Job 1 (`npm test` passes in 27s).
3. Job 2 pushes updated images to `nikunj2006/cbad-*` (passes in 41s).
4. Job 3 deploys updated container (passes in 11s).
5. Result: **All 3 jobs green (✅)**.

#### Scenario B: Deliberate Failure Simulation (Video Lecture Demonstration)
In the video lecture, a failure was deliberately introduced into the test script to prove that broken code cannot be deployed:

1. Open `backend/test/api.test.js`:
   ```javascript
   // Change line 27 from:
   assert.strictEqual(data.status, 'UP');
   
   // To an intentional mismatch:
   assert.strictEqual(data.status, 'random');
   ```
2. Push commit to GitHub:
   ```bash
   git commit -am "test: simulate failing test assertion"
   git push origin main
   ```
3. **What happens on GitHub Actions:**
   * **Job 1 (Build & Test):** Runs `npm test` and crashes with:
     ```text
     AssertionError [ERR_ASSERTION]: Expected values to be strictly equal:
     'UP' !== 'random'
     Process completed with exit code 1.
     ```
   * **Job 2 (Push Image):** **SKIPPED** (it never logs into Docker Hub and never pushes!).
   * **Job 3 (Deploy):** **SKIPPED** (production container remains on previous stable version).
4. **Key Concept:** CI acts as an automated security barrier. Broken code is halted before it can ever contaminate Docker Hub or the production server.

#### Scenario C: Pipeline Recovery
1. Revert the assertion back to `'UP'`:
   ```javascript
   assert.strictEqual(data.status, 'UP');
   ```
2. Push the fix:
   ```bash
   git commit -am "fix: restore expected UP status assertion"
   git push origin main
   ```
3. GitHub Actions triggers a fresh run:
   * Job 1 passes → Job 2 publishes new image → Job 3 deploys.
   * Full green status restored.

---

### 7. CI/CD & GitHub CLI Master Commands

```bash
# ── Local Test Execution ─────────────────────────────────────
cd backend && npm test               # Run native Node.js unit tests
cd .. && python3 test_app.py         # Run Python unittest / pytest suite

# ── GitHub CLI (gh) Management Commands ──────────────────────
gh auth status                       # Check GitHub login account and token scopes
gh repo view nikunjhogade10/cbad-mini-project  # View repository info
gh workflow list                     # List all active workflows in repository
gh run list --limit 5                # Show last 5 CI/CD pipeline runs
gh run view <run-id>                 # View specific run summary and job states
gh run view --job=<job-id>           # View detailed step-by-step log of a job
gh run rerun <run-id>                # Re-trigger a previous workflow run
gh secret list                       # List all encrypted repository secrets
gh secret set DOCKER_USERNAME        # Update Docker Hub username secret
gh secret set DOCKER_TOKEN           # Update Docker Hub personal access token secret

# ── Docker Hub Manual Commands ───────────────────────────────
docker login -u nikunj2006           # Manual login using personal access token
docker pull nikunj2006/cbad-frontend:latest # Pull published frontend image
docker pull nikunj2006/cbad-backend:latest  # Pull published backend image
```

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
| `npm test` | CI/CD | Runs unit tests checking HTTP 200 & response payloads |
| `python3 test_app.py` | CI/CD | Standalone test script checking endpoint text & status |
| `gh secret set DOCKER_USERNAME` | CI/CD | Sets encrypted Docker Hub username in GitHub Actions |
| `gh secret set DOCKER_TOKEN` | CI/CD | Sets encrypted Docker Hub Personal Access Token in GitHub Actions |
| `gh run list` | CI/CD | Displays status of recent GitHub Actions pipeline runs |
| `gh run view <id>` | CI/CD | Inspects jobs and step execution for a pipeline run |
| `gh run rerun <id>` | CI/CD | Re-executes workflow run with newly updated secrets or code |
| `docker push nikunj2006/<image>:<tag>` | CI/CD & Unit II | Publishes container image to Docker Hub registry |
| `docker pull nikunj2006/<image>:<tag>` | CI/CD & Unit II | Fetches verified production image from Docker Hub |
| `docker system prune` | Unit IV | Removes unused Docker containers, networks, and build cache |
