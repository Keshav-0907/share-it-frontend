'use client'

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { File } from "@/types/index.d";
import axios from "axios";
import cookie from "cookiejs";
import FileGroupCard from "@/components/atoms/FileGroupCard";
import { useRouter } from "next/navigation";


const Profile = () => {
    const { user, isLoading } = useAuth();
    const [userFileGroups, setUserFileGroups] = useState<File[]>([]);
    const router = useRouter();
    
    const getAuthHeaders = () => {
        const token = cookie.get('authToken');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    useEffect(() => {
        const getUserFileGroups = async () => {
            const headers = getAuthHeaders();
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user-fileGroups`, { headers });
            setUserFileGroups(res.data.fileGroups);
        }
        getUserFileGroups();
    }, [])


    if (!user && !isLoading) {
        router.push('/');
    }


    return (
        <div>
            {
                userFileGroups.map((file) => (
                    <FileGroupCard key={file._id} file={file} />
                ))
            }
        </div>
    )
}

export default Profile;