import axios from "axios";
import { useEffect, useState } from "react";
import cookie from 'cookiejs';
import { User } from "@/types";
import { useRouter } from "next/navigation";


const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const getAuthHeaders = () => {
        const token = cookie.get('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const signupUser = async (name: string, email: string, password: string) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, { name, email, password })
        console.log(res.status)
        if (res.status === 201) {
            setUser(res.data.user);
            cookie.set('authToken', res.data.token);
            return res.data;
        }
        return res.data;
    }

    const loginUser = async (email: string, password: string) => {
        try {
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
        }
    }

    const getUser = async () => {
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
            console.error('Error fetching user:', error);
            setUser(null);
            return null;
        }
    }

    const logoutUser = async () => {
        cookie.remove('authToken');
        setUser(null);
        router.push('/');
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
        logoutUser
    }
}

export default useAuth;