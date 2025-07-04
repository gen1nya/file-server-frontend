import { apiFetch, refreshTokens } from './apiClient';


export const getFiles = async (
    folderId: string | null = null,
    offset: number = 0,
    limit: number = 200,
) => {
    const response = await apiFetch("/me/files?offset=" + offset + "&limit=" + limit + (folderId ? `&folderId=${folderId}` : ''), {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    })
    return response.json();
}

export const getFileDownloadUrl = (id: string) => {
    return `/me/file/${id}`;
};