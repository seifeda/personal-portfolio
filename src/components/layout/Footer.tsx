import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-700 p-4 text-center">
      <div className="container mx-auto">
        © {new Date().getFullYear()} Seife Bekele Zemariam. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer