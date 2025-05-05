"use client"

import { HTMLMotionProps, motion } from 'framer-motion'
import { useEffect } from 'react'

const PageWrapper = ({ children, ...props }: HTMLMotionProps<'div'>) => {
  // Function to handle page exit animations
  useEffect(() => {
    // Clean up any previous animations
    return () => {
      document.documentElement.classList.remove('animating')
    }
  }, [])

  return (
    <div className="page-container">
      <motion.div
        {...props}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.5
        }}
        className="w-full min-h-screen bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default PageWrapper