import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCode, FaLaptopCode, FaServer, FaDatabase, FaGraduationCap, FaBriefcase,
  FaTrophy, FaBook, FaLightbulb, FaUserGraduate, FaCertificate, FaDownload
} from 'react-icons/fa'
import profilePic from '../../assets/images/profile-pic.jpg'
import ResumeDownloadModal from '../ui/ResumeDownloadModal'
import { requestResumeDownload } from '../../services/resumeService'

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: React.ElementType
}

interface Achievement {
  title: string
  description: string
  icon: React.ElementType
}

interface Project {
  title: string
  description: string
  technologies: string[]
  impact: string
  icon: React.ElementType
}

const timeline: TimelineItem[] = [
  {
    year: '2024',
    title: 'Principal Software Engineer',
    description: 'Leading enterprise-level applications development using Spring Boot and .NET Core at Wegagen Bank',
    icon: FaBriefcase
  },
  {
    year: '2023',
    title: 'Senior Software Engineer',
    description: 'Designed microservices and led development teams at Wegagen Bank',
    icon: FaServer
  },
  {
    year: '2022',
    title: 'Software Engineer',
    description: 'Developed secure RESTful APIs and optimized database performance at Wegagen Bank',
    icon: FaLaptopCode
  }
]

const keyHighlights = [
  {
    icon: FaCode,
    title: 'Full Stack Development',
    description: 'Expertise in Spring Boot, .NET Core, and modern web technologies'
  },
  {
    icon: FaServer,
    title: 'Backend Architecture',
    description: 'Specialized in microservices, RESTful APIs, and secure authentication'
  },
  {
    icon: FaDatabase,
    title: 'Database Management',
    description: 'Proficient in PostgreSQL, MySQL, SQL Server, and MongoDB'
  }
]

const achievements: Achievement[] = [
  {
    title: 'System Optimization',
    description: 'Reduced database query execution time by 30% and administrative processing time by 30%',
    icon: FaTrophy
  },
  {
    title: 'Technical Leadership',
    description: 'Led development teams and mentored junior engineers in best practices',
    icon: FaLightbulb
  },
  {
    title: 'Key Projects',
    description: 'Successfully delivered Core Banking API, HRIS, and Document Management System',
    icon: FaCertificate
  }
]

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Unity University',
    year: '2013',
    description: 'Specialized in Software Development and System Architecture',
    icon: FaGraduationCap
  }
]

const interests = [
  'AI & Cloud Computing',
  'Microservices Architecture',
  'System Performance',
  'DevOps & Automation',
  'Team Leadership'
]

const projects: Project[] = [
  {
    title: 'Core Banking System API Integration',
    description: 'Developed robust APIs using Spring Boot and .NET Core for seamless integration with core banking systems.',
    technologies: ['Spring Boot', '.NET Core', 'OAuth2', 'JWT'],
    impact: 'Enhanced system interoperability and security with modern authentication',
    icon: FaServer
  },
  {
    title: 'Web-based Attendance Management System',
    description: 'Comprehensive system for automating attendance tracking and monitoring.',
    technologies: ['React', 'Spring Boot', 'PostgreSQL'],
    impact: 'Reduced administrative time by 10 hours/week and error rates by 30%',
    icon: FaUserGraduate
  },
  {
    title: 'Document Management System (DMS)',
    description: 'Automated document verification workflows with advanced tracking capabilities.',
    technologies: ['.NET Core', 'SQL Server', 'React'],
    impact: 'Reduced manual effort by 50% in document processing',
    icon: FaBook
  },
  {
    title: 'HRIS for Wegagen Bank',
    description: 'Comprehensive HR Information System for managing employee data and processes.',
    technologies: ['Spring Boot', 'React', 'PostgreSQL'],
    impact: 'Improved data accuracy and reduced processing time by 30%',
    icon: FaBriefcase
  },
  {
    title: 'Lease Management System (IFRS 16)',
    description: 'Automated system for managing lease agreements and payment schedules.',
    technologies: ['.NET Core', 'React', 'SQL Server'],
    impact: 'Centralized lease management with automated tracking and renewals',
    icon: FaDatabase
  }
]

const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResumeRequest = async (email: string) => {
    try {
      await requestResumeDownload(email);
    } catch (error) {
      console.error('Error requesting resume:', error);
      throw error;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-12 space-y-20"
    >
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            Hello, I'm Seife Bekele Zemariam
          </h1>
          <h2 className="text-2xl text-blue-600 dark:text-blue-400 mb-6">
            Principal Software Engineer
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Experienced and results-driven Software Engineer specializing in backend development,
            microservices, and cloud computing. Skilled in Java, .NET Core, Spring Boot, and modern
            web technologies, with a passion for AI, DevOps, and scalable system design.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {['Java', 'C#', 'Spring Boot', '.NET Core', 'React', 'PostgreSQL'].map((tech) => (
              <span 
                key={tech}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                         px-4 py-2 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full
                     hover:bg-blue-700 transition-colors duration-300"
          >
            <FaDownload /> Download Resume
          </button>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex items-center justify-center px-4"
        >
          {/* Main image container */}
          <div className="group relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <img 
              src={profilePic}
              alt="Seife Bekele Zemariam" 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-500"
            />
            
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>

      {/* Key Highlights */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Highlights</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {keyHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <highlight.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Professional Timeline */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Professional Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full 
                            flex items-center justify-center">
                <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Achievements</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <achievement.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start gap-4">
                <project.icon className="w-10 h-10 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 
                                   px-2 py-1 rounded-md text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                    Impact: {project.impact}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-start gap-4">
                <edu.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">{edu.institution}</p>
                  <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{edu.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-center">Areas of Interest</h2>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            {interests.map((interest, index) => (
              <motion.div
                key={interest}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                         px-6 py-3 rounded-full text-lg font-medium hover:transform hover:scale-105 
                         transition-transform cursor-default"
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Let's Work Together</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full
                     hover:bg-blue-700 transition-colors duration-300"
          >
            Get in Touch
          </a>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                     px-8 py-3 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
          >
            <FaDownload /> Resume
          </button>
        </div>
      </motion.div>

      {/* Resume Download Modal */}
      <ResumeDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleResumeRequest}
      />
    </motion.div>
  )
}

export default About