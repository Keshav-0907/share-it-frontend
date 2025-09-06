'use client'
import { motion } from "motion/react";
import { FileUpload } from "../ui/file-upload";
import { useState } from "react";
import { cn } from "@/lib/utils";
import UploadedFiles from "../atoms/UploadedFiles";


const Uploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  console.log({
    files
  });
  return (
    <div className="max-w-3xl w-full">
      <FileUpload files={files} setFiles={setFiles} />

      {
        files.length > 0 && (
          <UploadedFiles files={files} setFiles={setFiles}/>
        )
      }
    </div>
  );
};

export default Uploader;