"use client"
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/useAuth";

const UploadActions = ({ setExpireAfter, expireAfter, handleUpload }: { setExpireAfter: (expireAfter: number) => void, expireAfter: number, handleUpload: () => void }) => {
    const { user } = useAuth();

    return (
        <div className="flex justify-between items-start">
            <div className="flex gap-2 flex-col">
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    <span> Files Expires In : </span>
                    <div className="flex gap-2 mt-2">
                        {[3, 6, 12].map((option) => {
                            const isLocked = !user && (option === 3 || option === 12);
                            return (
                                <div key={option} className="relative group">
                                    <button
                                        onClick={() => !isLocked && setExpireAfter(option)}
                                        disabled={isLocked}
                                        className={cn(
                                            "px-2 py-1 text-xs rounded-md border transition-all duration-200 relative",
                                            isLocked
                                                ? "cursor-not-allowed opacity-50 bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 border-neutral-200 dark:border-neutral-700"
                                                : "cursor-pointer",
                                            !isLocked && expireAfter === option
                                                ? "text-white border-[#40AB74]"
                                                : !isLocked && "bg-transparent text-neutral-600 dark:text-neutral-300 border-neutral-300 dark:border-neutral-600 hover:border-[#40AB74] hover:text-[#40AB74]"
                                        )}
                                        style={!isLocked && expireAfter === option ? { backgroundColor: '#40AB74' } : {}}
                                    >
                                        {option}hrs
                                        {isLocked && <span className="absolute -top-1 -right-1 text-[8px]">🔒</span>}
                                    </button>
                                    {isLocked && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                            login required
                                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-neutral-800 dark:border-t-neutral-200"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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