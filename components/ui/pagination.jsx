import { ChevronLeft, ChevronRight } from "lucide-react"

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage,
  onItemsPerPageChange 
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1
  const endItem = totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 4
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i)
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
      }
    }
    
    return pages
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-900 font-medium">Displays</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
        >
          <option value={10}>10 Records Per Page</option>
          <option value={20}>20 Records Per Page</option>
          <option value={30}>30 Records Per Page</option>
          <option value={50}>50 Records Per Page</option>
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-900 font-medium">
          {totalItems === 0
            ? "Showing 0 of 0 results"
            : `Showing ${startItem} to ${endItem} of ${totalItems} results`}
        </span>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-900 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 hover:text-gray-900"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 