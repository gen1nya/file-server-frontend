import { useEffect, useState } from 'react';
import { fetchMe } from '../services/authService';

export const DashboardPage = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchMe();
                setUser(data);
            } catch {
                // fetchMe handles redirect on failure
            }
        };

        load().then();
    }, []);

    return (
        <div>
            Добро пожаловать в файловый менеджер{user ? `, ${user.email}` : ''}
        </div>
    );
};
