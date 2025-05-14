import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSpinner } from 'react-icons/fa';

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void>;
}

const ResumeDownloadModal: React.FC<ResumeDownloadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await onSubmit(email);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to send download link. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50"
          >
            <div className="p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 
                         dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes />
              </button>

              <h2 className="text-2xl font-semibold mb-4">Download Resume</h2>
              
              {!success ? (
                <>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Please enter your email address to receive the resume download link.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 
                                dark:border-gray-600 dark:bg-gray-700 focus:ring-2 
                                focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm mb-4">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg
                               hover:bg-blue-700 transition-colors duration-300 
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaSpinner className="animate-spin" /> Sending...
                        </span>
                      ) : (
                        'Send Download Link'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-green-600 dark:text-green-400 mb-4">
                    Success! Please check your email for the download link.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                             py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600
                             transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumeDownloadModal;
