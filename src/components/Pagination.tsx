import Link from 'next/link'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
  sortOrder: 'newest' | 'oldest'
}

export default function Pagination({ currentPage, totalPages, basePath, sortOrder }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // Always show first page
    pages.push(1)

    // Calculate start and end of visible pages
    let start = Math.max(2, currentPage - 1)
    let end = Math.min(totalPages - 1, currentPage + 1)

    // Adjust if we're near the start
    if (currentPage <= 2) {
      end = 4
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 1) {
      start = totalPages - 3
    }

    // Add ellipsis and pages
    if (start > 2) {
      pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 1) {
      pages.push('...')
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}&sort=${sortOrder}`}
          className="py-2"
        >
          Previous
        </Link>
      )}
      
      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-4 py-2">...</span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}&sort=${sortOrder}`}
            className={`py-2 ${
              currentPage === page ? 'underline underline-offset-4' : ''
            }`}
          >
            {page}
          </Link>
        )
      ))}

      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}&sort=${sortOrder}`}
          className="py-2"
        >
          Next
        </Link>
      )}
    </div>
  )
} 