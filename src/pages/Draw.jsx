import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// Dummy participants data
const participantsData = [
  { id: 1, name: { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' }, orderId: 'ORD-01234' },
  { id: 2, name: { en: 'Sara Mohammad', ar: 'سارة محمد' }, orderId: 'ORD-01235' },
  { id: 3, name: { en: 'Khalid Ibrahim', ar: 'خالد إبراهيم' }, orderId: 'ORD-01236' },
  { id: 4, name: { en: 'Fatima Hassan', ar: 'فاطمة حسن' }, orderId: 'ORD-01237' },
  { id: 5, name: { en: 'Omar Abdullah', ar: 'عمر عبدالله' }, orderId: 'ORD-01238' },
  { id: 6, name: { en: 'Layla Ahmed', ar: 'ليلى أحمد' }, orderId: 'ORD-01239' },
  { id: 7, name: { en: 'Yusuf Ali', ar: 'يوسف علي' }, orderId: 'ORD-01240' },
  { id: 8, name: { en: 'Noor Salem', ar: 'نور سالم' }, orderId: 'ORD-01241' },
  { id: 9, name: { en: 'Rania Khalil', ar: 'رانيا خليل' }, orderId: 'ORD-01242' },
  { id: 10, name: { en: 'Tariq Mansour', ar: 'طارق منصور' }, orderId: 'ORD-01243' },
  { id: 11, name: { en: 'Hana Yousef', ar: 'هنا يوسف' }, orderId: 'ORD-01244' },
  { id: 12, name: { en: 'Zaid Nasser', ar: 'زيد ناصر' }, orderId: 'ORD-01245' },
]

function Draw() {
  const { t, i18n } = useTranslation()
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const spinIntervalRef = useRef(null)

  const startDraw = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setWinner(null)
    
    let currentIndex = 0
    let speed = 50
    let iterations = 0
    const maxIterations = 40
    
    const spin = () => {
      setHighlightedIndex(currentIndex)
      currentIndex = (currentIndex + 1) % participantsData.length
      iterations++
      
      if (iterations < maxIterations) {
        speed = 50 + (iterations * 15)
        spinIntervalRef.current = setTimeout(spin, speed)
      } else {
        const winnerIndex = Math.floor(Math.random() * participantsData.length)
        setHighlightedIndex(winnerIndex)
        setWinner(participantsData[winnerIndex])
        setIsSpinning(false)
      }
    }
    
    spin()
  }

  const resetDraw = () => {
    setWinner(null)
    setHighlightedIndex(null)
  }

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearTimeout(spinIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh-180px)] flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Prize Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C77B7B]/20 to-[#1A8080]/20 border border-[#C77B7B]/30 mb-6 animate-bounce-slow">
            <span className="text-2xl">🎁</span>
            <span className="text-[#D99090] font-semibold text-sm">
              {t('draw.grandPrize')}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
            <span className="gradient-text">{t('draw.title')}</span>
          </h1>
          
          <p className="text-[#1A1A2E]/50 text-base sm:text-lg lg:text-xl max-w-xl mx-auto">
            {t('draw.subtitle')}
          </p>
        </div>

        {/* Winner Display */}
        {winner && (
          <div className="mb-12 sm:mb-16 winner-card">
            <div className="relative max-w-2xl mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A8080]/30 to-[#C77B7B]/30 rounded-3xl blur-3xl" />
              
              {/* Winner Card */}
              <div className="relative card-premium p-8 sm:p-12 text-center winner-glow rounded-3xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #1A8080 1px, transparent 1px),
                                      radial-gradient(circle at 75% 75%, #C77B7B 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                
                {/* Trophy */}
                <div className="relative mb-6">
                  <div className="text-7xl sm:text-8xl animate-bounce-slow">🏆</div>
                  
                  {/* Sparkles */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full animate-ping"
                        style={{
                          background: i % 2 === 0 ? '#1A8080' : '#C77B7B',
                          top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                          left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                          animationDelay: `${i * 0.15}s`,
                          animationDuration: '2s',
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <h2 className="relative text-xl sm:text-2xl font-semibold text-[#1A1A2E]/80 mb-2">
                  {t('draw.congratulations')} 🎉
                </h2>
                <p className="relative text-[#1A1A2E]/50 text-sm mb-6">{t('draw.winnerIs')}</p>
                
                {/* Winner Name */}
                <div className="relative text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="gradient-text">
                    {i18n.language === 'ar' ? winner.name.ar : winner.name.en}
                  </span>
                </div>
                
                {/* Order ID */}
                <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A8080]/5 border border-[#1A8080]/20">
                  <svg className="w-4 h-4 text-[#1A8080]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="text-[#1A8080] font-mono font-medium">{winner.orderId}</span>
                </div>
                
                {/* Prize Info */}
                <div className="relative mt-8 pt-8 border-t border-[#1A8080]/10">
                  <span className="text-[#1A1A2E]/40 text-xs uppercase tracking-widest font-medium">{t('draw.prize')}</span>
                  <div className="text-xl sm:text-2xl font-bold mt-3 flex items-center justify-center gap-3">
                    <span className="text-2xl">💎</span>
                    <span className="gradient-text">{t('draw.grandPrize')}</span>
                    <span className="text-2xl">💎</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="text-center mb-12 sm:mb-16">
          {!winner ? (
            <button
              onClick={startDraw}
              disabled={isSpinning}
              className={`btn-primary text-lg sm:text-xl px-10 sm:px-16 py-5 sm:py-6 rounded-2xl transform transition-all duration-300 ${
                isSpinning ? 'animate-pulse cursor-not-allowed scale-105' : 'hover:scale-105'
              }`}
            >
              <span className="flex items-center gap-3">
                {isSpinning ? (
                  <>
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{t('draw.spinning')}</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">🎰</span>
                    <span>{t('draw.startDraw')}</span>
                  </>
                )}
              </span>
            </button>
          ) : (
            <button
              onClick={resetDraw}
              className="btn-secondary text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 rounded-xl hover:scale-105 transform transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>{t('draw.newDraw')}</span>
              </span>
            </button>
          )}
        </div>

        {/* Participants Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1A8080]/20 to-transparent" />
            <h3 className="text-lg sm:text-xl font-semibold text-[#1A1A2E] flex items-center gap-3">
              <span className="text-xl">👥</span>
              {t('draw.participants')}
              <span className="text-xs font-medium bg-[#1A8080]/10 text-[#1A8080] px-3 py-1 rounded-lg border border-[#1A8080]/20">
                {participantsData.length}
              </span>
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#1A8080]/20 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {participantsData.map((participant, index) => {
              const isWinner = winner?.id === participant.id
              const isHighlighted = highlightedIndex === index && isSpinning
              
              return (
                <div
                  key={participant.id}
                  className={`relative p-4 rounded-2xl transition-all duration-300 ${
                    isWinner
                      ? 'bg-gradient-to-br from-[#1A8080]/30 to-[#C77B7B]/20 scale-105 winner-glow z-10'
                      : isHighlighted
                      ? 'bg-gradient-to-br from-[#1A8080]/20 to-[#C77B7B]/10 scale-110 z-10 border border-[#1A8080]/50'
                      : 'card-glass hover:scale-[1.02]'
                  }`}
                >
                  {/* Participant Number */}
                  <div className={`absolute -top-2 -end-2 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isWinner || isHighlighted
                      ? 'bg-gradient-to-br from-[#1A8080] to-[#0D6666] text-white shadow-lg shadow-[#1A8080]/30'
                      : 'bg-[#1A8080]/10 text-[#1A8080] border border-[#1A8080]/20'
                  }`}>
                    {participant.id}
                  </div>
                  
                  {/* Crown for winner */}
                  {isWinner && (
                    <div className="absolute -top-6 start-1/2 -translate-x-1/2 text-4xl animate-bounce-slow">
                      👑
                    </div>
                  )}
                  
                  {/* Participant Avatar */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-lg sm:text-xl font-semibold ${
                    isWinner || isHighlighted
                      ? 'bg-gradient-to-br from-[#1A8080] to-[#0D6666] text-white shadow-lg'
                      : 'avatar text-[#1A8080]'
                  }`}>
                    {(i18n.language === 'ar' ? participant.name.ar : participant.name.en).charAt(0)}
                  </div>
                  
                  {/* Participant Info */}
                  <div className="text-center">
                    <div className={`text-sm font-medium mb-1 truncate ${
                      isWinner || isHighlighted ? 'text-white' : 'text-[#1A1A2E]/80'
                    }`}>
                      {i18n.language === 'ar' ? participant.name.ar : participant.name.en}
                    </div>
                    <div className={`text-xs font-mono ${
                      isWinner || isHighlighted ? 'text-white/70' : 'text-[#1A1A2E]/40'
                    }`}>
                      {participant.orderId}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Draw
