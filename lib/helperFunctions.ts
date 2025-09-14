import axios from "axios";

export const validatePassword = (password: string) => {
    return password.length >= 4;
}

export const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

export const createAuthenticatedRequest = (token: string) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
}

export const downloadFile = async (fileId: string, filename: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/file-group/download/${fileId}`, {
            responseType: 'blob',
        });

        if (response.status !== 200) {
            throw new Error('Failed to download file');
        }

        const blob = await response.data;
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return true;
    } catch (error) {
        console.error('Error downloading file:', error);
        return false;
    }
}