import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

function Layout({ children }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Maksab Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#F26F59] via-[#E85A45] to-[#25B0BA]" />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orb - Coral */}
        <div 
          className="floating-orb w-[1000px] h-[1000px] -top-[400px] -left-[300px] opacity-60"
          style={{ 
            background: 'radial-gradient(circle, rgba(242, 111, 89, 0.5) 0%, rgba(232, 90, 69, 0.25) 40%, transparent 70%)',
          }}
        />
        {/* Secondary gradient orb - Teal */}
        <div 
          className="floating-orb w-[800px] h-[800px] top-1/2 -right-[300px] opacity-55"
          style={{ 
            background: 'radial-gradient(circle, rgba(37, 176, 186, 0.5) 0%, rgba(29, 144, 153, 0.25) 40%, transparent 70%)',
            animationDelay: '-4s'
          }}
        />
        {/* Accent orb - Mixed */}
        <div 
          className="floating-orb w-[700px] h-[700px] -bottom-[250px] left-1/3 opacity-50"
          style={{ 
            background: 'radial-gradient(circle, rgba(77, 216, 224, 0.4) 0%, rgba(255, 176, 136, 0.2) 40%, transparent 70%)',
            animationDelay: '-2s'
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        
        {/* Diagonal Light Streak */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(135deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/15 backdrop-blur-2xl border-b-2 border-white/30 shadow-xl shadow-black/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-white rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500 scale-150" />
                
                {/* Logo icon */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/25 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-black/15">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-lg">Maksab</span>
                <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] -mt-0.5 font-medium">Live Platform</span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Live Orders Link */}
              <Link
                to="/live"
                className={`relative px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 group ${
                  isActive('/live')
                    ? 'text-[#F26F59]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {isActive('/live') && (
                  <span className="absolute inset-0 bg-white rounded-xl shadow-xl shadow-black/15 border border-white/50" />
                )}
                <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  !isActive('/live') ? 'bg-white/0 group-hover:bg-white/15 group-hover:border group-hover:border-white/30' : ''
                }`} />
                <span className="relative flex items-center gap-2">
                  <div className="relative">
                    <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {isActive('/live') && (
                      <span className="absolute -top-0.5 -end-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50">
                        <span className="absolute inset-0 bg-emerald-400 rounded-full animate-ping" />
                      </span>
                    )}
                  </div>
                  <span className="hidden sm:inline">{t('nav.live')}</span>
                </span>
              </Link>

              {/* Draw Link */}
              <Link
                to="/draw"
                className={`relative px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 group ${
                  isActive('/draw')
                    ? 'text-[#25B0BA]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {isActive('/draw') && (
                  <span className="absolute inset-0 bg-white rounded-xl shadow-xl shadow-black/15 border border-white/50" />
                )}
                <span className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  !isActive('/draw') ? 'bg-white/0 group-hover:bg-white/15 group-hover:border group-hover:border-white/30' : ''
                }`} />
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span className="hidden sm:inline">{t('nav.draw')}</span>
                </span>
              </Link>

              {/* Divider */}
              <div className="w-px h-8 bg-white/40 mx-2 sm:mx-3" />

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="relative px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-white/90 hover:text-white transition-all duration-300 text-sm sm:text-base font-semibold overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/15 rounded-xl transition-all duration-300 border border-transparent group-hover:border-white/30" />
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span>{t('nav.language')}</span>
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
      <footer className="relative z-10 border-t-2 border-white/30 py-8 mt-16 backdrop-blur-2xl bg-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/25 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-lg shadow-black/10">
                <svg className="w-5 h-5 text-white drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white/90 text-sm font-medium">
                © 2024 <span className="text-white font-bold">Maksab</span>. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/60 uppercase tracking-wider font-medium">Powered by Innovation</span>
              <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-2 h-2 rounded-full"
                    style={{ 
                      background: i === 0 ? '#F26F59' : i === 1 ? '#FFB088' : '#25B0BA',
                      opacity: 0.7 + (i * 0.15),
                      boxShadow: `0 2px 8px ${i === 0 ? 'rgba(242, 111, 89, 0.5)' : i === 1 ? 'rgba(255, 176, 136, 0.5)' : 'rgba(37, 176, 186, 0.5)'}`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
