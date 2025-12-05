# Task Manager Pro - Frontend

A production-ready React + Redux Toolkit frontend for managing tasks with JWT authentication.

## Features

- 🔐 JWT Authentication (Login/Register)
- 📋 Full CRUD operations for tasks
- 🔍 Search, filter, and pagination
- 📱 Responsive design with Tailwind CSS
- ⚡ Redux Toolkit state management
- 🎯 Protected routes
- 🧪 Error boundaries and validation
- 🔔 Toast notifications
- 💾 Local storage persistence

## Tech Stack

- React 18
- Vite
- Redux Toolkit
- React Router v6
- Tailwind CSS
- Axios
- PostCSS

## Prerequisites

- Node.js 16+
- npm or yarn
- Backend API running (see Backend Setup)

## Setup Instructions

### 1. Clone & Install

```bash
cd web
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Update `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Backend Integration

The frontend connects to a backend API with the following endpoints:

### Auth Endpoints
- `POST /auth/login` - Login user
- `POST /auth/register` - Register new user

### Task Endpoints
- `GET /tasks` - Fetch tasks (with pagination, search, filter)
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

All requests include JWT token in Authorization header: `Bearer <token>`

## Folder Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components (Login, Register, Dashboard)
├── redux/            # Redux slices and store
├── services/         # API service calls
├── hooks/            # Custom hooks
├── utils/            # Utilities and constants
├── routes/           # Router configuration
├── App.jsx
└── main.jsx
```

## Key Components

- **ProtectedRoute**: Wraps routes requiring authentication
- **TaskCard**: Displays individual task
- **Modal**: Generic modal for forms
- **Toast**: Notification system
- **Pagination**: Task list pagination
- **Skeleton**: Loading skeleton

## Redux Store Structure

```
auth/
├── user
├── token
├── loading
└── error

tasks/
├── tasks
├── loading
├── error
├── pagination
├── search
└── filter
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token and user data
3. Token stored in localStorage and Redux state
4. Axios interceptor adds token to all requests
5. If token expires (401), user redirected to login

## Error Handling

- Global error boundary for React errors
- Axios interceptor for API errors
- Toast notifications for user feedback
- Form validation on client side

## Performance

- Lazy loading components
- Pagination for large task lists
- Skeleton loaders for better UX
- Minimal re-renders with Redux

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

For issues or questions, contact the development team.
