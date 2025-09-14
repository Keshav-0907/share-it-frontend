'use client'
import { FileUpload } from "../ui/file-upload";
import { useState } from "react";
import UploadedFiles from "../atoms/UploadedFiles";
import UploadActions from "./UploadActions";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const Uploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [expiresAfter, setExpiresAfter] = useState(3);
  const { user } = useAuth();
  const router = useRouter();

  const handleUpload = async () => {
    if (!files.length) {
      console.error('No files selected');
      return;
    }

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

      formData.append('expiresAfter', String(expiresAfter));
      if (user) {
        formData.append('userId', user?._id || '');
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/file-group/create`, formData);

      console.log(response);


      if (response.data.success) {
        console.log('Upload successful:', response.data);
        toast.success('Upload successful')

        // Store file group in localStorage
        const fileGroupId = response.data.fileGroup._id;
        const existingData = localStorage.getItem('shareIt');

        if (existingData) {
          const parsedData = JSON.parse(existingData);
          if (!parsedData.file_groups.includes(fileGroupId)) {
            parsedData.file_groups.push(fileGroupId);
          }
          localStorage.setItem('shareIt', JSON.stringify(parsedData));
        } else {
          const newData = {
            file_groups: [fileGroupId]
          };
          localStorage.setItem('shareIt', JSON.stringify(newData));
        }

        setTimeout(() => {
          router.push(`/files/${response.data.fileGroup.code}`);
        }, 1000);
      } else {
        console.log('Upload failed:', response.data.message);
        toast.error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      // TODO: Handle network error
    }
  }

  return (
    <div className="max-w-3xl w-full space-y-4">

      <FileUpload setFiles={setFiles} />

      {
        files.length > 0 && (
          <UploadActions setExpireAfter={setExpiresAfter} expireAfter={expiresAfter} handleUpload={handleUpload} />
        )
      }

      {
        files.length > 0 && (
          <UploadedFiles files={files} setFiles={setFiles} />
        )
      }
    </div>
  );
};

export default Uploader;