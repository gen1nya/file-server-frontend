import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/tokenStorage';

export const login = async (email: string, password: string) => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const { accessToken, refreshToken } = await response.json();
    console.log('login', accessToken, refreshToken);
    return { accessToken, refreshToken };
};

export const fetchMe = async () => {
    const res = await fetch('/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${getAccessToken()}` }
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
};

export const refreshToken = async () => {
    const token = getRefreshToken();
    if (!token) throw new Error('No refresh token');

    const res = await fetch('/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) throw new Error('Unable to refresh');

    const { accessToken, refreshToken } = await res.json();
    saveTokens(accessToken, refreshToken);
    return true;
};
