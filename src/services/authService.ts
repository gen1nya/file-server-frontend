import { apiFetch, refreshTokens } from './apiClient';

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
    const res = await apiFetch('/me', { method: 'GET' });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
};

export const refreshToken = async () => {
    await refreshTokens();
    return true;
};
