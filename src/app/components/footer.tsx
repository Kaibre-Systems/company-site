import Link from "next/link"
import Image from "next/image"
import { ArrowUp, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-2 py-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Left: Logo + Address */}
          <div className="flex items-center gap-4">
            <Link href="/" className="home">
              <Image
                src="/full_logo_white.svg"
                alt="Kaibre Systems Logo"
                width={136}
                height={36}
                priority
              />
            </Link>
            <Link href='https://www.linkedin.com/company/kaibre-systems-limited/'>
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 50 50" 
                fill="white"
                >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
                </svg>
            </Link>
            <address className="not-italic text-xs text-gray-300 flex items-center gap-2 leading-snug max-w-[46ch]">
              <MapPin size={20} className="text-[#CD4813] shrink-0" />
              <span>
                SE45 05 Masdar City Incubator Building, Smart Station, First Floor, Abu Dhabi, AE
              </span>
            </address>
            
          </div>

          {/* Right: Copyright + Back to top */}
          <div className="flex items-center gap-4">
            <p className="text-gray-400 text-xs md:text-sm whitespace-nowrap">© 2025 Kaibre Systems Ltd.</p>
            <span className="hidden md:inline-block text-gray-700">|</span>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm flex items-center gap-1">
              Back to top
              <ArrowUp size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
