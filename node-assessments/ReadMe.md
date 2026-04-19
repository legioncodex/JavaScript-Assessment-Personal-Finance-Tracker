# Node.js & Express Assessment Series

This repository contains four assessments covering the fundamentals of backend development, ranging from basic server setup to secure authentication.

## 🚀 Getting Started

### Prerequisites
- Node.js installed (v18 or higher recommended)
- Postman or VS Code (Thunder Client) for testing

### Installation
1. Clone the repository:
   ```bash
   git clone <your-github-link>


### Assessment Breakdown
- Assessment 3: Task Management API
A RESTful API for managing tasks with in-memory storage.

Features: Create, Read, Update, Delete (CRUD) tasks.

Search: Query parameter support (/tasks?search=keyword).

Run: node server.js

- Assessment 4: Authentication Service
A secure identity provider using modern security standards.

Security: Password hashing with Bcrypt.

Auth: Stateless authentication via JWT (JSON Web Tokens).

Advanced: Includes Refresh Token logic and Role-Based Access Control (RBAC).

Protected Routes: /profile and /admin.

Run: node auth.js

### Testing with Postman
Login: Send a POST to /auth/login to receive an accessToken.

Authorize: Copy the token and paste it into the Authorization tab as a Bearer Token.

Access: Visit /profile to see authorized user data.