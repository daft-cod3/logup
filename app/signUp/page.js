'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8001';

  const kenyanCounties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
    'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
    'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos',
    'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a',
    'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
    'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia',
    'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    county: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    notUsername: true
  });

  const validatePassword = (password, username) => {
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      notUsername: username ? password !== username : true,
    };
    return checks;
  };

  const generateStrongPassword = (length = 12, username = '') => {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const all = upper + lower + numbers;
    let pw = '';
    // ensure at least one of each category
    pw += upper[Math.floor(Math.random() * upper.length)];
    pw += lower[Math.floor(Math.random() * lower.length)];
    pw += numbers[Math.floor(Math.random() * numbers.length)];
    for (let i = 3; i < length; i++) {
      pw += all[Math.floor(Math.random() * all.length)];
    }
    // shuffle
    pw = pw.split('').sort(() => 0.5 - Math.random()).join('');
    // if accidentally equals username, flip last char
    if (username && pw === username) {
      pw = pw.slice(0, -1) + (pw.slice(-1) === 'A' ? 'B' : 'A');
    }
    return pw;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      // re-run password validation if username or password changed
      if (name === 'password' || name === 'username') {
        setPasswordChecks(validatePassword(next.password, next.username));
      }
      return next;
    });
  };

  const handleSuggestPassword = () => {
    const suggestion = generateStrongPassword(12, formData.username);
    setFormData(prev => ({ ...prev, password: suggestion, confirmPassword: suggestion }));
    setPasswordChecks(validatePassword(suggestion, formData.username));
    setError('');
    setSuccess('Suggested a strong password - you can edit it.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (loading) return;

    // Basic checks: password matches confirm, password strength, password != username
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const checks = validatePassword(formData.password, formData.username);
    setPasswordChecks(checks);

    const allGood = Object.values(checks).every(v => v === true);
    if (!allGood) {
      setError('Password is not strong enough. Make sure it has uppercase, lowercase, numbers, and is not the same as the username (min 8 chars).');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          full_name: formData.fullName || null,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (typeof data?.detail === 'string') {
          setError(data.detail);
          return;
        }
        if (Array.isArray(data?.detail)) {
          const message = data.detail
            .map((err) => (typeof err?.msg === 'string' ? err.msg : null))
            .filter(Boolean)
            .join(', ');
          setError(message || `Signup failed (${response.status})`);
          return;
        }
        setError(`Signup failed (${response.status})`);
        return;
      }

      setSuccess('Account created successfully. Redirecting to sign in...');
      setTimeout(() => router.push('/logIn'), 800);
    } catch {
      setError(`Could not reach the API server at ${API_BASE_URL}. Start the backend and try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 backdrop-blur-sm bg-linear-to-br from-blue-600/20 via-indigo-600/20 to-purple-700/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl border border-white/20 relative z-10 animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg animate-bounceIn">
            <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 animate-slideInDown">Create Account</h2>
          <p className="text-gray-600 mt-2 animate-slideInUp">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm" 
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
              placeholder="Choose a username (used to login)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">County</label>
            <select
              name="county"
              value={formData.county}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
              required
            >
              <option value="">Select your county</option>
              {kenyanCounties.map((county) => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm" 
                placeholder="Create password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110 active:scale-95"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">Password must:</div>
              <button type="button" onClick={handleSuggestPassword} className="text-sm text-blue-600 hover:underline">Suggest strong password</button>
            </div>

            <ul className="mt-2 grid grid-cols-1 gap-1 text-sm">
              <li className={"flex items-center " + (passwordChecks.length ? 'text-green-600' : 'text-gray-600') }>
                <span className="w-4 inline-block">{passwordChecks.length ? '✓' : '•'}</span>
                <span className="ml-2">At least 8 characters</span>
              </li>
              <li className={"flex items-center " + (passwordChecks.upper ? 'text-green-600' : 'text-gray-600') }>
                <span className="w-4 inline-block">{passwordChecks.upper ? '✓' : '•'}</span>
                <span className="ml-2">Contains an uppercase letter</span>
              </li>
              <li className={"flex items-center " + (passwordChecks.lower ? 'text-green-600' : 'text-gray-600') }>
                <span className="w-4 inline-block">{passwordChecks.lower ? '✓' : '•'}</span>
                <span className="ml-2">Contains a lowercase letter</span>
              </li>
              <li className={"flex items-center " + (passwordChecks.number ? 'text-green-600' : 'text-gray-600') }>
                <span className="w-4 inline-block">{passwordChecks.number ? '✓' : '•'}</span>
                <span className="ml-2">Contains a number</span>
              </li>
              <li className={"flex items-center " + (passwordChecks.notUsername ? 'text-green-600' : 'text-gray-600') }>
                <span className="w-4 inline-block">{passwordChecks.notUsername ? '✓' : '•'}</span>
                <span className="ml-2">Is not the same as your username</span>
              </li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 hover:border-blue-400 hover:shadow-md focus:scale-[1.02] bg-white/80 backdrop-blur-sm" 
              placeholder="Confirm password"
              required
            />
          </div>

          {success && (
            <div className="text-sm text-green-700">{success}</div>
          )}
          {error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 relative overflow-hidden group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            <span className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="relative">{loading ? 'Creating...' : 'Create Account'}</span>
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-red-300 rounded-md shadow-sm bg-white/90 backdrop-blur-sm text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 group">
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>

            <button className="w-full inline-flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm bg-white/90 backdrop-blur-sm text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 group">
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-800 rounded-md shadow-sm bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 group">
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/logIn" className="text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 hover:scale-105">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-105">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
