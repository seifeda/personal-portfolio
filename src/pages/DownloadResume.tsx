import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSpinner, FaDownload, FaExclamationTriangle } from 'react-icons/fa';
import { downloadResume } from '../services/resumeService';

const DownloadResume: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const handleDownload = async () => {
      if (!token) {
        setStatus('error');
        setError('Invalid download link');
        return;
      }

      try {
        const blob = await downloadResume(token);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'seife-bekele-resume.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Failed to download resume');
      }
    };

    handleDownload();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
    >
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {status === 'loading' && (
          <div className="space-y-4">
            <FaSpinner className="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 animate-spin" />
            <h2 className="text-2xl font-semibold">Downloading Resume...</h2>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we prepare your download.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <FaDownload className="w-12 h-12 mx-auto text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-semibold">Download Started!</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your download should begin automatically. If it doesn't,
              <button
                onClick={() => window.location.reload()}
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                click here
              </button>
              .
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <FaExclamationTriangle className="w-12 h-12 mx-auto text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-semibold">Download Failed</h2>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Homepage
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DownloadResume;
