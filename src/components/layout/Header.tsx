import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaBars, 
  FaHome, 
  FaCode, 
  FaFileAlt, 
  FaEnvelope 
} from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'
import MobileMenu from './MobileMenu'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/', label: 'About', icon: FaHome },
    { path: '/projects', label: 'Projects', icon: FaCode },
    { path: '/resume', label: 'Resume', icon: FaFileAlt },
    { path: '/contact', label: 'Contact', icon: FaEnvelope }
  ];

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: 0,
          backgroundColor: isScrolled ? 'var(--header-bg-scrolled)' : 'var(--header-bg)',
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                  ${isScrolled ? 'shadow-md backdrop-blur-sm bg-white/90 dark:bg-gray-800/90' : 
                                'bg-white dark:bg-gray-800'}`}
      >
        <nav className="flex justify-between items-center container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className={`text-xl font-bold transition-colors duration-300
                      ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-gray-800 dark:text-white'}`}
          >
            Seife Bekele Zemariam
          </Link>
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {menuItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative px-2 py-1 text-sm font-medium transition-colors duration-300 flex items-center space-x-2
                            ${isActiveLink(path) 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                  {isActiveLink(path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <FaBars className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={menuItems}
      />
    </>
  )
}

export default Header