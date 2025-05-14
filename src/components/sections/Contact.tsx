import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { sendContactMessage } from '../../services/contactService'
import ReCAPTCHA from "react-google-recaptcha"

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const recaptchaToken = recaptchaRef.current?.getValue()
    if (!recaptchaToken) {
      setStatus('error')
      setErrorMessage('Please complete the reCAPTCHA')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      await sendContactMessage({ ...formData, recaptchaToken })
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      recaptchaRef.current?.reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message')
    }
  }

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/seifeda', icon: FaGithub },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/seife-bekele', icon: FaLinkedin },
    { name: 'Email', url: 'mailto:Seifebekele07@gmail.com', icon: FaEnvelope }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto py-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Me</h1>
      
      {/* Social Links */}
      <div className="flex justify-center space-x-6 mb-8">
        {socialLinks.map(({ name, url, icon: Icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <Icon className="w-6 h-6" />
            <span className="sr-only">{name}</span>
          </a>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                dark:placeholder-gray-400 placeholder-gray-500
                text-sm py-2 px-3"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                dark:placeholder-gray-400 placeholder-gray-500
                text-sm py-2 px-3"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 
                dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                dark:placeholder-gray-400 placeholder-gray-500
                text-sm py-2 px-3"
            />
          </div>

          <div className="flex flex-col items-center space-y-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              theme="dark"
              size="compact"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full flex justify-center items-center space-x-2 py-2 px-4 rounded-md text-sm font-medium 
                text-white bg-blue-600 hover:bg-blue-700 
                dark:bg-blue-700 dark:hover:bg-blue-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-colors duration-300
                ${status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <FaPaperPlane className={`w-4 h-4 ${status === 'loading' ? 'animate-bounce' : ''}`} />
              <span>{status === 'loading' ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 dark:text-green-400 text-center text-sm mt-4"
          >
            Message sent successfully!
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 dark:text-red-400 text-center text-sm mt-4"
          >
            {errorMessage}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Contact