import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from '../utils/tokenStorage';
import {fetchMe} from "../services/authService";

export const AuthInitPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const access = getAccessToken();
            const refresh = getRefreshToken();

            if (!access && !refresh) {
                navigate('/login');
                return;
            }

            try {
                if (access) {
                    const meRes = await fetch('/me', {
                        headers: { Authorization: `Bearer ${access}` }
                    });

                    if (meRes.ok) {
                        navigate('/dashboard');
                        return;
                    }
                }

                if (refresh) {
                    const refreshRes = await fetch('/auth/refresh', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${refresh}`
                        }
                    });

                    if (!refreshRes.ok) throw new Error('Refresh failed');

                    const { accessToken, refreshToken } = await refreshRes.json();
                    saveTokens(accessToken, refreshToken);

                    const meRes = await fetch('/me', {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    });

                    if (meRes.ok) {
                        navigate('/dashboard');
                        return;
                    }
                }

                throw new Error('Auth failed');
            } catch (err) {
                clearTokens();
                navigate('/login');
            }
        };

        init().then(r => {});
    }, [navigate]);

    return <div>🔐 Проверка токенов...</div>;
};
