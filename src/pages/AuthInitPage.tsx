import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken, getRefreshToken, clearTokens } from '../utils/tokenStorage';
import { fetchMe, refreshToken } from '../services/authService';

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
                await fetchMe();
                navigate('/dashboard');
            } catch (err) {
                try {
                    await refreshToken();
                    await fetchMe();
                    navigate('/dashboard');
                } catch {
                    clearTokens();
                    navigate('/login');
                }
            }
        };

        init().then(r => {});
    }, [navigate]);

    return <div>🔐 Проверка токенов...</div>;
};
