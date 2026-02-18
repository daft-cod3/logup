# Logup - Complete Integration Guide

## 📋 Project Overview

This is a full-stack authentication application with:
- **Frontend**: Next.js (React) on http://localhost:3000
- **Backend**: FastAPI (Python) on http://localhost:8000
- **Database**: SQLite with SQLAlchemy ORM

## 📁 Project Structure

```
my-app/
├── app/                          # Frontend (Next.js)
│   ├── lib/
│   │   └── api.js              # API client for backend communication
│   ├── components/             # React components
│   ├── logIn/page.js           # Login page (connected to API)
│   ├── signUp/page.js          # Signup page (connected to API)
│   ├── page.js                 # Home page
│   └── layout.js               # App layout
│
├── backend/                      # Backend API (FastAPI)
│   ├── app/
│   │   ├── main.py            # FastAPI app setup
│   │   ├── routes/auth.py     # Authentication endpoints
│   │   ├── services/          # Business logic
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   ├── db/                # Database setup
│   │   └── core/              # Config, security, dependencies
│   ├── requirements.txt        # Python dependencies
│   ├── .env                    # Backend environment variables
│   └── sql_app.db             # SQLite database (auto-created)
│
├── package.json               # NPM scripts and dependencies
├── .env.local                # Frontend environment variables
├── start.bat                 # Windows startup script
├── start.sh                  # macOS/Linux startup script
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+
- **Python** 3.8+
- **npm** or **yarn**

### Step 1: Install All Dependencies

```bash
# From the my-app directory
npm install
cd backend && pip install -r requirements.txt && cd ..
```

### Step 2: Start Everything

**Option A: All-in-One (Recommended)**
```bash
npm run dev:all
```

**Option B: Separate Terminals**

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Option C: Use Startup Script (Windows)**
```bash
start.bat
```

## ⚙️ Environment Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
SECRET_KEY=your-super-secret-key-change-this-in-production-minimum-32-characters-long!!!
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
DATABASE_URL=sqlite:///./sql_app.db
```

## 🔌 API Endpoints

### Authentication Routes

#### Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "full_name": "John Doe",
  "phone_number": "+254712345678",
  "county": "Nairobi"
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "is_active": true
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "full_name": "John Doe",
  "is_active": true
}
```

#### Health Check
```http
GET /health
```

**Response (200 OK):**
```json
{
  "status": "ok"
}
```

## 🎨 Frontend Features

### Pages

#### Login Page (`/logIn`)
- Email/password authentication
- Remember me checkbox
- OTP sign-in UI
- Social login buttons (UI ready)
- Error handling with validation
- Loading states

#### Signup Page (`/signUp`)
- Full name input
- Email input
- Kenyan county dropdown selector
- Phone number input
- Password with show/hide toggle
- Password confirmation
- Form validation
- Error messages

### API Client (`app/lib/api.js`)
Centralized API communication with:
- `api.signup()` - Register new users
- `api.login()` - Authenticate users
- `api.getMe()` - Fetch current user (requires token)

## 💾 Database

**Type**: SQLite
**Location**: `backend/sql_app.db`
**Auto-Setup**: Database and tables created automatically on first run

### Models
- **User**: Stores user account information
  - id, email, full_name, phone_number, county, password_hash, is_active

## 🔐 Authentication Flow

1. User fills signup form on `/signUp`
2. Frontend sends data to `POST /auth/signup`
3. Backend creates user and returns user data
4. User navigates to `/logIn`
5. User enters credentials
6. Frontend sends to `POST /auth/login`
7. Backend validates and returns JWT token
8. Frontend stores token in `localStorage`
9. Token used in `Authorization` header for authenticated requests

## 🛠️ Development

### Available npm Scripts

```bash
npm run dev              # Run frontend only (port 3000)
npm run dev:backend      # Run backend only (port 8000)
npm run dev:all         # Run backend + frontend together
npm run build           # Build frontend for production
npm run start           # Start production build
npm run lint            # Run Biome linter
npm run format          # Format code with Biome
```

### Hot Reload
Both frontend and backend support hot reload during development:
- **Frontend**: Changes to `.js` files auto-reload
- **Backend**: Changes to `.py` files auto-reload (with `--reload` flag)

## 📝 Token Management

The frontend automatically:
- Stores JWT token in `localStorage` after login
- Includes token in `Authorization: Bearer <token>` headers for authenticated requests
- Redirects to login if authentication fails
- Can manually clear token on logout (implement as needed)

## 🧪 Testing the Integration

### Test Signup
1. Go to http://localhost:3000/signUp
2. Fill in all fields
3. Click "Create Account"
4. Should redirect to login on success

### Test Login
1. Go to http://localhost:3000/logIn
2. Enter credentials from signup
3. Click "Sign In"
4. Should redirect to home on success
5. Check localStorage: `localStorage.getItem('access_token')` should exist

### Test API Directly (Using curl or Postman)

```bash
# Health check
curl http://localhost:8000/health

# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "full_name": "Test User",
    "phone_number": "+254712345678",
    "county": "Nairobi"
  }'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test@example.com",
    "password": "Test123!"
  }'
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000  # Windows

# Kill the process (Windows)
taskkill /PID <PID> /F

# Reinstall dependencies
cd backend
pip install -r requirements.txt --force-reinstall
```

### Frontend won't connect to backend
- Check that backend is running: http://localhost:8000/health
- Check `NEXT_PUBLIC_API_URL` is `http://localhost:8000`
- Check browser console for CORS errors
- Try clearing browser cache

### Database locked error
```bash
# Remove old database and restart
cd backend
del sql_app.db
python init_db.py
```

### Python not found
```bash
# Make sure Python is installed and in PATH
python --version

# If not, download from python.org or use:
# Windows: choco install python
# macOS: brew install python
# Linux: sudo apt install python3
```

## 🔒 Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens for authentication
- ✅ CORS enabled for local development
- ⚠️ **TODO**: Change `SECRET_KEY` in production
- ⚠️ **TODO**: Use HTTPS in production
- ⚠️ **TODO**: Implement refresh tokens
- ⚠️ **TODO**: Add rate limiting
- ⚠️ **TODO**: Add input validation/sanitization
- ⚠️ **TODO**: Add CSRF protection

## 📚 Next Steps

1. **Implement Logout**
   - Clear token from localStorage
   - Redirect to login page

2. **Implement Protected Routes**
   - Check for token before accessing protected pages
   - Redirect to login if missing

3. **Add User Profile Page**
   - Create `/profile` page
   - Fetch user data with `api.getMe(token)`
   - Allow user to update profile

4. **Add Forgot Password**
   - Implement password reset flow
   - Send reset email

5. **Add Email Verification**
   - Send verification email on signup
   - Verify email before allowing login

6. **Add Rate Limiting**
   - Limit login attempts
   - Prevent brute force attacks

7. **Production Deployment**
   - Deploy backend to server (Heroku, Railway, AWS, etc.)
   - Deploy frontend to hosting (Vercel, Netlify, etc.)
   - Update `NEXT_PUBLIC_API_URL` to production backend URL
   - Use environment variables for secrets

## 📖 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [JWT Best Practices](https://jwt.io/introduction)
- [React Hooks](https://react.dev/reference/react/hooks)

## 💬 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the backend logs
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Status**: ✅ Ready for Development  
**Last Updated**: February 18, 2026  
**Frontend**: http://localhost:3000  
**Backend**: http://localhost:8000
