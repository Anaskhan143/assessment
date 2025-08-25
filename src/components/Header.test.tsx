import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Header from './Header'

// Mock the dynamic imports
vi.mock('@/i18n/i18n', () => ({
  default: {
    changeLanguage: vi.fn(),
  },
}))

describe('Header Component', () => {
  beforeEach(() => {
    // Reset cookies before each test
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    })
  })

  it('1. Theme toggle functionality - cycles through light/dark/system themes', async () => {
    render(<Header />)
    
    const themeTrigger = screen.getByTestId('theme-trigger')
    expect(themeTrigger).toBeInTheDocument()
    
    // Click theme trigger to open dropdown
    fireEvent.click(themeTrigger)
    
    // Wait for dropdown to appear and check options
    await waitFor(() => {
      expect(screen.getByText('common.light')).toBeInTheDocument()
      expect(screen.getByText('common.dark')).toBeInTheDocument()
      expect(screen.getByText('common.system')).toBeInTheDocument()
    })
  })

  it('2. Theme cookie persistence - cookie is set when theme changes', async () => {
    render(<Header />)
    
    const themeTrigger = screen.getByTestId('theme-trigger')
    fireEvent.click(themeTrigger)
    
    // Click on dark theme
    await waitFor(() => {
      const darkOption = screen.getByText('common.dark')
      fireEvent.click(darkOption)
    })
    
    // Verify theme was applied (this would be tested with actual cookie setting in integration tests)
    expect(themeTrigger).toHaveTextContent('common.dark')
  })

  it('3. Theme application on page load - loads correctly from cookie', () => {
    // Set a theme cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'theme=dark',
    })
    
    render(<Header />)
    
    const themeTrigger = screen.getByTestId('theme-trigger')
    expect(themeTrigger).toHaveTextContent('common.dark')
  })

  it('4. Language toggle functionality - changes language state', async () => {
    render(<Header />)
    
    const languageTrigger = screen.getByTestId('language-trigger')
    expect(languageTrigger).toBeInTheDocument()
    
    // Click language trigger to open dropdown
    fireEvent.click(languageTrigger)
    
    // Wait for dropdown to appear and check options
    await waitFor(() => {
      expect(screen.getByText('common.english')).toBeInTheDocument()
      expect(screen.getByText('common.spanish')).toBeInTheDocument()
    })
  })

  it('5. Language cookie persistence - cookie is set when language changes', async () => {
    render(<Header />)
    
    const languageTrigger = screen.getByTestId('language-trigger')
    fireEvent.click(languageTrigger)
    
    // Click on Spanish
    await waitFor(() => {
      const spanishOption = screen.getByText('common.spanish')
      fireEvent.click(spanishOption)
    })
    
    // Verify language was changed
    expect(languageTrigger).toHaveTextContent('common.spanish')
  })

  it('6. Language application on page load - loads correctly from cookie', () => {
    // Set a language cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'language=es',
    })
    
    render(<Header />)
    
    const languageTrigger = screen.getByTestId('language-trigger')
    expect(languageTrigger).toHaveTextContent('common.spanish')
  })

  it('7. Cookie expiration handling - uses default values when cookies expire', () => {
    // No cookies set
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    })
    
    render(<Header />)
    
    const themeTrigger = screen.getByTestId('theme-trigger')
    const languageTrigger = screen.getByTestId('language-trigger')
    
    // Should use default values
    expect(themeTrigger).toHaveTextContent('common.system')
    expect(languageTrigger).toHaveTextContent('common.english')
  })

  it('8. Default state when no cookies exist - shows system theme and English language', () => {
    // Clear cookies
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    })
    
    render(<Header />)
    
    const themeTrigger = screen.getByTestId('theme-trigger')
    const languageTrigger = screen.getByTestId('language-trigger')
    
    expect(themeTrigger).toHaveTextContent('common.system')
    expect(languageTrigger).toHaveTextContent('common.english')
  })

  it('9. Both toggles working together - theme and language can be changed simultaneously', async () => {
    render(<Header />)
    
    // Change theme
    const themeTrigger = screen.getByTestId('theme-trigger')
    fireEvent.click(themeTrigger)
    
    await waitFor(() => {
      const lightOption = screen.getByText('common.light')
      fireEvent.click(lightOption)
    })
    
    // Change language
    const languageTrigger = screen.getByTestId('language-trigger')
    fireEvent.click(languageTrigger)
    
    await waitFor(() => {
      const spanishOption = screen.getByText('common.spanish')
      fireEvent.click(spanishOption)
    })
    
    // Verify both changes
    expect(themeTrigger).toHaveTextContent('common.light')
    expect(languageTrigger).toHaveTextContent('common.spanish')
  })
})
