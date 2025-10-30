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
10. [License](#license)   
11. [Contact](#contact)  

---

## About the Project  
Swasthya Setu IHWP is designed to provide a one-stop digital solution for health-care management. Users can sign up, login, access features via the frontend; admins can manage data via an admin panel. The backend connects both and uses MongoDB for data persistence.  
It was developed in the context of a Indian Health Wellness And Psychology(IHWP) Project for Academics.

---

## Key Features
- Ayurvedic Dosha Assessment with personalized recommendations
- Integrated Wellness Tracking (tasks + health metrics)
- Automated Report Generation with AI insights
- Admin Dashboard with analytics & user management
- PDF Export for assessment results
- Secure Authentication with JWT tokens
- Real-time Data Sync across all modules 

1. User App (React Frontend)
- Authentication: Login/Signup with JWT
- Dosha Assessment: 12-question Ayurvedic quiz with personalized results & PDF reports
- Todo Manager: Task management with health categories (water, exercise, food, meditation, sleep)
= Health Tracking: Daily metrics (water intake, exercise, sleep, mood, notes)
- Reports: Auto-generated wellness insights (daily/weekly/monthly)
- Profile: User dashboard with assessment history

2. Admin Panel (React Dashboard)
- Analytics: User stats, assessment metrics, dosha distribution charts
- User Management: Complete user profiles, assessment history, health data
- System Monitoring: All todos, reports, and wellness trends
- Data Visualization: Charts for dosha distribution and daily assessments

3. Backend API (Node.js/Express)
- Auth API: User registration, login with bcrypt & JWT
- Assessment API: Save/retrieve dosha quiz results
- Todo API: CRUD operations for tasks with categories/priorities
- Health API: Track daily wellness metrics
- Report API: Generate automated wellness reports
- Admin API: System statistics and user management
---

## Architecture & Tech Stack  
**Frontend:**  
- React (with routers, components, hooks)  
- CSS any UI library (Material UI)  

**Backend:**  
- Node.js + Express for RESTful APIs  
- Authentication via JWT  
- bcrypt (or equivalent) for password hashing  

**Database:**  
- MongoDB (NoSQL)  

**Dev Tools:**  
- npm / yarn 
- Postman (for testing APIs)  
- Git & GitHub for version control  

---


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
2. Navigate into each module (frontend, backend, admin) and install dependencies ( open each module in different Terminal):
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
 ```bash 
cd swasthyasetu-backend  
node server.js   # or npm start  
```

Frontend:
 ```bash 
cd swasthyasetu  
npm start  
```

Admin Module:
 ```bash 
cd swasthyasetu-admin  
npm start  
```


### Project Structure
/swasthyasetu-backend
   /controllers
   /models
   /routes
   createAdmin.js
   test-server.js
   server.js
/swasthyasetu
   /src
      /components
      /Auth
      /services
      App.js
/swasthyasetu-admin
   /src
      /components
      /services
      App.js

- Each module has its own package.json and dependency setup.

### Usage
### User Flow (Frontend)
1. Authentication Flow
   Landing Page → Sign Up/Login → JWT Token → Dashboard Access
2. Main User Journey
   Home Page
    ↓
Login/Register
    ↓
User Dashboard
    ├── Dosha Assessment
    │   ├── 12 Questions Quiz
    │   ├── Results & Recommendations
    │   └── PDF Download
    │
    ├── Todo Manager
    │   ├── Create Tasks (Categories: Water, Exercise, Food, Meditation, Sleep)
    │   ├── Set Priority (Low/Medium/High)
    │   ├── Mark Complete/Incomplete
    │   └── Filter & Manage Tasks
    │
    ├── Health Tracking
    │   ├── Water Intake Counter
    │   ├── Exercise Minutes
    │   ├── Sleep Hours
    │   ├── Mood Selection
    │   └── Daily Notes
    │
    ├── Reports
    │   ├── Generate Reports (Daily/Weekly/Monthly)
    │   ├── View Wellness Insights
    │   ├── Progress Analytics
    │   └── Delete Reports
    │
    └── Profile
        ├── Personal Info
        ├── Assessment History
        └── Progress Overview
3. Detailed User Actions
- Assessment: Take quiz → Get dosha results → Download PDF → View recommendations
- Tasks: Add todo → Set category/priority → Track completion → Filter by status
- Health: Log daily metrics → Track progress → View trends
- Reports: Generate insights → Review suggestions → Monitor wellness journey


### Admin Flow
1. Admin Authentication
   Admin Login Page → Admin Credentials → Admin Dashboard
2. Admin Dashboard Navigation
   Admin Dashboard
    ├── Statistics
    │   ├── Total Users Count
    │   ├── Total Assessments
    │   ├── Recent Activity (7 days)
    │   ├── Dosha Distribution Chart
    │   └── Daily Assessment Trends
    │
    ├── Users Management
    │   ├── View All Users List
    │   ├── Select User → Detailed Profile
    │   ├── Assessment History per User
    │   ├── Todo Activity per User
    │   ├── Health Data per User
    │   └── Reports per User
    │
    ├── Assessments Overview
    │   ├── All Assessment Results
    │   ├── Dosha Distribution Analysis
    │   ├── Assessment Completion Rates
    │   └── Detailed Assessment View
    │
    ├── Todo Management
    │   ├── System-wide Todo Overview
    │   ├── User Task Analytics
    │   ├── Category-wise Distribution
    │   └── Completion Statistics
    │
    └── Reports Analytics
        ├── All Generated Reports
        ├── User Report Patterns
        ├── Wellness Trends Analysis
        └── System Health Insights
3. Admin Capabilities
- Monitor: Track all user activities and system health
- Analyze: View charts, statistics, and wellness trends
  Manage: Oversee user data and system performance
- Insights: Generate system-wide analytics and reports

### Data Flow Architecture
1. User Data Flow:
- User Action → Frontend (React) → API Call → Backend (Express) → Database (MongoDB) → Response → UI Update
2. Admin Data Flow:
- Admin Query → Admin Panel → Admin API → Database Aggregation → Charts/Analytics → Dashboard Display

### Security Flow
- User: JWT token validation for protected routes
- Admin: Separate admin token for dashboard access
- API: Token verification middleware on all protected endpoints
- Data: Encrypted passwords with bcrypt, CORS protection

### Navigation Structure 
User App Routes
* / - Home Page
* /login - User Login
* /signup - User Registration
* /profile - User Dashboard
* /dosha-assessment - Ayurvedic Quiz
/todo-manager - Task & Health Management
/features - App Features
/resources - Wellness Resources
/about - About Page

Admin Panel Routes
/ - Admin Login
/dashboard - Admin Dashboard with tabs:
   + Statistics
   + Users
   + Assessments
   + Todos
   + Reports

### Database & API Endpoints
## Database

Collections example: users, admins, events (or whichever modules you’ve built).

## API Endpoints

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
