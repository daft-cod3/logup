import { getAuthToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function readErrorMessage(response, fallback) {
  try {
    const data = await response.json();

    if (typeof data?.detail === 'string') {
      return data.detail;
    }

    if (Array.isArray(data?.detail)) {
      const validationMessage = data.detail
        .map((item) => (typeof item?.msg === 'string' ? item.msg : null))
        .filter(Boolean)
        .join(', ');

      if (validationMessage) {
        return validationMessage;
      }
    }
  } catch {
    // Ignore parsing errors and return fallback
  }

  return fallback;
}

export const api = {
  async signup(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, 'Signup failed'));
    }

    return await response.json();
  },

  async login(credentials) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, 'Login failed'));
    }

    return await response.json();
  },

  async getMe(token) {
    const accessToken = token || getAuthToken();
    if (!accessToken) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(await readErrorMessage(response, 'Failed to fetch user'));
    }

    return await response.json();
  },
};
