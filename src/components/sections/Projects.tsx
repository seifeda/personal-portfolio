import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: {
    name: string
    category: 'Frontend' | 'Backend' | 'Database' | 'DevOps'
  }[]
  githubLink: string
  demoLink: string
  imageUrl?: string
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'Other'
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application with payment integration',
    longDescription: 'A comprehensive e-commerce platform built with React and Spring Boot. Features include user authentication, product management, shopping cart, payment processing with Stripe, and order tracking.',
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'Spring Boot', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Stripe API', category: 'Backend' }
    ],
    githubLink: 'https://github.com/yourusername/ecommerce-platform',
    demoLink: 'https://myecommerce.com',
    imageUrl: '/projects/ecommerce.png',
    category: 'Full Stack'
  },
  {
    id: 2,
    title: 'Task Management System',
    description: 'Enterprise task management system with real-time updates',
    longDescription: 'A robust task management system built with ASP.NET Core and React. Includes features like real-time notifications, task assignment, progress tracking, and detailed reporting.',
    technologies: [
      { name: 'React', category: 'Frontend' },
      { name: 'ASP.NET Core', category: 'Backend' },
      { name: 'SQL Server', category: 'Database' },
      { name: 'SignalR', category: 'Backend' }
    ],
    githubLink: 'https://github.com/yourusername/task-management',
    demoLink: 'https://mytaskmanager.com',
    imageUrl: '/projects/taskmanager.png',
    category: 'Full Stack'
  }
]

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'Other']

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(project => project.category === selectedCategory)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Projects</h1>
      
      {/* Category Filter */}
      <div className="flex justify-center mb-8 space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div 
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {project.imageUrl && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">{project.longDescription}</p>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Tech Stack:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span 
                        key={`${project.id}-${tech.name}`}
                        className={`px-3 py-1 rounded-full text-sm ${
                          tech.category === 'Frontend'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : tech.category === 'Backend'
                            ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        }`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex justify-between mt-4">
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FaGithub className="mr-2" /> Source Code
                  </a>
                  <a 
                    href={project.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Projects