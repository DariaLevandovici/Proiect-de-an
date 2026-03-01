import { Search, ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [cartCount] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h1 className="text-2xl font-bold text-white">GastroFlow</h1>
            </div>
            
            {/* Cart */}
            <button className="relative p-2 hover:bg-gray-800 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Central Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#reservation" className="text-gray-300 hover:text-white transition-colors">
              Reservation
            </a>
            <a href="#order" className="text-gray-300 hover:text-white transition-colors">
              Order
            </a>
            <a href="#menu" className="text-gray-300 hover:text-white transition-colors">
              Meniu
            </a>
            <a href="#career" className="text-gray-300 hover:text-white transition-colors">
              Career
            </a>
          </nav>

          {/* Right Side - Search & Login */}
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-800 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search dishes..."
                className="bg-transparent text-sm text-white placeholder-gray-500 outline-none w-full"
              />
            </div>

            {/* Login Button */}
            <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors">
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
