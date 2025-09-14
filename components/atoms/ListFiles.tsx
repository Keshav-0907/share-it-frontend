import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { File } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

const ListFiles = ({ files, selectedFiles, setSelectedFiles }: { files: File[], selectedFiles: string[], setSelectedFiles: (files: string[]) => void }) => {

    return (
        <div className="w-full">
            {files.length > 0 &&
                files.map((file, idx) => (
                    <motion.div
                        key={file._id}
                        layoutId={idx === 0 ? "file-list" : "file-list-" + idx}
                        className={cn(
                            "relative overflow-hidden z-40 bg-white border-[1px] border-dashed border-gray-600 dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                            "shadow-sm"
                        )}
                    >
                        <div className="flex justify-between w-full items-center gap-4">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={selectedFiles.length > 0 && selectedFiles.includes(file._id)}
                                    onCheckedChange={(checked) => {
                                        const newSelectedFiles = checked 
                                            ? [...selectedFiles, file._id]
                                            : selectedFiles.filter(id => id !== file._id);
                                        setSelectedFiles(newSelectedFiles);
                                    }}
                                />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    layout
                                    className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                                >
                                    {file.filename}
                                </motion.p>
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                layout
                                className="rounded-md px-2 py-1 w-fit shrink-0 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                            >
                                {(file.metadata.size / (1024 * 1024)).toFixed(2)} MB
                            </motion.p>
                        </div>

                        <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                layout
                                className="px-2 py-1 rounded-sm bg-gray-100 dark:bg-neutral-800 text-xs"
                            >
                                {file.metadata.mimetype}
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                layout
                            >
                                uploaded{" "}
                                {new Date(file.createdAt).toLocaleDateString()}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
        </div>
    );
}

export default ListFiles;