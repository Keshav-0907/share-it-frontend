'use client'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '../ui/input'
import { Copy, Download } from 'lucide-react'
import toast from 'react-hot-toast'

const ShareFileGroup = ({ code }: { code: string }) => {

    const [qrCode, setQrCode] = useState<string>('')
    const [copied, setCopied] = useState(false)

    console.log('copied', copied)

    const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL}/files/${code}`

    useEffect(() => {
        QRCode.toDataURL(fullUrl, {
            width: 200,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            errorCorrectionLevel: 'M'
        })
            .then(url => {
                console.log(url)
                setQrCode(url)
            })
            .catch(err => {
                console.error(err)
            })
    }, [fullUrl])

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl)
            setCopied(true)
            toast.success('Copied to clipboard')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const downloadQRCode = () => {
        if (!qrCode) return
        
        const link = document.createElement('a')
        link.href = qrCode
        link.download = `qr-code-${code}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('QR code downloaded')
    }

    return (
        <div className='bg-card border border-border shadow-lg rounded-xl p-8 flex flex-col items-center justify-center gap-6 max-w-md mx-auto'>
            <div className='text-center space-y-2'>
                <h3 className='text-xl font-semibold text-foreground'>Share the Files</h3>
                <p className='text-muted-foreground text-sm'>Scan the QR code or use the link below</p>
            </div>
            
            <div className='bg-white p-4 rounded-lg shadow-sm border relative'>
                {
                    qrCode && (
                        <Image src={qrCode} alt="QR Code" width={200} height={200} className='rounded-md' />
                    )
                }
                <button 
                    onClick={downloadQRCode}
                    className='absolute top-2 right-2 bg-black/70 hover:bg-black/90 text-white p-2 rounded-md transition-colors'
                    title="Download QR Code"
                >
                    <Download size={16} />
                </button>
            </div>

            <div className='bg-muted px-6 py-3 rounded-lg'>
                <div className='text-center'>
                    <p className='text-sm text-muted-foreground mb-1'>Access Code</p>
                    <p className='text-3xl font-mono font-bold text-foreground tracking-wider'>{code}</p>
                </div>
            </div>

            <div className='w-full space-y-3'>
                <p className='text-sm font-medium text-foreground'>Share Link</p>
                <div className='flex gap-2'>
                    <Input 
                        value={fullUrl} 
                        readOnly 
                        className='text-xs font-mono bg-muted/50'
                    />
                   <div onClick={copyToClipboard} className='cursor-pointer bg-muted/50 p-2 rounded-md border-[1px] border-gray-600'>
                    <Copy size={16}/>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default ShareFileGroup;