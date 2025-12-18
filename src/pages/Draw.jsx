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
        <div className="text-center mb-10 sm:mb-16">
          {/* Prize Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#F26F59]/30 to-[#25B0BA]/30 border-2 border-white/40 backdrop-blur-sm mb-6 animate-bounce shadow-xl shadow-[#F26F59]/20">
            <div className="relative">
              <span className="text-3xl">🎁</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#F26F59] rounded-full animate-ping shadow-lg shadow-[#F26F59]/50" />
            </div>
            <span className="text-white font-bold text-lg drop-shadow-lg">
              {t('draw.grandPrize')}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-4">
            <span className="text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)]">{t('draw.title')}</span>
          </h1>
          
          <p className="text-white/80 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto drop-shadow-sm">{t('draw.subtitle')}</p>
        </div>

        {/* Winner Display */}
        {winner && (
          <div className="mb-10 sm:mb-16 animate-scale-in">
            <div className="relative max-w-3xl mx-auto">
              {/* Multiple Glow layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F26F59] via-white/30 to-[#25B0BA] rounded-3xl blur-3xl opacity-50" />
              <div className="absolute inset-6 bg-gradient-to-br from-[#F26F59]/40 to-[#25B0BA]/40 rounded-3xl blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Winner Card */}
              <div className="relative card-premium p-8 sm:p-12 lg:p-16 text-center winner-glow rounded-3xl overflow-hidden border-2 border-white/50">
                {/* Shimmer effect */}
                <div className="absolute inset-0 shimmer-bg opacity-40" />
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-15">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #F26F59 2px, transparent 2px),
                                      radial-gradient(circle at 75% 75%, #25B0BA 2px, transparent 2px)`,
                    backgroundSize: '50px 50px'
                  }} />
                </div>
                
                {/* Trophy animation */}
                <div className="relative">
                  <div className="text-8xl sm:text-9xl mb-6 animate-float filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)]">🏆</div>
                  
                  {/* Sparkles around trophy */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-56">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-ping"
                        style={{
                          background: i % 2 === 0 ? '#F26F59' : '#25B0BA',
                          top: `${50 + 45 * Math.sin(i * Math.PI / 8)}%`,
                          left: `${50 + 45 * Math.cos(i * Math.PI / 8)}%`,
                          animationDelay: `${i * 0.12}s`,
                          animationDuration: '1.5s',
                          boxShadow: `0 0 10px ${i % 2 === 0 ? '#F26F59' : '#25B0BA'}`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <h2 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {t('draw.congratulations')} 🎉
                </h2>
                <p className="relative text-white/80 text-lg sm:text-xl mb-6">{t('draw.winnerIs')}</p>
                
                {/* Winner Name */}
                <div className="relative text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 py-2">
                  <span className="gradient-text-glow">
                    {i18n.language === 'ar' ? winner.name.ar : winner.name.en}
                  </span>
                </div>
                
                {/* Order ID */}
                <div className="relative inline-flex items-center gap-2 px-6 py-3 rounded-xl badge-white backdrop-blur-sm">
                  <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="text-white font-mono text-xl font-bold">{winner.orderId}</span>
                </div>
                
                {/* Prize info */}
                <div className="relative mt-10 pt-10 border-t border-white/30">
                  <span className="text-white/60 text-sm uppercase tracking-widest font-bold">{t('draw.prize')}</span>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 flex items-center justify-center gap-4">
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>💎</span>
                    <span className="gradient-text">{t('draw.grandPrize')}</span>
                    <span className="text-4xl animate-bounce" style={{ animationDelay: '0.3s' }}>💎</span>
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
              className={`relative btn-gradient text-xl sm:text-2xl lg:text-3xl px-12 sm:px-20 py-6 sm:py-8 rounded-2xl transform transition-all duration-500 ${
                isSpinning 
                  ? 'animate-pulse cursor-not-allowed scale-105' 
                  : 'hover:scale-110'
              }`}
            >
              <span className="flex items-center gap-4">
                {isSpinning ? (
                  <>
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {t('draw.spinning')}
                  </>
                ) : (
                  <>
                    <span className="text-3xl sm:text-4xl">🎰</span>
                    {t('draw.startDraw')}
                  </>
                )}
              </span>
            </button>
          ) : (
            <button
              onClick={resetDraw}
              className="btn-gradient text-lg sm:text-xl px-10 sm:px-14 py-5 sm:py-6 rounded-2xl hover:scale-110 transform transition-all duration-500"
            >
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('draw.newDraw')}
              </span>
            </button>
          )}
        </div>

        {/* Participants Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3 drop-shadow-lg">
              <span className="text-2xl">👥</span>
              {t('draw.participants')}
              <span className="text-sm font-bold badge-coral px-4 py-1.5 rounded-full">
                {participantsData.length}
              </span>
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5">
            {participantsData.map((participant, index) => {
              const isWinner = winner?.id === participant.id
              const isHighlighted = highlightedIndex === index && isSpinning
              
              return (
                <div
                  key={participant.id}
                  className={`relative p-4 sm:p-5 rounded-2xl transition-all duration-300 ${
                    isWinner
                      ? 'bg-gradient-to-br from-[#F26F59] via-[#E85A45] to-[#25B0BA] scale-105 winner-glow z-10 border-2 border-white/50'
                      : isHighlighted
                      ? 'bg-gradient-to-br from-[#F26F59] to-[#25B0BA] scale-110 z-10 border-2 border-white/50'
                      : 'card-glass hover:scale-105 border border-white/30'
                  }`}
                  style={{
                    boxShadow: isWinner 
                      ? '0 25px 50px rgba(242, 111, 89, 0.5), 0 0 0 2px rgba(255,255,255,0.3)' 
                      : isHighlighted 
                      ? '0 20px 40px rgba(37, 176, 186, 0.4)' 
                      : 'none'
                  }}
                >
                  {/* Participant Number */}
                  <div className={`absolute -top-2 -end-2 w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold shadow-xl ${
                    isWinner || isHighlighted
                      ? 'bg-white text-[#F26F59] border-2 border-[#F26F59]/30'
                      : 'bg-gradient-to-br from-[#F26F59] to-[#25B0BA] text-white border border-white/30'
                  }`}>
                    {participant.id}
                  </div>
                  
                  {/* Crown for winner */}
                  {isWinner && (
                    <div className="absolute -top-8 start-1/2 -translate-x-1/2 text-5xl sm:text-6xl animate-bounce filter drop-shadow-[0_4px_15px_rgba(0,0,0,0.3)]">
                      👑
                    </div>
                  )}
                  
                  {/* Participant Avatar */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold ${
                    isWinner || isHighlighted
                      ? 'bg-white/25 text-white border-2 border-white/50 shadow-lg'
                      : 'bg-gradient-to-br from-[#F26F59]/30 to-[#25B0BA]/30 text-white border-2 border-white/30'
                  }`}>
                    {(i18n.language === 'ar' ? participant.name.ar : participant.name.en).charAt(0)}
                  </div>
                  
                  {/* Participant Info */}
                  <div className="text-center">
                    <div className={`text-sm sm:text-base font-bold mb-1 truncate ${
                      isWinner || isHighlighted
                        ? 'text-white drop-shadow-lg'
                        : 'text-white'
                    }`}>
                      {i18n.language === 'ar' ? participant.name.ar : participant.name.en}
                    </div>
                    <div className={`text-xs font-mono font-medium ${
                      isWinner || isHighlighted
                        ? 'text-white/90'
                        : 'text-white/70'
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
