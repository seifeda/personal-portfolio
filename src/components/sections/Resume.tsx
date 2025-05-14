import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaEnvelope } from 'react-icons/fa'

const Resume: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address')
      return
    }

    try {
      // In a real-world scenario, you'd integrate with a backend service
      // This is a placeholder for demonstration
      const response = await fetch('/api/request-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsModalOpen(true)
        // Optionally trigger resume download
        window.open('/resume.pdf', '_blank')
      } else {
        alert('Failed to process your request. Please try again.')
      }
    } catch (error) {
      console.error('Download error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Resume</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <form onSubmit={handleDownload} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Enter your email to download resume
            </label>
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button 
                type="submit"
                className="ml-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div 
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center"
          >
            <h2 className="text-xl font-bold mb-4">Resume Requested</h2>
            <p className="mb-4">
              A copy of the resume has been sent to {email}. 
              The download should start shortly.
            </p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default Resume