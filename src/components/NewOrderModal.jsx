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
    }, 300)
  }, [onClose])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(amount)
  }

  if (!isVisible && !isExiting) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isExiting ? 'modal-exit' : ''}`}
    >
      {/* Backdrop */}
      <div 
        className="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Confetti Effect */}
      {!isExiting && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                background: ['#1A8080', '#C77B7B', '#2A9A9A', '#D99090'][i % 4],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div 
        className={`modal-content relative z-10 w-full max-w-md`}
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0F0F12] border border-white/10">
          {/* Glow Effects */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#1A8080]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#C77B7B]/30 rounded-full blur-3xl" />
          
          {/* Top Banner */}
          <div className="relative bg-gradient-to-r from-[#1A8080] to-[#2A9A9A] p-6 text-center overflow-hidden">
            {/* Shimmer Effect */}
            <div className="shimmer absolute inset-0" />
            
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 end-3 w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/30 transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Icon */}
            <div className="relative mb-3 flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center border border-white/30 animate-bounce-slow">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">
              🎉 {t('live.newOrderReceived') || 'طلب جديد!'} 🎉
            </h2>
            <p className="text-white/80 text-sm">
              {t('live.congratulations') || 'تهانينا! لديك طلب جديد'}
            </p>
          </div>

          {/* Order Details */}
          <div className="relative p-6 space-y-4">
            {/* Order ID */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-white/50 text-sm">
                {t('live.orderId') || 'رقم الطلب'}
              </span>
              <span className="font-mono font-semibold gradient-text text-lg">
                {order?.id}
              </span>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A8080] to-[#0D6666] flex items-center justify-center text-white font-bold shadow-lg shadow-[#1A8080]/20">
                {order?.customer ? (i18n.language === 'ar' ? order.customer.ar : order.customer.en).charAt(0) : '?'}
              </div>
              <div>
                <p className="text-white/40 text-xs mb-0.5">
                  {t('live.customer') || 'العميل'}
                </p>
                <p className="text-white font-semibold">
                  {order?.customer ? (i18n.language === 'ar' ? order.customer.ar : order.customer.en) : '---'}
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-[#1A8080]/10 to-[#C77B7B]/10 border border-[#1A8080]/20">
              <div className="shimmer absolute inset-0" />
              <div className="relative flex items-center justify-between">
                <span className="text-white/60 font-medium">
                  {t('live.amount') || 'المبلغ'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {formatCurrency(order?.amount || 0)}
                  </span>
                  <span className="text-white/50 text-lg">
                    {t('live.currency') || 'ر.س'}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">
                  {t('live.autoClose') || 'سيغلق تلقائياً'}
                </span>
                <span className="text-white/60 font-mono">
                  {Math.ceil(progress / 100 * 30)}s
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-3 -end-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#D99090] to-[#C77B7B] animate-bounce-slow shadow-lg shadow-[#C77B7B]/30" />
        <div className="absolute -bottom-2 -start-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#2A9A9A] to-[#1A8080] animate-bounce-slow shadow-lg shadow-[#1A8080]/30" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  )
}

export default NewOrderModal
