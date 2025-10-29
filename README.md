# Swasthya Setu IHWP  
A comprehensive healthcare platform built with MERN stack (React frontend, Node.js/Express backend, MongoDB) plus an admin panel — aimed at delivering seamless signup/login, user interactions, and admin management.

---

## Table of Contents  
1. [About the Project](#about-the-project)  
2. [Features](#features)  
3. [Architecture & Tech Stack](#architecture--tech-stack)  
4. [Getting Started](#getting-started)  
   - Prerequisites  
   - Installation  
   - Running Locally  
5. [Project Structure](#project-structure)  
6. [Usage](#usage)  
   - User Flow  
   - Admin Flow  
7. [Configuration & Environment Variables](#configuration--environment-variables)  
8. [Database & API Endpoints](#database--api-endpoints)  
9. [Testing](#testing)  
10. [Deployment](#deployment)  
11. [Contributing](#contributing)  
12. [License](#license)  
13. [Contact](#contact)  

---

## About the Project  
Swasthya Setu IHWP is designed to provide a one-stop digital solution for health-care management. Users can sign up, login, access features via the frontend; admins can manage data via an admin panel. The backend connects both and uses MongoDB for data persistence.  
It was developed in the context of a hackathon to build a robust “event safety / healthcare” system, though it can be extended for broader healthcare workflows.

---

## Features  
- User registration & authentication (JWT-based)  
- Frontend dashboard for users (React)  
- Admin panel for managing users/data (React or separate admin module)  
- Backend APIs (Node.js + Express)  
- MongoDB database for storage  
- Responsive UI and secure handling of credentials  
- Role-based access (User vs Admin)  
- Expandable to integrate further modules (appointments, alerts, analytics)  

---

## Architecture & Tech Stack  
**Frontend:**  
- React (with routers, components, hooks)  
- CSS / Styled-Components / any UI library (depending on your setup)  

**Backend:**  
- Node.js + Express for RESTful APIs  
- Authentication via JWT  
- bcrypt (or equivalent) for password hashing  

**Database:**  
- MongoDB (NoSQL)  

**Dev Tools:**  
- npm / yarn  
- dotenv (for environment variables)  
- Postman (for testing APIs)  
- Git & GitHub for version control  

---
## 🧱 Architecture Diagram  

```mermaid
graph TD
    A[User Interface (React Frontend)] -->|HTTP Requests| B[Express Backend (Node.js)]
    C[Admin Panel (React)] -->|API Calls| B
    B -->|CRUD Operations| D[(MongoDB Database)]
    B -->|Auth Tokens| A
    B -->|Admin Data| C
```
## Getting Started  

### Prerequisites  
- Node.js & npm installed  
- MongoDB instance (local or cloud e.g. MongoDB Atlas)  
- Git (to clone the repo)  

### Installation  
1. Clone the repo:  
   ```bash  
   git clone https://github.com/bendalejatin/Swasthya-Setu-IHWP.git
   ```
2. Navigate into each module (frontend, backend, admin) and install dependencies:
 ```bash 
cd swasthyasetu-backend  
npm install  
cd ../swasthyasetu  
npm install  
cd ../swasthyasetu-admin  
npm install
```

### Running Locally

Backend:

cd swasthyasetu-backend  
npm run dev   # or npm start  


Frontend:

cd swasthyasetu  
npm start  


Admin Module:

cd swasthyasetu-admin  
npm start  


Ensure environment variables (see next section) are configured before you run.

### Project Structure
/swasthyasetu-backend
   /controllers
   /models
   /routes
   server.js
/swasthyasetu
   /src
      /components
      /pages
      /services
      App.js
/swasthyasetu-admin
   /src
      /components
      /pages
      /services
      App.js


Each module has its own package.json and dependency setup.

### Usage
### User Flow (Frontend)

User registers → receives token → logs in

Access dashboard, perform allowed actions (e.g., update profile, view data)

Logout

### Admin Flow

Admin logs in via admin module

Views user data, manages content or users

Performs admin-only operations

### Configuration & Environment Variables

Create a .env file in the backend module (and optionally admin if required) with variables like:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  


For frontend / admin you might have environment variables such as REACT_APP_API_URL=http://localhost:5000 etc.

Database & API Endpoints
Database

Collections example: users, admins, events (or whichever modules you’ve built).

### API Endpoints (Example)

POST /api/auth/register — user signup

POST /api/auth/login — user login

GET /api/users/profile — get user profile (protected)

GET /api/admin/users — get all users (admin only)

PUT /api/users/:id — update user (protected)

(You should list all endpoints you’ve implemented here with method, path, and short description.)

### Testing

You can use Postman or similar tools to test APIs.
Run frontend and admin locally and verify flows manually (login, signup, access control).
Optionally add automated tests (Jest/Mocha) for backend routes and React components.





### License

This project is distributed under the MIT License. See LICENSE
 for details.

### Contact

Author: Jatin Bendale
GitHub: @bendalejatin
