'use client'
import { useState, useEffect } from "react";
import OTP from "@/components/atoms/OTP";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Files = () => {
    const [otpCode, setOtpCode] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [otp, setOtp] = useState(['', '', '', ''])
    const router = useRouter();
    
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor;
            const isMobileDevice = /android|avd|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
            const isSmallScreen = window.innerWidth <= 768;
            setIsMobile(isMobileDevice || isSmallScreen);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleSubmit = () => {
        if (otp.some(digit => digit === '')) {
            toast.error('Please fill in all OTP fields');
            return;
        }
        
        router.push(`/files/${otpCode}`);
    };


    const toggleQRScanner = () => {
        setShowQRScanner(!showQRScanner);
    };
    
    return (
        <div className="min-h-[calc(100vh-67px)] flex items-center justify-center p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="rounded-2xl shadow-xl border-[1px] border-gray-600 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            Enter Access Code
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Please enter the 4-digit code to access the files
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <OTP length={4} onComplete={(code) => setOtpCode(code)} otp={otp} setOtp={setOtp} />
                        </div>

                        <Button 
                            onClick={handleSubmit}
                            disabled={otpCode.length !== 4}
                            size="lg"
                            className="w-full font-semibold h-12 text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {otpCode.length !== 4 ? 'Enter 4-digit code' : 'Access Files'}
                        </Button>

                        {isMobile && (
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">or</span>
                                </div>
                            </div>
                        )}

                        {isMobile && (
                            <Button 
                                onClick={toggleQRScanner}
                                variant="outline"
                                size="lg"
                                className="w-full h-12 text-base font-medium"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                                {showQRScanner ? 'Hide QR Scanner' : 'Scan QR Code'}
                            </Button>
                        )}

                        {showQRScanner && (
                            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                <div className="text-center text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    Position the QR code within the camera frame
                                </div>
                                <div id="qr-reader" className="w-full max-w-sm mx-auto"></div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Need help? Contact support for assistance
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Files;