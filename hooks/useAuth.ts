import axios from "axios";
import { useEffect, useState } from "react";
import cookie from 'cookiejs';
import { User } from "@/types";
import { useRouter } from "next/navigation";


const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const getAuthHeaders = () => {
        const token = cookie.get('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const signupUser = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, { name, email, password })
            console.log(res.status)
            if (res.status === 201) {
                setUser(res.data.user);
                cookie.set('authToken', res.data.token);
                return res.data;
            }
            return res.data;
        } finally {
            setIsLoading(false);
        }
    }

    const loginUser = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, { email, password });
            if (res.status === 200) {
                setUser(res.data.user);
                cookie.set('authToken', res.data.token);
                return res.data;
            }
            return res.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const getUser = async () => {
        setIsLoading(true);
        try {
            const headers = getAuthHeaders();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get`, { headers });
            if (res.status === 200) {
                setUser(res.data.user);
                return res.data;
            }
            return null;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setUser(null);
                return null;
            }
            console.log('Error fetching user:', error);
            setUser(null);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    const logoutUser = async () => {
        setIsLoading(true);
        cookie.remove('authToken');
        setUser(null);
        router.push('/');
        setIsLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    return {
        user,
        signupUser,
        loginUser,
        getUser,
        getAuthHeaders,
        logoutUser,
        isLoading
    }
}

export default useAuth;