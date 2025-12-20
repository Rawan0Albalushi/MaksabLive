import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import NewOrderModal from '../components/NewOrderModal'

// Dummy data generator
const generateDummyOrder = (id) => {
  const customers = [
    { en: 'Ahmed Al-Rashid', ar: 'أحمد الراشد' },
    { en: 'Sara Mohammad', ar: 'سارة محمد' },
    { en: 'Khalid Ibrahim', ar: 'خالد إبراهيم' },
    { en: 'Fatima Hassan', ar: 'فاطمة حسن' },
    { en: 'Omar Abdullah', ar: 'عمر عبدالله' },
    { en: 'Layla Ahmed', ar: 'ليلى أحمد' },
    { en: 'Yusuf Ali', ar: 'يوسف علي' },
    { en: 'Noor Salem', ar: 'نور سالم' },
    { en: 'Rania Khalil', ar: 'رانيا خليل' },
    { en: 'Tariq Mansour', ar: 'طارق منصور' },
  ]
  
  const statuses = ['new', 'processing', 'completed', 'pending']
  const customer = customers[Math.floor(Math.random() * customers.length)]
  
  return {
    id: `ORD-${String(id).padStart(5, '0')}`,
    customer,
    amount: Math.floor(Math.random() * 500 + 50),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    time: new Date(Date.now() - Math.random() * 3600000),
    isNew: Math.random() > 0.7
  }
}

const generateInitialOrders = () => {
  return Array.from({ length: 15 }, (_, i) => generateDummyOrder(1000 + i))
}

function LiveOrders() {
  const { t, i18n } = useTranslation()
  const [orders, setOrders] = useState(generateInitialOrders)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [currentNewOrder, setCurrentNewOrder] = useState(null)
  const [stats, setStats] = useState({
    totalOrders: 1247,
    todayRevenue: 45820,
    avgOrderValue: 185,
    activeCustomers: 89
  })

  const updateOrders = useCallback(() => {
    const newOrder = {
      ...generateDummyOrder(Math.floor(Math.random() * 10000)),
      isNew: true,
      time: new Date()
    }
    
    setCurrentNewOrder(newOrder)
    setShowNewOrderModal(true)
    
    setOrders(prev => {
      const updatedOrders = prev.map(order => ({ ...order, isNew: false }))
      return [newOrder, ...updatedOrders.slice(0, 14)]
    })
    
    setStats(prev => ({
      totalOrders: prev.totalOrders + 1,
      todayRevenue: prev.todayRevenue + Math.floor(Math.random() * 200 + 50),
      avgOrderValue: Math.floor(Math.random() * 50 + 150),
      activeCustomers: Math.floor(Math.random() * 20 + 80)
    }))
    
    setLastUpdate(new Date())
  }, [])

  useEffect(() => {
    const interval = setInterval(updateOrders, 5000)
    return () => clearInterval(interval)
  }, [updateOrders])

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new': return 'badge-new'
      case 'processing': return 'badge-processing'
      case 'completed': return 'badge-completed'
      case 'pending': return 'badge-pending'
      default: return 'badge'
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US').format(amount)
  }

  const handleCloseModal = useCallback(() => {
    setShowNewOrderModal(false)
    setCurrentNewOrder(null)
  }, [])

  const statCards = [
    { 
      key: 'totalOrders', 
      value: stats.totalOrders,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'teal'
    },
    { 
      key: 'todayRevenue', 
      value: stats.todayRevenue, 
      isCurrency: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'coral'
    },
    { 
      key: 'avgOrderValue', 
      value: stats.avgOrderValue, 
      isCurrency: true,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'sky'
    },
    { 
      key: 'activeCustomers', 
      value: stats.activeCustomers,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'violet'
    }
  ]

  return (
    <>
      <NewOrderModal 
        order={currentNewOrder}
        isVisible={showNewOrderModal}
        onClose={handleCloseModal}
        duration={30000}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A2E]">
              {t('live.title')}
            </h1>
            
            {/* Live Badge */}
            <div className="badge-live flex items-center gap-2">
              <span className="pulse-dot" />
              <span className="text-xs font-bold tracking-wider">LIVE</span>
            </div>
          </div>
          
          <p className="text-[#1A1A2E]/50 text-base sm:text-lg max-w-xl">
            {t('live.subtitle')}
          </p>
          
          {/* Auto-refresh indicator */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1A8080]/5 border border-[#1A8080]/20">
              <svg className="w-3.5 h-3.5 text-[#1A8080] animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-[#1A1A2E]/60 text-xs">{t('live.autoRefresh')}</span>
            </div>
            <span className="text-[#1A1A2E]/30 text-sm">•</span>
            <span className="text-[#1A1A2E]/40 text-sm">
              {t('live.lastUpdate')}: <span className="text-[#1A8080] font-mono">{formatTime(lastUpdate)}</span>
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {statCards.map((stat, index) => (
            <div
              key={stat.key}
              className="stat-card animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                stat.color === 'teal' ? 'bg-[#1A8080]/10 text-[#2A9A9A]' :
                stat.color === 'coral' ? 'bg-[#C77B7B]/10 text-[#D99090]' :
                stat.color === 'sky' ? 'bg-sky-500/10 text-sky-400' :
                'bg-violet-500/10 text-violet-400'
              }`}>
                {stat.icon}
              </div>
              
              <p className="text-[#1A1A2E]/40 text-xs font-medium uppercase tracking-wide mb-1">
                {t(`live.${stat.key}`)}
              </p>
              
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold text-[#1A1A2E]">
                  {formatCurrency(stat.value)}
                </span>
                {stat.isCurrency && (
                  <span className="text-[#1A1A2E]/30 text-sm">{t('live.currency')}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Orders Section */}
        <div className="card-premium">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#1A8080]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-[#1A1A2E]">
                {t('live.recentOrders')}
              </h2>
              <span className="px-2.5 py-1 text-xs font-medium bg-[#1A8080]/10 text-[#1A8080] rounded-lg border border-[#1A8080]/20">
                {orders.length}
              </span>
            </div>
            
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#1A8080]/5 rounded-xl">
              <button className="px-4 py-2 text-xs font-medium text-white bg-[#1A8080] rounded-lg transition-all">
                All
              </button>
              <button className="px-4 py-2 text-xs font-medium text-[#1A1A2E]/50 hover:text-[#1A8080] hover:bg-[#1A8080]/10 rounded-lg transition-all">
                New
              </button>
              <button className="px-4 py-2 text-xs font-medium text-[#1A1A2E]/50 hover:text-[#1A8080] hover:bg-[#1A8080]/10 rounded-lg transition-all">
                Completed
              </button>
            </div>
          </div>
            
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table-modern">
              <thead>
                <tr>
                  <th>{t('live.orderId')}</th>
                  <th>{t('live.customer')}</th>
                  <th>{t('live.amount')}</th>
                  <th>{t('live.status')}</th>
                  <th>{t('live.time')}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id + index}
                    className={order.isNew ? 'new-order-row' : ''}
                  >
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#1A1A2E] font-medium">{order.id}</span>
                        {order.isNew && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#1A8080]/20 text-[#1A8080] font-semibold border border-[#1A8080]/30">
                            {t('live.new')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar w-9 h-9 text-sm text-[#1A8080]">
                          {(i18n.language === 'ar' ? order.customer.ar : order.customer.en).charAt(0)}
                        </div>
                        <span className="text-[#1A1A2E]/80">
                          {i18n.language === 'ar' ? order.customer.ar : order.customer.en}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-[#1A1A2E] font-semibold">{formatCurrency(order.amount)}</span>
                      <span className="text-[#1A1A2E]/30 ms-1 text-sm">{t('live.currency')}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          order.status === 'new' ? 'bg-[#2A9A9A]' :
                          order.status === 'processing' ? 'bg-[#D99090]' :
                          order.status === 'completed' ? 'bg-sky-400' :
                          'bg-red-400'
                        }`} />
                        {t(`live.${order.status}`)}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-[#1A1A2E]/50">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-mono text-sm">{formatTime(order.time)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-white/5">
            {orders.map((order, index) => (
              <div
                key={order.id + index}
                className={`p-4 ${order.isNew ? 'new-order-row' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#1A1A2E] font-medium text-sm">{order.id}</span>
                    {order.isNew && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#1A8080]/20 text-[#1A8080] font-semibold border border-[#1A8080]/30">
                        {t('live.new')}
                      </span>
                    )}
                  </div>
                  <span className={`badge ${getStatusBadge(order.status)} text-[10px]`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      order.status === 'new' ? 'bg-[#2A9A9A]' :
                      order.status === 'processing' ? 'bg-[#D99090]' :
                      order.status === 'completed' ? 'bg-sky-400' :
                      'bg-red-400'
                    }`} />
                    {t(`live.${order.status}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="avatar w-8 h-8 text-xs text-[#1A8080]">
                      {(i18n.language === 'ar' ? order.customer.ar : order.customer.en).charAt(0)}
                    </div>
                    <span className="text-[#1A1A2E]/70 text-sm">
                      {i18n.language === 'ar' ? order.customer.ar : order.customer.en}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-[#1A1A2E] font-semibold">{formatCurrency(order.amount)}</span>
                    <span className="text-[#1A1A2E]/30 ms-1 text-xs">{t('live.currency')}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-[#1A1A2E]/40">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono">{formatTime(order.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LiveOrders
