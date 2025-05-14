import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNode, FaJava } from 'react-icons/fa';
import { SiDotnet, SiSpringboot, SiTypescript, SiMongodb, SiPostgresql } from 'react-icons/si';

interface Skill {
  name: string;
  icon: React.ElementType;
  proficiency: number;
  category: 'Frontend' | 'Backend' | 'Database' | 'Other';
  color: string;
}

const skillsData: Skill[] = [
  {
    name: 'React',
    icon: FaReact,
    proficiency: 90,
    category: 'Frontend',
    color: '#61DAFB'
  },
  {
    name: 'ASP.NET',
    icon: SiDotnet,
    proficiency: 85,
    category: 'Backend',
    color: '#512BD4'
  },
  {
    name: 'Java',
    icon: FaJava,
    proficiency: 85,
    category: 'Backend',
    color: '#007396'
  },
  {
    name: 'Spring Boot',
    icon: SiSpringboot,
    proficiency: 80,
    category: 'Backend',
    color: '#6DB33F'
  },
  {
    name: 'Node.js',
    icon: FaNode,
    proficiency: 85,
    category: 'Backend',
    color: '#339933'
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    proficiency: 85,
    category: 'Frontend',
    color: '#3178C6'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    proficiency: 80,
    category: 'Database',
    color: '#47A248'
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    proficiency: 75,
    category: 'Database',
    color: '#336791'
  }
];

const Skills: React.FC = () => {
  const categories = ['Frontend', 'Backend', 'Database', 'Other'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h1>
      
      <div className="space-y-8">
        {categories.map(category => {
          const categorySkills = skillsData.filter(skill => skill.category === category);
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {categorySkills.map(skill => (
                  <motion.div
                    key={skill.name}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <skill.icon className="w-6 h-6 mr-2" style={{ color: skill.color }} />
                      <h3 className="font-medium">{skill.name}</h3>
                    </div>
                    <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {skill.proficiency}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Skills;