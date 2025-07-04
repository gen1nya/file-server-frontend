import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveTokens } from '../utils/tokenStorage';
import { login } from '../services/authService';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { accessToken, refreshToken } = await login(email, password);
            saveTokens(accessToken, refreshToken);
            navigate('/dashboard');
        } catch (err) {
            alert('Ошибка входа');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input label="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            <Input label="Пароль" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            <Button type="submit">Войти</Button>
        </form>
    );
};