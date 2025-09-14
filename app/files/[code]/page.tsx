'use client'
import ListFiles from "@/components/atoms/ListFiles";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { File } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { downloadFile } from "@/lib/helperFunctions";
import ShareFileGroup from "@/components/molecules/ShareFileGroup";
import { Info, Lock } from "lucide-react";



const DownloadFile = () => {
    const { code } = useParams();
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const getFiles = async () => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/file-group/get/${code}`);
            if (res.data.success) {
                setFiles(res.data.fileGroup);
                setTimeLeft(res.data.timeLeft);

                const existingData = localStorage.getItem('shareIt');
                if (existingData) {
                    const parsedData = JSON.parse(existingData);
                    if (parsedData.owner || (parsedData.file_groups && parsedData.file_groups.includes(res.data.fileGroup._id))) {
                        setIsOwner(true);
                    }
                }
            } else {
                toast.error('File group not found');
            }
        }
        getFiles();
    }, [code]);

    const handleSelectAll = () => {
        if (selectedFiles.length === files.length) {
            setSelectedFiles([]);
        } else {
            setSelectedFiles(files.map(file => file._id));
        }
    }

    const handleDownload = async () => {
        if (selectedFiles.length === 0) {
            toast.error('Please select at least one file to download');
            return;
        }

        const selectedFileObjects = files.filter(file => selectedFiles.includes(file._id));
        let successCount = 0;
        let failCount = 0;

        for (const file of selectedFileObjects) {
            const success = await downloadFile(file._id, file.filename);
            if (success) {
                successCount++;
            } else {
                failCount++;
            }
        }

        if (successCount > 0 && failCount === 0) {
            toast.success(`Successfully downloaded ${successCount} file(s)`);
        } else if (successCount > 0 && failCount > 0) {
            toast.success(`Downloaded ${successCount} file(s), ${failCount} failed`);
        } else {
            toast.error('Failed to download files');
        }
    }

    return (
        <div className="max-w-3xl w-full mx-auto space-y-8">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                        Download Files
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        The Files will be expired in {timeLeft.toFixed(0)} hours
                    </div>
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    <Info size={14}/>
                    <span> Your files are public and can be accessed by anyone with the link.</span>
                </div>
            </div>
            {
                isOwner && (
                    <ShareFileGroup code={code as string} />
                )
            }
            <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 border-[1px] px-2 py-1.5 rounded-md cursor-pointer" onClick={handleSelectAll}>
                        <Checkbox
                            checked={selectedFiles.length === files.length}
                            onCheckedChange={handleSelectAll}
                        />
                        <div className="text-xs">
                            Select All
                        </div>
                    </div>


                    <div className={`bg-[#40AB74] text-white px-2 py-1 text-xs rounded-md ${selectedFiles.length > 0 ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} onClick={handleDownload}>
                        Download Selected Files
                    </div>
                </div>
                <ListFiles files={files} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            </div>
        </div>
    )
}

export default DownloadFile;