# Focus Timer & Study Tracker

A React-based Focus Timer and Study Tracker built to practice and demonstrate the core React Hooks:

- `useState`
- `useEffect`
- `useRef`
- `useMemo`
- Custom Hooks

The application provides a countdown focus timer, saves completed study sessions through a REST API, displays live statistics, and allows users to search and filter their session history.

---

## Live Project

### Frontend

https://unique-croquembouche-7ed6fc.netlify.app

### Backend API

https://focus-timer-pj.onrender.com

### Sessions API

https://focus-timer-pj.onrender.com/sessions

---

## Features

### Timer

- Countdown timer
- Start timer
- Pause timer
- Reset timer
- Automatically stops at `00:00`
- Displays `Session complete!` when the timer finishes
- Automatically saves the completed session

### Session Details

Each completed session stores:

- Session label
- Duration
- Category
- Completion date and time

Available categories:

- Study
- Work
- Reading
- Other

### Session History

- Loads previous sessions from the REST API
- Displays completed sessions
- Automatically scrolls to the newest session
- Shows loading state while fetching data
- Handles API errors
- Shows saving state while a session is being saved

### Search & Filter

- Search sessions by label
- Filter sessions by category
- Combined search and category filtering

### Statistics

The application calculates:

- Total focus time
- Number of completed sessions
- Average session duration

Statistics are calculated using `useMemo`.

---

## React Hooks Used

This project was specifically built to understand when and why different React Hooks should be used.

### useState

Used for reactive application data such as:

- Timer seconds
- Timer running state
- Session label
- Category
- Sessions
- Loading state
- Error state
- Search value
- Category filter

---

### useEffect

Used for side effects such as:

- Running the countdown interval
- Cleaning up the timer
- Loading sessions from the API
- Saving completed sessions
- Auto-focusing the label input
- Auto-scrolling the session list

---

### useRef

Used for values and DOM elements that should persist without causing a re-render.

Two important examples in this project:

1. Storing the `setInterval` ID
2. Accessing DOM elements for:
   - Auto-focus
   - Auto-scroll

---

### useMemo

Used for derived/calculated data.

The project uses it for:

- Total focus time
- Average session duration
- Session count
- Filtered session list

This prevents unnecessary recalculation when unrelated state changes.

---

### Custom Hook

The timer logic was extracted into:

```text
src/useTimer.js
