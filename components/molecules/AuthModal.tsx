import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const AuthModal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
        >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

            <div
                className="relative bg-card border border-border rounded-lg shadow-2xl p-4 w-full max-w-md mx-4 transform transition-all duration-200 ease-out"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute cursor-pointer top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={16} />
                </button>


                <div className='flex flex-col gap-4'>
                    <div className="flex flex-col">
                        <div className="text-xl font-semibold text-foreground">Sign in </div>
                        <div className="text-sm text-muted-foreground">Sign in to your account to continue</div>
                    </div>

                    <div>
                        <button className='w-full py-2 rounded-md border-[1px] cursor-pointer font-medium flex items-center gap-2 justify-center'>
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            Sign in with Google
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthModal;