# PrimeTrade AI - Frontend

A modern React.js application built with Vite, featuring authentication and task management.

## Tech Stack

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **React Router 6** - Client-side routing
- **React Context API** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Quick Start

```bash
# Install dependencies
npm install

# Create .env.local file
echo "VITE_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Available Scripts

### `npm run dev`
Starts the development server with hot module replacement (HMR).

### `npm run build`
Creates an optimized production build in the `dist/` folder.

### `npm run preview`
Preview the production build locally.

### `npm run lint`
Run ESLint to check for code issues.

## Project Structure

```
src/
├── pages/              # Page components
│   ├── HomePage.jsx           # Landing/redirect page
│   ├── LoginPage.jsx          # User login
│   ├── SignupPage.jsx         # User registration
│   ├── DashboardPage.jsx      # Main dashboard
│   ├── NewTaskPage.jsx        # Create new task
│   └── TaskDetailPage.jsx     # View/edit task
│
├── layouts/            # Layout wrappers
│   └── DashboardLayout.jsx    # Protected dashboard layout
│
├── components/         # Reusable UI components
│   ├── Alert.jsx              # Alert/notification component
│   ├── Button.jsx             # Button component
│   ├── Card.jsx               # Card container
│   ├── EmptyState.jsx         # Empty state placeholder
│   ├── Header.jsx             # App header with user info
│   ├── Input.jsx              # Form input field
│   ├── Loading.jsx            # Loading spinner
│   ├── TaskSearch.jsx         # Task search component
│   └── TextArea.jsx           # Textarea input
│
├── services/           # API layer
│   ├── apiClient.js           # Axios instance with interceptors
│   └── apiService.js          # API methods (auth, tasks)
│
├── contexts/           # React Context providers
│   ├── AuthContext.jsx        # Authentication state
│   └── TaskContext.jsx        # Task management state
│
├── hooks/              # Custom React hooks
│   ├── useFormValidation.js   # Form validation logic
│   └── useProtectedRoute.js   # Route protection (unused in Vite version)
│
├── utils/              # Helper functions
│   └── helpers.js             # Utility functions
│
├── App.jsx             # Main app with routing
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Key Features

### 1. Authentication
- JWT-based authentication
- Token stored in localStorage
- Automatic token refresh on page load
- Auto-logout on 401 responses

### 2. Protected Routes
- Dashboard routes require authentication
- Automatic redirect to login if not authenticated
- User profile loaded on dashboard mount

### 3. State Management (React Context API)

**Auth Context** (`src/contexts/AuthContext.jsx`):
```javascript
import { useAuth } from '../contexts/AuthContext';

// In component
const { user, setUser, logout } = useAuth();
```

**Task Context** (`src/contexts/TaskContext.jsx`):
```javascript
import { useTask } from '../contexts/TaskContext';

// In component
const { tasks, addTask, updateTask, deleteTask } = useTask();
```

### 4. API Client

All API requests go through `src/services/apiClient.js`:
- Automatically adds JWT token to headers
- Handles 401 errors (triggers logout)
- Consistent error handling

### 5. Routing (React Router v6)

Routes defined in `src/App.jsx`:
```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardPage />} />
    <Route path="tasks/new" element={<NewTaskPage />} />
    <Route path="tasks/:id" element={<TaskDetailPage />} />
  </Route>
</Routes>
```

### 6. Form Validation

Custom hook for form validation:
```javascript
import { useFormValidation } from '../hooks/useFormValidation';

const form = useFormValidation({
  email: '',
  password: '',
});

// In JSX
<Input
  name="email"
  value={form.values.email}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
  error={form.touched.email && form.errors.email}
/>
```

## Environment Variables

Create `.env.local` in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**Important:** 
- Variables must start with `VITE_` to be exposed to the client
- Access with `import.meta.env.VITE_API_URL`
- Restart dev server after changing environment variables

## Styling

### Tailwind CSS

The project uses Tailwind CSS for styling:

```jsx
<div className="flex items-center justify-between p-4 bg-blue-600 text-white">
  <h1 className="text-2xl font-bold">Title</h1>
</div>
```

### Global Styles

Global styles in `src/index.css`:
- Tailwind directives
- CSS reset
- Custom global styles

### Component Styles

All components use Tailwind utility classes. No CSS modules or styled-components.

## API Integration

### Authentication

```javascript
import { authService } from '../services/apiService';

// Login
const response = await authService.login(email, password);
// Returns: { token, user }

// Signup
const response = await authService.signup(email, password, name);
// Returns: { token, user }

// Get Profile
const response = await authService.getProfile();
// Returns: { user }
```

### Tasks

```javascript
import { taskService } from '../services/apiService';

// Get all tasks
const response = await taskService.getTasks();
// Returns: { tasks: [...] }

// Create task
const response = await taskService.createTask({ title, description });
// Returns: { task: {...} }

// Update task
const response = await taskService.updateTask(id, { title, completed });
// Returns: { task: {...} }

// Delete task
await taskService.deleteTask(id);
// Returns: { message: '...' }
```

## Development Tips

### Hot Module Replacement (HMR)

Vite provides instant HMR. Your changes will reflect immediately without full page reload.

### React DevTools

Install React DevTools browser extension for debugging:
- Component tree inspection
- Props and state inspection
- Performance profiling

### Debugging API Calls

Check browser Network tab for API requests:
- Request headers (should include Authorization)
- Response status and data
- Error messages

### State Debugging

Add to component:
```javascript
console.log('Auth state:', useAuthStore.getState());
console.log('Task state:', useTaskStore.getState());
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in `dist/`:
- Minified JavaScript
- Optimized CSS
- Tree-shaken code
- Compressed assets

Preview the build:
```bash
npm run preview
```

## Deployment

### Static Hosting

The built app is a static SPA. Deploy `dist/` folder to:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
```bash
# Build
npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

### Environment Variables

Set `VITE_API_URL` on your hosting platform:
- Netlify: Site settings → Environment variables
- Vercel: Project settings → Environment Variables
- GitHub Pages: Use GitHub Secrets

### SPA Routing

Configure your host for SPA routing:

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Troubleshooting

### Port Already in Use

Change port in `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001,
  },
});
```

### Environment Variables Not Loading

1. Ensure file is named `.env.local` (not `.env`)
2. Variables must start with `VITE_`
3. Restart dev server after changes
4. Check with: `console.log(import.meta.env.VITE_API_URL)`

### CORS Errors

Ensure backend `CORS_ORIGIN` matches your frontend URL:
```env
# Backend .env
CORS_ORIGIN=http://localhost:3000
```

### Build Errors

1. Clear cache: `rm -rf node_modules/.vite`
2. Reinstall: `rm -rf node_modules && npm install`
3. Check Node version: `node --version` (should be 16+)

### Module Not Found

Ensure imports use correct paths:
```javascript
// Correct
import Button from '../components/Button';

// Wrong (no .jsx extension needed)
import Button from '../components/Button.jsx';
```

## Performance Optimization

### Code Splitting

React Router automatically code-splits routes. For manual splitting:

```javascript
import { lazy, Suspense } from 'react';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));

<Suspense fallback={<Loading />}>
  <DashboardPage />
</Suspense>
```

### Bundle Analysis

```bash
npm run build -- --mode analyze
```

### Image Optimization

Place images in `public/` for static assets or `src/assets/` for bundled assets.

## Contributing

1. Follow existing code style
2. Use Tailwind for styling
3. Create reusable components
4. Add proper error handling
5. Test before committing

## License

MIT

---

Built with ⚡ Vite and ⚛️ React

