# 🚀 Logup - Quick Start Guide

## ⚡ Fastest Way to Get Started (30 seconds)

```bash
# 1. Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# 2. Start everything with one command
npm run dev:all
```

That's it! Both frontend and backend will start:
- **Frontend**: Open http://localhost:3000
- **Backend API**: http://localhost:8000

---

## 📍 URLs You Need

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3000 | Main app & UI |
| Backend API | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| ReDoc | http://localhost:8000/redoc | Alternative API docs |
| Health Check | http://localhost:8000/health | Check if backend is running |

---

## 🎮 How to Test It

### 1. Test Signup (Create Account)
```
1. Go to: http://localhost:3000/signUp
2. Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - County: Nairobi
   - Phone: +254712345678
   - Password: Test123!
   - Confirm Password: Test123!
3. Click "Create Account"
4. You should see success ✓
```

### 2. Test Login
```
1. Go to: http://localhost:3000/logIn
2. Enter credentials:
   - Email: john@example.com
   - Password: Test123!
3. Click "Sign In"
4. Should redirect to home page ✓
```

### 3. Open Browser Console
```
Press F12 → Console tab

Check if token is saved:
localStorage.getItem('access_token')
```

---

## 🔧 Alternative Start Methods

### Run Only Frontend
```bash
npm run dev
```
Opens: http://localhost:3000

### Run Only Backend
```bash
npm run dev:backend
```
Opens: http://localhost:8000

### Use Windows Batch Script
```bash
start.bat
```

### Use PowerShell Script
```powershell
powershell -ExecutionPolicy Bypass -File start.ps1
```

### Use Shell Script (Mac/Linux)
```bash
bash start.sh
```

---

## 📁 File Locations Quick Reference

| What | Location |
|------|----------|
| Frontend homepage | `app/page.js` |
| Login page | `app/logIn/page.js` |
| Signup page | `app/signUp/page.js` |
| API client | `app/lib/api.js` |
| Backend main app | `backend/app/main.py` |
| Auth routes | `backend/app/routes/auth.py` |
| Database | `backend/sql_app.db` |
| Frontend config | `.env.local` |
| Backend config | `backend/.env` |

---

## 🔐 User Credentials for Testing

After signup, use these credentials to login:
- **Email**: Any email you signed up with
- **Password**: The password you created

✅ Token automatically saved to `localStorage`
✅ Sent with every request to protected endpoints

---

## ⚠️ If Something Goes Wrong

### Backend won't start
```bash
# Check if port 8000 is free
netstat -ano | findstr :8000

# Try reinstalling dependencies
cd backend
pip install -r requirements.txt --force-reinstall
cd ..
```

### Frontend won't connect to backend
- Check backend is running: http://localhost:8000/health
- Check `.env.local` has: `NEXT_PUBLIC_API_URL=http://localhost:8000`
- Check browser console (F12) for errors

### Database errors
```bash
# Reset database
cd backend
del sql_app.db
python init_db.py
cd ..
```

### "concurrently" not found
```bash
npm install concurrently
```

---

## 📊 Full Verification

Run the verification script to check everything:
```bash
python verify.py
```

This checks for:
- ✓ All required files present
- ✓ Environment variables configured
- ✓ Dependencies listed
- ✓ Startup scripts ready

---

## 💡 Key Features Ready to Use

✅ **User Registration** - Signup with full details  
✅ **User Login** - Email/password authentication  
✅ **JWT Tokens** - Secure token-based auth  
✅ **Password Hashing** - bcrypt for security  
✅ **CORS Enabled** - Frontend-backend communication  
✅ **SQLite Database** - Auto-created on first run  
✅ **Error Handling** - User-friendly error messages  
✅ **Loading States** - Visual feedback while waiting  

---

## 📚 Useful API Commands

### Check if backend is running
```bash
curl http://localhost:8000/health
```

### View API documentation
```
Open: http://localhost:8000/docs
```

### Test signup via curl
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test123!",
    "full_name":"Test User",
    "phone_number":"+254712345678",
    "county":"Nairobi"
  }'
```

### Test login via curl
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username":"test@example.com",
    "password":"Test123!"
  }'
```

---

## 🎯 Next Steps After Getting It Running

1. **Logout functionality** - Add logout button & token clearing
2. **Protected pages** - Redirect to login if not authenticated
3. **User profile** - Display current user info
4. **Forgot password** - Password reset flow
5. **Email verification** - Verify emails on signup
6. **Deployment** - Deploy to production servers

---

## 📖 Full Documentation

👉 **See [SETUP_GUIDE.md](./SETUP_GUIDE.md)** for complete documentation

---

## ✨ You're All Set!

```bash
npm run dev:all
```

Your full-stack app is now running! 🎉

Frontend: http://localhost:3000  
Backend: http://localhost:8000
