# Task Manager Frontend

## Setup Instructions

### 1. Dependencies
The necessary dependencies have been installed (Firebase, Axios, Tailwind CSS, etc.).
If you need to reinstall, run:
```bash
cd frontend
npm install
```

### 2. Firebase Configuration
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. specificy **Authentication** in the left sidebar and click **Get Started**.
4. Enable **Email/Password** provider.
5. Go to **Project Settings** (gear icon) -> **General**.
6. Scroll down to **Your apps**, click the Web icon (`</>`) to create a web app.
7. Copy the configuration values (apiKey, authDomain, etc.).
8. Create a file named `.env` in the `frontend` folder (copy from `.env.example`).
9. Paste your values into `.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=task-manager-xyz.firebaseapp.com
   ...
   ```

### 3. Backend Connection
The frontend is configured to communicate with the backend at `http://127.0.0.1:8000/api/`.

**Important Requirements for Backend:**
- **CORS**: The Django backend must have `django-cors-headers` installed and allowed headers for `http://localhost:5173` (or your frontend port).
- **Authentication**: The frontend sends the Firebase ID Token in the `Authorization` header as `Bearer <token>`. 
  - If your backend does not validate this token, it might fail if endpoints are protected.
  - If your backend is "Open", it will work fine.
- **Run the Backend**:
  ```bash
  cd task_manager
  python manage.py runserver
  ```

### 4. Running the Frontend
Start the development server:
```bash
cd frontend
npm run dev
```
Open the link provided (usually `http://localhost:5173`).

## Features
- **Authentication**: Sign Up and Login with Firebase.
- **Dashboard**: View, Filter (Pending/Completed), and Delete tasks.
- **Task Management**: Create new tasks and Edit existing ones (Title, Description, Priority, Due Date).
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
