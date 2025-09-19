import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AccreditPro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/naac" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              NAAC
            </Link>
            <Link to="/nba" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              NBA
            </Link>
            <Link to="/nirf" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              NIRF
            </Link>
            <Link to="/precheck" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Pre Check Tool
            </Link>
            <Button asChild>
              <Link to="/request-demo">Request Demo</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/naac" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                NAAC
              </Link>
              <Link 
                to="/nba" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                NBA
              </Link>
              <Link 
                to="/nirf" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                NIRF
              </Link>
              <Link 
                to="/precheck" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Pre Check Tool
              </Link>
              <Button asChild className="mx-2 mt-2">
                <Link to="/request-demo" onClick={() => setIsMenuOpen(false)}>
                  Request Demo
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}