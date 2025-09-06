import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { IconX } from "@tabler/icons-react";

const UploadedFiles = ({ files, setFiles }: { files: File[], setFiles: (files: File[]) => void }) => {
    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full" >
            {files.length > 0 &&
                files.map((file, idx) => (
                    <motion.div
                        key={"file" + idx}
                        layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                        className={cn(
                            "relative overflow-hidden z-40 bg-white border-[1px] border-dashed border-gray-600 dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                            "shadow-sm"
                        )}
                    >
                        <div className="flex justify-between w-full items-center gap-4">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                layout
                                className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                            >
                                {file.name}
                            </motion.p>
                            <div className="flex items-center gap-2">
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                                >
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </motion.p>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => removeFile(idx)}
                                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition-colors"
                                    aria-label="Remove file"
                                >
                                    <IconX className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                                </motion.button>
                            </div>
                        </div>

                        <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                layout
                                className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                            >
                                {file.type}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                layout
                            >
                                modified{" "}
                                {new Date(file.lastModified).toLocaleDateString()}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
        </div>
    );
};

export default UploadedFiles;