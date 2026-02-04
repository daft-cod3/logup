# Logup - Modern Authentication Platform

A modern, responsive authentication platform built with Next.js 14 and Tailwind CSS.

## Features

### 🎨 Modern Design
- Clean, glassmorphism-inspired UI
- Gradient backgrounds with animated elements
- Responsive design for all devices
- Smooth animations and transitions

### 🔐 Authentication Pages
- **Home Page** (`/`) - Landing page with navigation to login/signup
- **Login Page** (`/logIn`) - Modern login form with:
  - Email/username and password fields
  - Password visibility toggle
  - Remember me checkbox
  - OTP authentication option
  - Social login buttons (Google, GitHub)
  - Form validation and error handling

- **Signup Page** (`/signUp`) - Comprehensive registration form with:
  - Full name, email, phone, country fields
  - Password strength indicator
  - Password confirmation validation
  - Terms and conditions checkbox
  - Social signup options
  - Real-time form validation

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