import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-white">⚽</span>
            </div>
            <span className="text-xl font-bold text-white">Tiki Taka</span>
          </Link>
          
                     <nav className="hidden md:flex items-center space-x-8">
             <Link href="/" className="text-green-100 hover:text-white transition-colors">
               Home
             </Link>
             <Link href="/roadmap" className="text-green-100 hover:text-white transition-colors">
               Roadmap
             </Link>
             <Link href="/admin" className="text-green-100 hover:text-white transition-colors">
               Admin
             </Link>
             <Link 
               href="/dashboard" 
               className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300"
             >
               Preview
             </Link>
           </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-green-100 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
