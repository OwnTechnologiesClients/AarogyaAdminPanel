import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Helper to extract a user-friendly error message from Axios/fetch errors
export function getApiErrorMessage(error, fallbackMessage = 'Something went wrong. Please try again.') {
  if (!error) return fallbackMessage

  // Axios-style error with response from server
  const response = error.response
  if (response) {
    const data = response.data ?? {}

    // If backend returns plain string
    if (typeof data === 'string') {
      return data
    }

    // Common patterns: { message: '...' } or { error: '...' }
    if (typeof data.message === 'string' && data.message.trim()) {
      return data.message
    }
    if (typeof data.error === 'string' && data.error.trim()) {
      return data.error
    }

    // Validation errors array: { errors: [{ message, field } ...] } or similar
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const parts = data.errors
        .map((e) => {
          if (!e) return null
          if (typeof e === 'string') return e
          if (e.message && e.field) return `${e.field}: ${e.message}`
          return e.message || null
        })
        .filter(Boolean)

      if (parts.length > 0) {
        return parts.join('; ')
      }
    }

    // Fallback based on status code if no clear message
    if (response.status === 400) {
      return 'Some of the data you entered is not valid. Please review the fields and try again.'
    }
    if (response.status === 401) {
      return 'Your session has expired or is invalid. Please log in again.'
    }
    if (response.status === 403) {
      return 'You do not have permission to perform this action.'
    }
    if (response.status === 404) {
      return 'The requested resource was not found.'
    }
    if (response.status >= 500) {
      return 'The server encountered a problem. Please try again in a moment.'
    }
  }

  // Network error: request was made but no response received
  if (error.request && !error.response) {
    return 'Unable to reach the server. Please check your internet connection or try again later.'
  }

  // Standard JS Error with message
  if (typeof error.message === 'string' && error.message.trim()) {
    return error.message
  }

  return fallbackMessage
}
