import { useEffect, useState } from 'react';
import { fetchMe } from '../services/authService';
import {getFileDownloadUrl, getFiles} from "../services/filesService";

export const DashboardPage = () => {
    const [user, setUser] = useState<any>(null);
    const [files, setFiles] = useState<any[]>([]);
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

        getFiles().then(
            (data) => {
                setFiles(data);
            }
        ).catch((err) => {
            console.error('Ошибка при загрузке файлов:', err);
        });
    }, []);

    const downloadFile = async (fileId: string, fileName: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            const res = await fetch(getFileDownloadUrl(fileId), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`Ошибка скачивания: ${res.status}`);
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Ошибка при скачивании файла:', err);
            alert('Не удалось скачать файл');
        }
    };


    return (
        <div>
            Добро пожаловать в файловый менеджер{user ? `, ${user.email}` : ''}
            <h2>Ваши файлы:</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.fileId}>
                        {file.name}{' '}
                        <button onClick={() => downloadFile(file.fileId, file.name)}>
                            Скачать
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
