# Reusable Pagination Component

This directory contains reusable UI components including a pagination component that can be used across all pages in the application.

## Pagination Component

The `Pagination` component provides a complete pagination solution with the following features:

- Page navigation with previous/next buttons
- Page number display with smart truncation
- Items per page selection
- Results count display
- Responsive design

### Usage

```jsx
import { Pagination } from "@/components/ui/pagination"
import { usePagination } from "@/lib/hooks/usePagination"

function MyListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Filter your data
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Use the pagination hook
  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    currentItems,
    handlePageChange,
    handleItemsPerPageChange,
    resetPagination
  } = usePagination(filteredData, 10)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    resetPagination() // Reset to first page when searching
  }

  return (
    <div>
      {/* Your table or list */}
      <table>
        {/* ... table content using currentItems ... */}
      </table>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  )
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | number | Current active page |
| `totalPages` | number | Total number of pages |
| `onPageChange` | function | Callback when page changes |
| `totalItems` | number | Total number of items |
| `itemsPerPage` | number | Number of items per page |
| `onItemsPerPageChange` | function | Callback when items per page changes |

### usePagination Hook

The `usePagination` hook provides all the pagination logic:

```jsx
const {
  currentPage,           // Current page number
  totalPages,           // Total number of pages
  totalItems,           // Total number of items
  itemsPerPage,         // Items per page
  currentItems,         // Items for current page
  startIndex,           // Start index of current page
  endIndex,             // End index of current page
  handlePageChange,     // Function to change page
  handleItemsPerPageChange, // Function to change items per page
  resetPagination       // Function to reset to first page
} = usePagination(data, initialItemsPerPage)
```

### Features

1. **Smart Page Display**: Shows up to 4 page numbers with smart truncation
2. **Items Per Page**: Dropdown to select 8, 16, 24, or 32 items per page
3. **Results Count**: Shows "Showing X to Y of Z results"
4. **Responsive**: Works on all screen sizes
5. **Accessible**: Proper ARIA labels and keyboard navigation
6. **Consistent Styling**: Matches the application's design system

### Examples

See the following pages for complete examples:
- `app/doctors/list/page.js` - Doctors list with pagination
- `app/treatment/list/page.js` - Treatments list with pagination

### Customization

The component uses Tailwind CSS classes and can be customized by modifying the component file. The styling matches the application's design system with blue accent colors and proper hover states. 