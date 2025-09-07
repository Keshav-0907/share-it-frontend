import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '../ui/input';
import toast from 'react-hot-toast';
import useAuth from '@/hooks/useAuth';
import { validateEmail, validatePassword } from '@/lib/helperFunctions';

const AuthModal = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const [mode, setMode] = useState<'signin' | 'signup'>('signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const { signupUser, loginUser } = useAuth();

    const handleSignIn = async () => {
        if (!email || !password) {
            toast.error('Email and password are required');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email');
            return;
        }
        try {
            const res = await loginUser(email, password);
            if (res) {
                toast.success('Sign in successful');
                setIsOpen(false);
            }
        } catch (error) {
            toast.error('Sign in failed. Please check your credentials.');
        }
    }

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            toast.error('All fields are required');
            return;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid email');
            return;
        }
        if (!validatePassword(password)) {
            toast.error('Password must be at least 8 characters long');
            return;
        }
        const res = await signupUser(name, email, password)
        if (res) {
            toast.success('Sign up successful');
        } else {
            toast.error('Sign up failed');
        }
    }

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
                    {
                        mode === 'signin' ? (
                            <div className="flex flex-col">
                                <div className="text-xl font-semibold text-foreground">Sign in </div>
                                <div className="text-sm text-muted-foreground">Sign in to your account to continue</div>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <div className="text-xl font-semibold text-foreground">Sign up </div>
                                <div className="text-sm text-muted-foreground">Sign up to create an account</div>
                            </div>
                        )
                    }

                    <div>
                        {
                            mode === 'signin' ? (
                                <div className='flex flex-col gap-2'>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            )
                        }
                    </div>

                    <div>
                        {
                            mode === 'signin' ? (
                                <button className='w-full py-2 rounded-md border-[1px] cursor-pointer font-medium flex items-center gap-2 justify-center bg-[#40AB74] hover:bg-[#40AB74]/80' onClick={handleSignIn}>
                                    Sign in
                                </button>
                            ) : (
                                <button className='w-full py-2 rounded-md border-[1px] cursor-pointer font-medium flex items-center gap-2 justify-center bg-[#40AB74] hover:bg-[#40AB74]/80' onClick={handleSignUp}>
                                    Sign up
                                </button>
                            )
                        }
                    </div>
                    <div>
                        {
                            mode === 'signin' ? (
                                <div className='text-xs text-muted-foreground'>
                                    Don't have an account? <span className='text-[#40AB74] cursor-pointer' onClick={() => setMode('signup')}>Sign up</span>
                                </div>
                            ) : (
                                <div className='text-xs text-muted-foreground'>
                                    Already have an account? <span className='text-[#40AB74] cursor-pointer' onClick={() => setMode('signin')}>Sign in</span>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AuthModal;