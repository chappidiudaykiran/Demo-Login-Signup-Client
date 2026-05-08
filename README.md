# GuidEx — Client (Frontend)

A modern, premium authentication UI built with **React 18**, **Vite**, and **Tailwind CSS**, featuring an Aurora Split-Screen design with glassmorphism effects, animated transitions, and JWT-based session management.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React 18** | Component-based UI library |
| **Vite 5** | Lightning-fast dev server & build tool |
| **React Router DOM 6** | Client-side routing & navigation |
| **Tailwind CSS 3** | Utility-first CSS framework for styling |
| **Axios** | HTTP client for API communication |
| **React Hot Toast** | Toast notification system |
| **React Icons (Feather)** | Icon library (FiMail, FiLock, FiEye, FiUser) |

---

## 📁 Project Structure

```
client/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx       # Auth state management (login, signup, logout)
│   ├── components/
│   │   └── PageTransition.jsx    # Animated page transitions
│   ├── pages/
│   │   ├── Login.jsx             # Login page UI
│   │   ├── Signup.jsx            # Signup page UI
│   │   └── Dashboard.jsx         # Protected dashboard page
│   ├── App.jsx                   # Route definitions & route guards
│   ├── main.jsx                  # App entry point with AuthProvider & Toaster
│   └── index.css                 # Global styles & Tailwind imports
├── vercel.json                   # SPA rewrite rules for Vercel
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── .gitignore
└── package.json
```

---

## 🔐 How Login & Signup Works

### Signup Flow

```
User fills form → Client validates → POST /api/auth/signup →
Server validates & hashes password → Saves to MongoDB →
Returns JWT token → Stored in localStorage → Redirect to /dashboard
```

**Step-by-step:**

1. User enters **Name**, **Email**, and **Password** on the Signup page.
2. **Client-side validation** checks all fields before sending the request.
3. A **password strength meter** provides real-time visual feedback (4 bars, color-coded).
4. `AuthContext.signup()` sends a `POST` request to the server API.
5. On success, the JWT token is saved to `localStorage` and user state is updated.
6. A **toast notification** confirms account creation.
7. User is redirected to `/dashboard`.

### Login Flow

```
User fills form → Client validates → POST /api/auth/login →
Server verifies credentials → Returns JWT token →
Stored in localStorage → Redirect to /dashboard
```

**Step-by-step:**

1. User enters **Email** and **Password** on the Login page.
2. **Client-side validation** checks email format and password presence.
3. `AuthContext.login()` sends a `POST` request to the server API.
4. On success, token is stored in `localStorage` and user state is updated.
5. **Toast notification** shown, user redirected to `/dashboard`.

### Auto-Login (Session Persistence)

On every page load, `AuthContext` runs a `useEffect` hook:

1. Checks if a token exists in `localStorage`.
2. If yes, sends `GET /api/auth/me` with `Authorization: Bearer <token>` header.
3. If token is valid, user data is loaded automatically (no re-login needed).
4. If token is invalid/expired, it's cleared and user is redirected to login.

### Logout

1. Token cleared from `localStorage`.
2. User and token state reset to `null`.
3. Success toast notification displayed.

### Axios Configuration

- An Axios instance is created with `baseURL` set to `VITE_API_URL` env var (falls back to `http://localhost:5000/api` for local dev).
- A **request interceptor** automatically attaches the `Authorization: Bearer <token>` header to every outgoing request.

---

## ✅ Validation Rules

### Signup Form (`Signup.jsx`)

| Field | Rule | Error Message |
|---|---|---|
| Name | Cannot be empty | `Name is required` |
| Name | Minimum 2 characters | `Name must be at least 2 characters` |
| Email | Cannot be empty | `Email is required` |
| Email | Must match `\S+@\S+\.\S+` | `Email is invalid` |
| Password | Cannot be empty | `Password is required` |
| Password | Minimum 6 characters | `Must be at least 6 characters` |

### Login Form (`Login.jsx`)

| Field | Rule | Error Message |
|---|---|---|
| Email | Cannot be empty | `Email is required` |
| Email | Must match `\S+@\S+\.\S+` | `Email is invalid` |
| Password | Cannot be empty | `Password is required` |

- **Real-time error clearing** — when user starts typing in a field with an error, the error clears immediately.
- **Inline error display** — errors appear below each field with animated fade-in.

### Password Strength Meter (Signup Only)

Real-time 4-bar visual indicator calculated from these criteria:

| Criteria | Points |
|---|---|
| Length > 5 characters | +1 |
| Length > 8 characters | +1 |
| Contains uppercase letter (A-Z) | +1 |
| Contains a number (0-9) | +1 |
| Contains a special character | +1 |

| Score | Label | Color |
|---|---|---|
| 0 | — | Grey bars |
| 1 | Weak | 🔴 Red |
| 2 | Fair | 🟠 Orange |
| 3 | Good | 🟡 Yellow |
| 4 | Strong / Very Strong | 🟢 Green |

---

## 🛡️ Route Protection

| Wrapper | Behavior |
|---|---|
| `ProtectedRoute` | If no token → redirects to `/login`. Shows loading spinner while checking auth. |
| `PublicRoute` | If token exists → redirects to `/dashboard`. Prevents logged-in users from seeing auth pages. |

**Route Map:**

| Path | Component | Guard |
|---|---|---|
| `/` | Redirect → `/login` | None |
| `/login` | `Login.jsx` | `PublicRoute` |
| `/signup` | `Signup.jsx` | `PublicRoute` |
| `/dashboard` | `Dashboard.jsx` | `ProtectedRoute` |
| `*` (404) | Redirect → `/login` | None |

---

## 🎨 UI Design

The authentication pages use an **Aurora Split-Screen** design:

- **Glassmorphism** — translucent form panels with `backdrop-blur-xl` and subtle borders
- **Aurora Glow Orbs** — animated radial-gradient orbs (violet & cyan) with blur effects
- **Responsive** — aurora panel hides on mobile (`hidden lg:flex`), showing only the form
- **Password Strength Meter** — 4-bar color-coded indicator on signup page
- **Show/Hide Password** — eye icon toggle for password visibility
- **Animated Transitions** — pages animate in via `PageTransition` component
- **Toast Notifications** — `react-hot-toast` for success/error feedback

---

## ⚙️ Environment Variables

For local development, create a `.env` file in the client root (optional — defaults to `localhost:5000`):

```env
VITE_API_URL=http://localhost:5000/api
```

For production (set in Vercel dashboard):

```env
VITE_API_URL=https://your-server-app.vercel.app/api
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Server API running (see [Server Repo](https://github.com/chappidiudaykiran/Demo-Login-Signup-Server))

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev     # Starts Vite dev server on http://localhost:5173
```

### Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Vercel auto-detects Vite — set the framework to **Vite**.
4. Add environment variable in Vercel dashboard:
   - `VITE_API_URL` = `https://your-server-app.vercel.app/api`
5. Deploy — the `vercel.json` ensures SPA routing works (no 404 on page refresh).
