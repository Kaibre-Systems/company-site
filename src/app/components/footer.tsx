import Link from "next/link"
import Image from "next/image"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Image
              src="/full_logo_white.svg"
              alt="Kaibre Systems Logo"
              width={150}
              height={100}
            />
          </div>
            </div>


        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 sm:mb-0">© 2025 Kaibre Systems Ltd. All rights reserved.</p>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1">
            Back to top
            <ArrowUp size={16} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
