import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface MenuItem {
  path: string
  label: string
  icon: IconType
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, menuItems }) => {
  const location = useLocation();

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Menu */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50"
          >
            <div className="p-4">
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              <nav className="mt-8 space-y-2">
                {menuItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                              ${location.pathname === path
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                              }`}
                  >
                    <Icon 
                      size={20}
                      className={location.pathname === path
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                      }
                    />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
