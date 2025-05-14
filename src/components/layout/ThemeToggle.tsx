import React, { useState, useEffect } from 'react'

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDarkMode(false)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle