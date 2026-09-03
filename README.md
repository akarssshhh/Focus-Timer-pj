# Focus Timer / Study Tracker

A React-based Focus Timer and Study Tracker application that allows users to run focus sessions, record completed sessions, and view session statistics.

The project was developed progressively through three milestones (M1 → M2 → M3), introducing React fundamentals, backend persistence, and advanced React concepts.

---

## Features

### M1 — Basic Focus Timer

- 25-minute focus timer
- Start / Pause functionality
- Reset timer
- Session label
- Session category
- `MM:SS` time formatting
- Automatic input focus
- Timer interval management using `useEffect` and `useRef`

### M2 — Backend Persistence

- Fetch previously completed sessions from the backend
- Save completed sessions using a POST request
- Loading state while fetching sessions
- Error handling for API requests
- Saving state while a session is being saved
- Save error handling
- Automatically scroll to the newest session
- Session history with:
  - Label
  - Category
  - Duration
  - Completion date/time

### M3 — Live Stats + Custom Hook

- Total focus time
- Number of completed sessions
- Average session length
- Search sessions by label
- Filter sessions by category
- Memoized statistics using `useMemo`
- Memoized filtered sessions using `useMemo`
- Reusable custom `useTimer` hook
- Start / Pause / Reset timer logic extracted from `App.jsx`

### Database Watcher

- Watches `db.json` for changes
- Automatically creates a Git commit when `db.json` changes
- Automatically pushes the commit to the configured Git remote
- Useful for keeping session data synchronized with the Git repository
- Runs using the PowerShell script `watch-db.ps1`

---

## Technologies Used

- React
- JavaScript
- JSX
- REST API
- `fetch()`
- `useState`
- `useEffect`
- `useRef`
- `useMemo`
- Custom React Hook
- Tailwind CSS
- JSON Server
- PowerShell
- Git / GitHub

---

## Project Structure

The project contains the React frontend, backend database, and database watcher.

```text
Focus-Timer-pj/
│
├── focus-timer/              # React frontend
│   │
│   ├── src/
│   │   ├── App.jsx
│   │   ├── useTimer.js
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
├── db.json                   # JSON Server database
├── watch-db.ps1              # Database watcher script
├── package.json
├── package-lock.json
├── README.md
└── ...
