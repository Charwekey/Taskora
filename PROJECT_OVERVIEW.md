# Task Manager Application - Project Overview

## Introduction
The **Task Manager** is a full-stack web application designed to help users organize their tasks efficiently. It features a robust **Django REST Framework** backend and a modern, responsive **React (Vite)** frontend. The application supports user authentication, real-time task management (CRUD), and advanced features like Dark Mode and Google Sign-In.

## Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v3/v4 (Class-based Dark Mode)
- **State Management**: Context API (AuthContext, ThemeContext)
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios (Connected to Django API)
- **Authentication**: Firebase Auth (Email/Password + Google)

### Backend
- **Framework**: Django 5.x / Django REST Framework (DRF)
- **Database**: SQLite (Default)
- **Authentication**: Django Token Authentication (synchronized with Firebase)
- **CORS**: Configured to allow frontend requests

## Key Features

1.  **Dual Authentication System**:
    - Users sign in via **Firebase** (Frontend).
    - A corresponding user is automatically created/synced in the **Django Backend**.
    - API requests use Django Tokens; Dashboard access is guarded by Firebase Auth state.

2.  **Task Management**:
    - **Create**: Add tasks with Title, Description, Due Date, Priority, and Status.
    - **Read**: View tasks in a responsive list/grid.
    - **Update**: Edit task details or toggle status (Pending/Completed).
    - **Delete**: Remove tasks permanently.
    - **Filter**: Filter tasks by status (All/Pending/Completed).

3.  **Modern UI/UX**:
    - **Dark/Light Mode**: User preference persisted in LocalStorage.
    - **Responsive Design**: Mobile-friendly layout using Tailwind CSS.
    - **Interactive Feedback**: Loading states, error messages, and hover effects.

4.  **Google Sign-In**:
    - Integrated via Firebase.
    - Seamlessly syncs Google users with the Django backend using a secure dummy password strategy (since backend modification was restricted).

## Project Structure

```
task_manager/
├── frontend/               # React Application
│   ├── src/
│   │   ├── components/     # Reusable UI (TaskModal.jsx)
│   │   ├── contexts/       # Global State (AuthContext, ThemeContext)
│   │   ├── api.js          # Axios Configuration
│   │   ├── App.jsx         # Main Router
│   │   └── ...             # Pages (Dashboard, Login, Register, Profile)
│   └── ...
├── task_manager/           # Django Project Config
├── tasks/                  # Task App (Models, Views, Serializers)
├── users/                  # User App (Auth Views)
└── manage.py               # Django Entry Point
```

## Setup & Running

1.  **Backend**:
    ```bash
    # From root
    python manage.py runserver
    ```

2.  **Frontend**:
    ```bash
    # From frontend/
    npm run dev
    ```

## Development Notes
- **Constraint**: The backend code was treated as immutable during the recent feature expansion. All sync logic resides in the Frontend (`AuthContext.jsx`).
- **Profile Updates**: Changing the Display Name/Photo only updates the Firebase Profile.

---
*Created by Antigravity Agent*
