import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import About from '../sections/AboutMe'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'
import Resume from '../sections/Resume'
import DownloadResume from '../../pages/DownloadResume'

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 pt-20">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/download-resume/:token" element={<DownloadResume />} />
        </Routes>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout