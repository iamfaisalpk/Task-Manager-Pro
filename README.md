Task Manager Pro

Full-Stack Mini Application — Full-Stack Developer Machine Test (Round 2)
Objective: Build a production-ready system demonstrating modern full-stack skills using ReactJS, React Native, Node.js, Express, MongoDB/SQLite, and Redux for state management.

Table of Contents :-
Overview
Features
Tech Stack
Project Structure
Installation & Setup
API Endpoints
Frontend Web
Mobile App

Overview:-
Task Manager Pro is a full-stack task management application designed to demonstrate:
Backend: Secure, scalable, and production-ready API using Node.js, Express, and MongoDB (Mongoose).
Web Frontend: ReactJS app with Tailwind CSS, Redux for global state, Axios for API calls, JWT authentication, and responsive design.
Mobile App: React Native (Expo) app with persistent authentication, smooth navigation, and task management features.
This project emphasizes professional coding standards, clean architecture, reusable components, and production-level readiness.

Features :-
Authentication: User registration and login with JWT
Protected Routes: Dashboard accessible only to authenticated users
Task Management: CRUD operations on tasks
Task Filtering: Search, filter by status, and pagination
Frontend Web: Responsive UI with Tailwind CSS and reusable components
Mobile App: FlatList task view, pull-to-refresh, create/update tasks
Notifications: Toast notifications for success/error messages
Loading State: Skeleton loaders during API calls
Error Handling: Global error boundaries
State Management: Redux for predictable state management across web and mobile

Tech Stack :-
Layer	Technology
Backend	Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Joi, Helmet, CORS
Web Frontend	ReactJS (Vite), Tailwind CSS, Axios, Redux, React Router v6
Mobile App	React Native (Expo), AsyncStorage, React Navigation, NativeWind, Redux
Dev Tools	VS Code, Git, Postman, MongoDB Compass
Version Control	Git & GitHub


Installation & Setup
Backend

Navigate to backend folder:
cd backend

Create .env from .env.example:
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

Start server:
npm run dev
Web Frontend
Navigate to web folder
cd web
Create .env from .env.example:
VITE_API_BASE_URL=http://localhost:5000/api
Start development server:
npm run dev
Mobile App
Navigate to mobile folder:
cd mobile

Start Expo:
npx expo start
API Endpoints
Auth

POST /auth/register → Register new user

POST /auth/login → Login user, return JWT

Tasks

POST /tasks → Create task (protected)

GET /tasks → Get all tasks with search, filter, pagination

GET /tasks/:id → Get single task

PUT /tasks/:id → Update task

DELETE /tasks/:id → Delete task

Frontend Web

Login / Register pages with validation

Dashboard with task CRUD

Protected routes using JWT

Search, filter, and pagination

Toast notifications & skeleton loaders

Redux for global state management

Mobile App

Login page with JWT token persistence

Task list with FlatList

Pull-to-refresh tasks

Create / Update tasks

Navigation stack

Redux state management
