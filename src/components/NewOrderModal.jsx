import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

function NewOrderModal({ order, isVisible, onClose, duration = 30000 }) {
  const { t, i18n } = useTranslation()
  const [progress, setProgress] = useState(100)
  const [isExiting, setIsExiting] = useState(false)

  // Reset state when modal becomes visible
  useEffect(() => {
    if (isVisible) {
      setProgress(100)
      setIsExiting(false)
    }
  }, [isVisible])

  // Progress bar countdown
  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
      setProgress(remaining)

      if (remaining <= 0) {
        clearInterval(interval)
        handleClose()
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isVisible, duration])

  const handleClose = useCallback(() => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
      setIsExiting(false)
    }, 500)
  }, [onClose])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(amount)
  }

  if (!isVisible && !isExiting) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden ${isExiting ? 'modal-exit' : 'modal-enter'}`}
    >
      {/* Solid Backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
      />

      {/* Modal Content */}
      <div 
        className={`relative z-10 w-[90%] max-w-lg mx-4 ${isExiting ? 'modal-content-exit' : 'modal-content-enter'}`}
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-white/30 bg-gradient-to-br from-[#2d3748] via-[#1a202c] to-[#171923] shadow-2xl">
          {/* Glow effects */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#F26F59]/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#25B0BA]/40 rounded-full blur-3xl" />
          
          {/* Top celebration banner */}
          <div className="relative bg-gradient-to-r from-[#F26F59] via-[#FFB088] to-[#25B0BA] p-6 text-center overflow-hidden">
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-fast" />
            
            {/* Celebration Icon */}
            <div className="relative mb-3 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40 shadow-lg celebration-bounce">
                <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg mb-1">
              🎉 {t('live.newOrderReceived') || 'طلب جديد!'} 🎉
            </h2>
            <p className="text-white/90 text-sm">
              {t('live.congratulations') || 'تهانينا! لديك طلب جديد'}
            </p>
          </div>

          {/* Order Details */}
          <div className="relative p-6 space-y-5">
            {/* Order ID */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/20">
              <span className="text-white/70 text-sm font-medium">
                {t('live.orderId') || 'رقم الطلب'}
              </span>
              <span className="font-mono text-lg font-bold text-white bg-gradient-to-r from-[#F26F59] to-[#25B0BA] bg-clip-text text-transparent">
                {order?.id}
              </span>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 border border-white/20">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F26F59] to-[#25B0BA] flex items-center justify-center text-white text-xl font-bold shadow-lg border-2 border-white/30">
                {order?.customer ? (i18n.language === 'ar' ? order.customer.ar : order.customer.en).charAt(0) : '؟'}
              </div>
              <div>
                <p className="text-white/60 text-xs mb-1">
                  {t('live.customer') || 'العميل'}
                </p>
                <p className="text-white font-bold text-lg">
                  {order?.customer ? (i18n.language === 'ar' ? order.customer.ar : order.customer.en) : '---'}
                </p>
              </div>
            </div>

            {/* Amount - Highlighted */}
            <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-[#F26F59]/20 to-[#25B0BA]/20 border-2 border-white/30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer-slow" />
              <div className="relative flex items-center justify-between">
                <span className="text-white/80 font-medium">
                  {t('live.amount') || 'المبلغ'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white drop-shadow-lg amount-pop">
                    {formatCurrency(order?.amount || 0)}
                  </span>
                  <span className="text-white/70 text-lg">
                    {t('live.currency') || 'ر.س'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">
                  {t('live.autoClose') || 'سيغلق تلقائياً'}
                </span>
                <span className="text-white/80 font-mono">
                  {Math.ceil(progress / 100 * 30)}s
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#F26F59] to-[#25B0BA] transition-all duration-100 ease-linear progress-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#F4B400] animate-bounce shadow-lg" style={{ animationDuration: '2s' }} />
        <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#6BCB77] to-[#4CAF50] animate-bounce shadow-lg" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#8E44AD] animate-pulse shadow-lg" />
      </div>
    </div>
  )
}

export default NewOrderModal

