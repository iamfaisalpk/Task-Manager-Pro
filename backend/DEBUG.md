# Backend Setup Debug Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file** (already done in root)
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   ```

3. **Start Backend Server**
   ```bash
   npm run dev
   ```

   Expected output:
   ```
   ✅ Server running on http://localhost:5000
   ```

4. **Test Health Endpoint**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Response:
   ```json
   {"status":"Backend is running"}
   ```

## Common Issues

### Port Already in Use
```bash
# Windows: Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### CORS Errors
- Ensure backend has `CORS` enabled (already configured)
- Frontend URL must match `CLIENT_URL` in backend .env

### 404 on /api/tasks
- Backend server must be running
- Routes must be imported correctly in server.js
- Check console for any import errors

### JWT Token Errors
- Ensure JWT_SECRET is set in .env
- Token must be sent in Authorization header: `Bearer <token>`

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Tasks (All require JWT token)
- `GET /api/tasks?page=1&limit=10&search=&status=all` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Test with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

### Get Tasks
```bash
curl -X GET http://localhost:5000/api/tasks?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
