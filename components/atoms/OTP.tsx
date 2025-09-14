'use client'

import { useRef, useEffect } from 'react'

const OTP = ({ onComplete, length = 4, otp, setOtp }: { onComplete: (otp: string) => void, length: number, otp: string[], setOtp: (otp: string[]) => void }) => {
    
    const input0Ref = useRef<HTMLInputElement>(null)
    const input1Ref = useRef<HTMLInputElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)
    const input3Ref = useRef<HTMLInputElement>(null)
    const inputRefs = [input0Ref, input1Ref, input2Ref, input3Ref]

    useEffect(() => {
        if (input0Ref.current) {
            input0Ref.current.focus()
        }
    }, [])

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value)) && value !== '') return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value !== '' && index < 3) {
            const nextRef = inputRefs[index + 1]
            if (nextRef && nextRef.current) {
                nextRef.current.focus()
            }
        }

        if (value !== '' && index === 3) {
            const otpString = newOtp.join('')
            if (onComplete) {
                onComplete(otpString)
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '' && index > 0) {
                const prevRef = inputRefs[index - 1]
                if (prevRef && prevRef.current) {
                    prevRef.current.focus()
                }
            } else {
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            const prevRef = inputRefs[index - 1]
            if (prevRef && prevRef.current) {
                prevRef.current.focus()
            }
        } else if (e.key === 'ArrowRight' && index < 3) {
            const nextRef = inputRefs[index + 1]
            if (nextRef && nextRef.current) {
                nextRef.current.focus()
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData('text').slice(0, 4)
        const pastedArray = pastedData.split('')
        
        if (pastedArray.every((char: string) => !isNaN(Number(char)) && char !== '')) {
            const newOtp = ['', '', '', '']
            pastedArray.forEach((char: string, i: number) => {
                if (i < 4) newOtp[i] = char
            })
            setOtp(newOtp)
            
            const nextIndex = Math.min(pastedArray.length, 3)
            const nextRef = inputRefs[nextIndex]
            if (nextRef && nextRef.current) {
                nextRef.current.focus()
            }
            
            if (pastedArray.length === 4 && onComplete) {
                onComplete(pastedData)
            }
        }
    }

    return (
        <div className="flex gap-2 justify-center items-center">
            {otp.map((data, index) => (
                <input
                    key={index}
                    ref={inputRefs[index]}
                    className="w-16 h-16 border-[1px] border-gray-300 rounded-lg text-center text-2xl font-semibold focus:border-[#40AB74] focus:outline-none transition-colors"
                    type="text"
                    name="otp"
                    maxLength={1}
                    value={data}
                    onChange={e => handleChange(e.target.value, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={e => handlePaste(e, index)}
                    onFocus={e => e.target.select()}
                />
            ))}
        </div>
    )
}

export default OTP