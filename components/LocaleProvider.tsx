'use client'

import { createContext, useContext } from 'react'

type LocaleContextType = {
  locale: string
}

const LocaleContext = createContext<LocaleContextType>({ locale: 'cs' })

export const useLocale = () => useContext(LocaleContext)

export default function LocaleProvider({ 
  children, 
  locale 
}: { 
  children: React.ReactNode
  locale: string 
}) {
  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  )
}