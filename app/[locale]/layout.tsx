import '../globals.css'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { locales } from '@/i18n-config'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default function LocaleLayout({
  children,
}: LocaleLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
      <main className="pt-16 w-full h-full">
        {children}
      </main>
      <Footer />  
    </ThemeProvider>
  )
}