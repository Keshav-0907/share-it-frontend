"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const UploadActions = ({ setExpireFleAfter, expireFleAfter, handleUpload }: { setExpireFleAfter: (expireFleAfter: string) => void, expireFleAfter: string, handleUpload: () => void }) => {
    const [showExpireViews, setShowExpireViews] = useState(false);
    
    return (
        <div className="flex justify-between items-start">
            <div className="flex gap-2 flex-col">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    <span> Files Expires In : </span>
                    <div className="flex gap-2 mt-2">
                        {["3hrs", "6hrs", "12hrs"].map((option) => (
                            <button
                                key={option}
                                onClick={() => setExpireFleAfter(option)}
                                className={cn(
                                    "px-2 py-1 text-xs rounded-md cursor-pointer border transition-all duration-200",
                                    expireFleAfter === option
                                        ? "text-white border-[#40AB74]"
                                        : "bg-transparent text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:border-[#40AB74] hover:text-[#40AB74]"
                                )}
                                style={expireFleAfter === option ? { backgroundColor: '#40AB74' } : {}}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>


            <Button onClick={handleUpload}>
                Upload Files
            </Button>
        </div>
    )
}

export default UploadActions;