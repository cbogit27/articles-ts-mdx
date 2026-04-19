"use client"

import { HTMLAttributes } from 'react'

const PageWrapper = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="page-container">
      <div
        {...props}
        className={`w-full min-h-screen bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 ${className}`}
      >
        {children}
      </div>
    </div>
  )
}

export default PageWrapper
