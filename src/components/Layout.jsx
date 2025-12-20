import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

function Layout({ children }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en'
    i18n.changeLanguage(newLang)
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background - Subtle Maksab Colors Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#E8F4F4] via-[#F5F0F0] to-[#F0E8E8]" />
      
      {/* Secondary Gradient Layer */}
      <div className="fixed inset-0 bg-gradient-to-tr from-[#1A8080]/[0.03] via-transparent to-[#C77B7B]/[0.03]" />
      
      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="glow-orb w-[800px] h-[800px] -top-[300px] -start-[300px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(26, 128, 128, 0.12) 0%, transparent 60%)',
            animationDelay: '0s' 
          }}
        />
        <div 
          className="glow-orb w-[700px] h-[700px] top-1/3 -end-[250px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(199, 123, 123, 0.12) 0%, transparent 60%)',
            animationDelay: '-10s' 
          }}
        />
        <div 
          className="glow-orb w-[500px] h-[500px] -bottom-[100px] start-1/4"
          style={{ 
            background: 'radial-gradient(circle, rgba(26, 128, 128, 0.08) 0%, transparent 60%)',
            animationDelay: '-5s' 
          }}
        />
        <div 
          className="glow-orb w-[400px] h-[400px] top-[60%] start-[60%]"
          style={{ 
            background: 'radial-gradient(circle, rgba(199, 123, 123, 0.06) 0%, transparent 60%)',
            animationDelay: '-15s' 
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gradient-to-r from-[#E8F4F4]/90 to-[#F0E8E8]/90 backdrop-blur-2xl border-b border-[#1A8080]/10 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Logo Container */}
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#1A8080] to-[#0D6666] flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg shadow-[#1A8080]/25">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-[#1A8080] tracking-tight">Maksab</span>
                <span className="text-[10px] text-[#1A8080]/50 uppercase tracking-[0.15em] -mt-0.5 font-medium">Live Platform</span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {/* Live Orders Link */}
              <Link
                to="/live"
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive('/live')
                    ? 'text-[#1A8080]'
                    : 'text-[#1A1A2E]/60 hover:text-[#1A8080]'
                }`}
              >
                {isActive('/live') && (
                  <span className="absolute inset-0 bg-[#1A8080]/10 rounded-xl border border-[#1A8080]/20" />
                )}
                <span className="relative flex items-center gap-2">
                  <div className="relative">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {isActive('/live') && (
                      <span className="absolute -top-0.5 -end-0.5 w-2 h-2 bg-[#1A8080] rounded-full">
                        <span className="absolute inset-0 bg-[#2A9A9A] rounded-full animate-ping" />
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">{t('nav.live')}</span>
                </span>
              </Link>

              {/* Draw Link */}
              <Link
                to="/draw"
                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  isActive('/draw')
                    ? 'text-[#1A8080]'
                    : 'text-[#1A1A2E]/60 hover:text-[#1A8080]'
                }`}
              >
                {isActive('/draw') && (
                  <span className="absolute inset-0 bg-[#1A8080]/10 rounded-xl border border-[#1A8080]/20" />
                )}
                <span className="relative flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span className="hidden sm:inline">{t('nav.draw')}</span>
                </span>
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-[#1A8080]/20 mx-2 sm:mx-3" />

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[#1A1A2E]/60 hover:text-[#1A8080] hover:bg-[#1A8080]/5 transition-all duration-300 text-sm font-medium"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="hidden sm:inline">{t('nav.language')}</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-16 sm:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1A8080]/10 py-8 mt-16 bg-gradient-to-r from-[#1A8080]/5 via-transparent to-[#C77B7B]/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1A8080] to-[#0D6666] flex items-center justify-center shadow-lg shadow-[#1A8080]/20">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-[#1A1A2E]/50 text-sm">
                © 2024 <span className="text-[#1A8080] font-medium">Maksab</span>. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#1A1A2E]/30 uppercase tracking-wider">Powered by Innovation</span>
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A8080]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#C77B7B]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2A9A9A]" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
