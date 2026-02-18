# Logup - Full Stack Authentication Platform

A modern, fully-integrated authentication platform with **Next.js 14 frontend** and **FastAPI backend**.

✅ **Frontend & Backend Fully Integrated and Connected**

## 🚀 Quick Start (30 Seconds)

```bash
# Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# Start everything
npm run dev:all
```

Done! Open:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 📖 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Get running in 30 seconds
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md)** - What's been integrated

## ✨ Features

### 🎨 Modern Design
- Clean, glassmorphism-inspired UI
- Gradient backgrounds with animated elements
- Responsive design for all devices
- Smooth animations and transitions

### 🔐 Authentication System
- **Home Page** (`/`) - Landing page with navigation
- **Login Page** (`/logIn`) - Connected to backend API
  - Email/password authentication
  - JWT token storage
  - Remember me functionality
  - Error handling and validation
  - Loading states

- **Signup Page** (`/signUp`) - Connected to backend API
  - User registration with full details
  - Email, password, name, phone, county
  - Password confirmation validation
  - Form validation and error handling
  - Auto-redirect to login

### 🔌 Seamless Backend Integration
- ✅ Signup endpoint connected
- ✅ Login endpoint connected
- ✅ Token-based authentication
- ✅ Error handling
- ✅ Loading states
- ✅ LocalStorage token management

## 🏗️ Architecture

### Frontend (Next.js)
```
app/
  ├── logIn/page.js         → Connected to /auth/login
  ├── signUp/page.js        → Connected to /auth/signup
  ├── page.js               → Home page
  └── lib/api.js            → API client for backend
```

### Backend (FastAPI)
```
backend/
  ├── app/main.py           → FastAPI app with CORS
  ├── routes/auth.py        → Auth endpoints
  ├── services/auth_service.py → Auth logic
  ├── models/user.py        → User database model
  └── schemas/auth.py       → Input/output validation
```

### Database
- SQLite (`sql_app.db`)
- Auto-created on first run
- User table with email, password hash, profile info

## 📋 Available Scripts

```bash
npm run dev              # Frontend only (http://localhost:3000)
npm run dev:backend      # Backend only (http://localhost:8000)
npm run dev:all         # Both frontend & backend together ⭐
npm run build           # Build for production
npm run start           # Run production build
npm run lint            # Check code with Biome
npm run format          # Format code with Biome
```

## 🔐 Authentication Flow

```
User Form → Frontend → API Client → Backend → Database → JWT Token → LocalStorage
```

1. User fills signup/login form
2. Frontend sends data to backend API
3. Backend validates and processes
4. Returns JWT token on success
5. Frontend stores token in localStorage
6. Token sent with all authenticated requests

## 🌐 API Endpoints

### Health Check
```
GET /health
Response: { "status": "ok" }
```

### Signup
```
POST /auth/signup
Body: {
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe",
  "phone_number": "+254712345678",
  "county": "Nairobi"
}
Response: { "id": 1, "email": "...", "is_active": true }
```

### Login
```
POST /auth/login
Body: {
  "username": "user@example.com",
  "password": "securepassword"
}
Response: {
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": { "id": 1, "email": "..." }
}
```

### Get Current User
```
GET /auth/me
Header: Authorization: Bearer <token>
Response: { "id": 1, "email": "...", "full_name": "...", "is_active": true }
```

## 📚 Tech Stack

### Frontend
- **Next.js 16.1** - React framework
- **React 19.2** - UI library
- **Tailwind CSS 4.1** - Styling
- **Biome 2.2** - Linting & formatting

### Backend
- **FastAPI 0.109** - Python web framework
- **Uvicorn 0.25** - ASGI server
- **SQLAlchemy 2.0** - ORM
- **Pydantic 2.6** - Data validation
- **python-jose** - JWT tokens
- **passlib** - Password hashing

## 🔒 Security

✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ CORS enabled for development  
✅ Input validation with Pydantic  
✅ SQL injection prevention  
✅ Secure password comparison  

## 🧪 Testing

### Test Signup
1. Go to http://localhost:3000/signUp
2. Fill in form and submit
3. Should redirect to login on success

### Test Login
1. Go to http://localhost:3000/logIn
2. Enter credentials
3. Should redirect to home on success
4. Token should be in localStorage

## ⚠️ Troubleshooting

### Backend won't connect
- Check backend is running: `http://localhost:8000/health`
- Check `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000`
- Check browser console for errors (F12)

### Port already in use
```bash
# Windows
netstat -ano | findstr :8000   # or :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :8000   # or :3000
kill -9 <PID>
```

### Database errors
```bash
cd backend
del sql_app.db              # Windows
# rm sql_app.db            # Mac/Linux
python init_db.py
cd ..
```

## 📖 Full Documentation

For complete setup and configuration details, see:
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup
- [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md) - Integration details

## 🎯 Next Steps

1. Run `npm run dev:all`
2. Test signup and login
3. Check browser console and localStorage
4. Review full documentation
5. Implement logout functionality
6. Add protected routes
7. Deploy to production

## 📞 Quick Reference

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |
| Health Check | http://localhost:8000/health |

## ✅ Status

- ✅ Frontend & Backend fully integrated
- ✅ All authentication flows working
- ✅ Database auto-initialized
- ✅ Error handling implemented
- ✅ Loading states working
- ✅ Documentation complete
- ✅ Ready for development

---

**Get started now**: `npm run dev:all`

🚀 **Frontend**: http://localhost:3000  
🔌 **Backend**: http://localhost:8000

Happy coding! ✨

### 🛠 Technical Features
- Built with Next.js 14 App Router
- Tailwind CSS for styling
- Client-side form validation
- Responsive design
- Modern component architecture
- Reusable UI components

### 📱 User Experience
- Intuitive navigation between pages
- Loading states and animations
- Error handling and validation feedback
- Accessibility-friendly design
- Mobile-first responsive layout

## File Structure

```
my-app/
├── app/
│   ├── components/
│   │   ├── Button.js          # Reusable button component
│   │   └── Input.js           # Reusable input component
│   ├── logIn/
│   │   └── page.js            # Login page
│   ├── signUp/
│   │   └── page.js            # Signup page
│   ├── globals.css            # Global styles with Tailwind
│   ├── layout.js              # Root layout
│   └── page.js                # Home page
├── tailwind.config.js         # Tailwind configuration
└── package.json               # Dependencies
```

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Navigation Flow

1. **Home Page** (`/`) - Choose between Login or Sign Up
2. **Login Page** (`/logIn`) - Sign in with existing account
3. **Sign Up Page** (`/signUp`) - Create new account
4. Both pages link back to home and to each other

## Styling

The application uses:
- **Tailwind CSS v4** for utility-first styling
- **Custom gradients** for modern visual appeal
- **Glassmorphism effects** with backdrop blur
- **Smooth transitions** for better UX
- **Responsive breakpoints** for mobile compatibility

## Components

### Reusable Components
- `Button.js` - Configurable button with variants (primary, secondary, social)
- `Input.js` - Form input with icon support and validation states

### Features Implemented
- Form state management with React hooks
- Password strength validation
- Real-time form validation
- Social authentication UI
- OTP modal for two-factor authentication
- Responsive navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Backend integration for actual authentication
- Database connectivity
- Session management
- Password reset functionality
- Email verification
- Dashboard after login
- User profile management