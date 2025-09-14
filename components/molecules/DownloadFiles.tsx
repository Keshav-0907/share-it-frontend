import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const DownloadFiles = () => {
    return (
        <Link href="/files" className="border-[1px] border-[#40AB74] text-white text-sm cursor-pointer hover:text-white transition-all duration-200 px-4 py-1 rounded-lg">
            Have the code ? <span className="text-[#40AB74]">Download Files</span>
        </Link>
    )
}

export default DownloadFiles