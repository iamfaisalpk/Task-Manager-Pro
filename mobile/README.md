# Task Manager Pro (Mobile)

A production-ready, scalable React Native (Expo) mobile app for managing tasks, integrated with your backend.

---

## Features

- Secure authentication (JWT)
- Task CRUD (create, read, update, delete)
- Pagination, search, filters
- Redux Toolkit for state management
- Axios with token interceptor
- AsyncStorage for token persistence
- React Navigation (native-stack)
- NativeWind (Tailwind-style) styling
- Toast notifications, skeleton loaders
- Modular, clean codebase

---

## Setup & Installation

1. **Clone the repo:**
   ```
   git clone <your-repo-url>
   cd mobile
   ```

2. **Install dependencies:**
   ```
   npm install
   # or
   yarn
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your backend API URL:
     ```
     cp .env.example .env
     ```
   - Edit `.env`:
     ```
     API_BASE_URL=http://10.0.2.2:5000/api
     ```
     - Use `10.0.2.2` for Android emulator, or your machine IP for physical device.

4. **Run the app:**
   ```
   npm start
   # or
   yarn start
   ```
   - Scan the QR code with Expo Go.

---

## API Integration

- The app expects the backend running at `API_BASE_URL` (see `.env`).
- Endpoints:
  - `POST /auth/login`
  - `POST /auth/register`
  - `GET /tasks`
  - `GET /tasks/:id`
  - `POST /tasks`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`

---

## Sample Flows

- **Register:** Create a new account, then login.
- **Login:** Enter email/password, access your tasks.
- **Create Task:** Tap "+" to add a new task.
- **Edit/Delete:** Tap a task, then edit or delete.
- **Pull-to-refresh:** Drag down on task list.
- **Pagination:** Scroll to load more tasks.

---

## Troubleshooting

- **Cannot connect to backend:** Ensure your backend is running and accessible from your device/emulator.
- **Token issues:** If login fails, try clearing app data or reinstalling.
- **Styling issues:** Ensure NativeWind is installed and configured.

---

## Environment Variables

See `.env.example` for required variables.

---

## Production Notes

See `notes.md` for production considerations (push notifications, analytics, CI/CD, etc).

---

## License

MIT
