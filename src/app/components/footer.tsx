import Link from "next/link"
import Image from "next/image"
import { ArrowUp, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-6">
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
            <address className="not-italic text-sm text-gray-300 flex items-center gap-2 leading-snug max-w-[46ch]">
              <MapPin size={14} className="text-[#CD4813] shrink-0" />
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
