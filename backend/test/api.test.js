const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('../src/server');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      console.log(`[CI/CD Test Runner] Ephemeral test server active on ${baseUrl}`);
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('CI/CD Job 1 — Health Check API returns 200 and UP status', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.strictEqual(res.status, 200, 'Health endpoint should return HTTP 200');
  
  const data = await res.json();
  assert.strictEqual(data.status, 'UP', 'Service status must be UP');
  assert.ok(data.service.includes('Student Management System'), 'Service name must match expected text');
});

test('CI/CD Job 1 — Student Profile API returns valid JSON with 200', async () => {
  const res = await fetch(`${baseUrl}/api/student/profile`);
  assert.strictEqual(res.status, 200, 'Student profile should return HTTP 200');
  
  const data = await res.json();
  assert.ok(data.success === true || data.id || data.name, 'Student profile data must be returned');
});

test('CI/CD Job 1 — Subjects API returns list of academic subjects', async () => {
  const res = await fetch(`${baseUrl}/api/subjects`);
  assert.strictEqual(res.status, 200, 'Subjects endpoint should return HTTP 200');
  
  const data = await res.json();
  assert.ok(Array.isArray(data.data || data), 'Subjects must be returned as an array');
});

test('CI/CD Job 1 — 404 Handler properly detects invalid endpoints', async () => {
  const res = await fetch(`${baseUrl}/api/non_existent_endpoint`);
  assert.strictEqual(res.status, 404, 'Invalid routes should return 404');
  
  const data = await res.json();
  assert.strictEqual(data.success, false, 'Invalid route response should indicate failure');
});
