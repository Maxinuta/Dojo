'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { FiSun, FiMoon, FiGlobe } from 'react-icons/fi'
import { locales } from '@/i18n-config'


const CzechFlag = () => (
  <svg width="24" height="16" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="300" fill="#ffffff" />
    <rect width="900" height="300" y="300" fill="#d7141a" />
    <path d="M 0,0 L 450,300 L 0,600 z" fill="#11457e" />
  </svg>
);

const USAFlag = () => (
  <svg width="24" height="16" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
    <rect width="900" height="600" fill="#ffffff" />
    <g fill="#d80027">
      <rect width="900" height="46" y="69" />
      <rect width="900" height="46" y="161" />
      <rect width="900" height="46" y="253" />
      <rect width="900" height="46" y="345" />
      <rect width="900" height="46" y="437" />
      <rect width="900" height="46" y="529" />
    </g>
    <rect width="360" height="322" fill="#2e3560" />
    <g fill="#ffffff">
      <circle cx="60" cy="45" r="15" />
      <circle cx="120" cy="45" r="15" />
      <circle cx="180" cy="45" r="15" />
      <circle cx="240" cy="45" r="15" />
      <circle cx="300" cy="45" r="15" />
      <circle cx="90" cy="90" r="15" />
      <circle cx="150" cy="90" r="15" />
      <circle cx="210" cy="90" r="15" />
      <circle cx="270" cy="90" r="15" />
      <circle cx="60" cy="135" r="15" />
      <circle cx="120" cy="135" r="15" />
      <circle cx="180" cy="135" r="15" />
      <circle cx="240" cy="135" r="15" />
      <circle cx="300" cy="135" r="15" />
      <circle cx="90" cy="180" r="15" />
      <circle cx="150" cy="180" r="15" />
      <circle cx="210" cy="180" r="15" />
      <circle cx="270" cy="180" r="15" />
    </g>
  </svg>
);

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as string) || 'cs'

  const switchLocale = (newLocale: string) => {
    const pathSegments = pathname.split('/')
    pathSegments[1] = newLocale
    const newPath = pathSegments.join('/')
    window.location.href = newPath
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <header className="fixed w-full z-10 backdrop-blur-md bg-surface-light/50 dark:bg-surface-dark/50 transition-colors duration-300"> 
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-2xl font-bold text-content-dark dark:text-content-light">
          #TB
        </Link>

        <div className="flex items-center space-x-2">
          {/* Lang toggle*/}
          <div className="flex items-center">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="p-2 rounded-full bg-panel-light dark:bg-panel-dark text-content-dark dark:text-content-light hover:bg-primary hover:text-white transition-colors"
              aria-label="Vybrat jazyk"
            >
              <FiGlobe size={20} />
            </button>
            
            {/* container pro flagy */}
            <div className={`
              flex items-center transform transition-all duration-300 ease-in-out overflow-hidden
              ${isLanguageMenuOpen ? 'w-[100px] ml-2 opacity-100' : 'w-0 opacity-0'}
            `}>
              {locales.map((lang, index) => (
                <button
                  key={lang}
                  onClick={() => {
                    switchLocale(lang);
                    setIsLanguageMenuOpen(false);
                  }}
                  className={`
                    p-2 rounded-full flex items-center justify-center
                    bg-panel-light dark:bg-panel-dark 
                    text-content-dark dark:text-content-light 
                    hover:bg-primary hover:text-white transition-all
                    ${index === 0 ? 'mr-2' : ''}
                    ${locale === lang ? 'ring-2 ring-primary' : ''}
                  `}
                  style={{
                    opacity: isLanguageMenuOpen ? 1 : 0,
                    transform: isLanguageMenuOpen ? 'scale(1)' : 'scale(0.8)',
                    transitionDelay: isLanguageMenuOpen ? `${index * 100}ms` : '0ms'
                  }}
                  aria-label={lang === 'cs' ? 'Čeština' : 'English'}
                >
                  {lang === 'cs' ? <CzechFlag /> : <USAFlag />}
                </button>
              ))}
            </div>
          </div>

          {/* Téma toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-panel-light dark:bg-panel-dark text-content-dark dark:text-content-light hover:bg-primary hover:text-white transition-colors"
            aria-label={locale === 'cs' ? 'Přepnout motiv' : 'Toggle theme'}
          >
            {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header