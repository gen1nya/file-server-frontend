import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/tokenStorage';

const refreshTokens = async () => {
    const token = getRefreshToken();
    if (!token) throw new Error('No refresh token');

    const res = await fetch('/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (res.status === 401) {
        throw new Error('Unauthorized');
    }

    if (!res.ok) {
        throw new Error('Unable to refresh');
    }

    const { accessToken, refreshToken } = await res.json();
    saveTokens(accessToken, refreshToken);
};

export const apiFetch = async (input: RequestInfo, init: RequestInit = {}, retry = true): Promise<Response> => {
    const headers = new Headers(init.headers || {});
    const access = getAccessToken();
    if (access && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${access}`);
    }

    const response = await fetch(input, { ...init, headers });

    if (response.status === 401 && retry) {
        try {
            await refreshTokens();
            const newHeaders = new Headers(init.headers || {});
            const newAccess = getAccessToken();
            if (newAccess && !newHeaders.has('Authorization')) {
                newHeaders.set('Authorization', `Bearer ${newAccess}`);
            }
            return apiFetch(input, { ...init, headers: newHeaders }, false);
        } catch (e) {
            clearTokens();
            window.location.href = '/login';
            throw e;
        }
    }

    return response;
};

export { refreshTokens };
