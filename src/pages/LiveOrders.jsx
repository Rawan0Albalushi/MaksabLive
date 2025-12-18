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
    
    // Show the new order modal
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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new': 
        return {
          classes: 'status-new text-white shadow-lg',
          dot: 'bg-white'
        }
      case 'processing': 
        return {
          classes: 'status-processing',
          dot: 'bg-amber-400'
        }
      case 'completed': 
        return {
          classes: 'status-completed',
          dot: 'bg-emerald-400'
        }
      case 'pending': 
        return {
          classes: 'status-pending',
          dot: 'bg-orange-400'
        }
      default: 
        return { classes: 'badge-white', dot: 'bg-white/50' }
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

  const statData = [
    { 
      key: 'totalOrders', 
      value: stats.totalOrders,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      gradient: 'from-[#F26F59] to-[#E85A45]',
      iconBg: 'bg-gradient-to-br from-[#F26F59] to-[#D95A46]',
      glow: '0 8px 30px rgba(242, 111, 89, 0.5)'
    },
    { 
      key: 'todayRevenue', 
      value: stats.todayRevenue, 
      isCurrency: true,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-[#25B0BA] to-[#1D9099]',
      iconBg: 'bg-gradient-to-br from-[#25B0BA] to-[#1D9099]',
      glow: '0 8px 30px rgba(37, 176, 186, 0.5)'
    },
    { 
      key: 'avgOrderValue', 
      value: stats.avgOrderValue, 
      isCurrency: true,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-[#FFB088] to-[#F26F59]',
      iconBg: 'bg-gradient-to-br from-[#FFB088] to-[#F26F59]',
      glow: '0 8px 30px rgba(255, 176, 136, 0.5)'
    },
    { 
      key: 'activeCustomers', 
      value: stats.activeCustomers,
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-[#4DD8E0] to-[#25B0BA]',
      iconBg: 'bg-gradient-to-br from-[#4DD8E0] to-[#25B0BA]',
      glow: '0 8px 30px rgba(77, 216, 224, 0.5)'
    }
  ]

  const handleCloseModal = useCallback(() => {
    setShowNewOrderModal(false)
    setCurrentNewOrder(null)
  }, [])

  return (
    <>
      {/* New Order Modal */}
      <NewOrderModal 
        order={currentNewOrder}
        isVisible={showNewOrderModal}
        onClose={handleCloseModal}
        duration={30000}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-white drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]">{t('live.title')}</span>
          </h1>
          
          {/* Live Badge */}
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/30 to-emerald-400/20 border-2 border-emerald-400/50 backdrop-blur-sm shadow-lg shadow-emerald-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-lg shadow-emerald-400/50"></span>
            </span>
            <span className="text-emerald-300 text-sm font-bold tracking-wider">LIVE</span>
          </div>
        </div>
        
        <p className="text-white/80 text-lg sm:text-xl max-w-2xl drop-shadow-sm">{t('live.subtitle')}</p>
        
        {/* Auto-refresh indicator */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl badge-teal backdrop-blur-sm">
            <div className="relative">
              <svg className="w-4 h-4 text-[#4DD8E0] animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-[#D4F5F7] text-sm font-medium">{t('live.autoRefresh')}</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <span className="text-white/70 text-sm">
            {t('live.lastUpdate')}: <span className="text-white font-mono font-bold">{formatTime(lastUpdate)}</span>
          </span>
        </div>
      </div>

      {/* Stats Grid - Hidden */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-14">
        {statData.map((stat, index) => (
          <div
            key={stat.key}
            className="stat-card p-5 sm:p-6 rounded-2xl animate-slide-up"
            style={{ 
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div 
              className={`inline-flex p-4 rounded-2xl ${stat.iconBg} mb-5 shadow-xl border border-white/20`} 
              style={{ boxShadow: stat.glow }}
            >
              <span className="text-white drop-shadow-lg">{stat.icon}</span>
            </div>
            
            <p className="text-white/70 text-sm font-medium mb-2">{t(`live.${stat.key}`)}</p>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                {formatCurrency(stat.value)}
              </span>
              {stat.isCurrency && (
                <span className="text-white/60 text-sm font-medium">{t('live.currency')}</span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-lg bg-emerald-500/25 border border-emerald-400/40 w-fit">
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17l9.2-9.2M17 17V7m0 10H7" />
              </svg>
              <span className="text-emerald-300 text-sm font-bold">+12.5%</span>
            </div>
          </div>
        ))}
      </div> */}

      {/* Orders Section */}
      <div className="card-premium overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {t('live.recentOrders')}
            </h2>
            <span className="px-4 py-1.5 text-sm font-bold badge-coral rounded-full">
              {orders.length}
            </span>
          </div>
          
          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <button className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#F26F59] to-[#25B0BA] rounded-xl transition-all">
              All
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              New
            </button>
            <button className="px-5 py-2.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              Completed
            </button>
          </div>
        </div>
          
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-black/20">
                <th className="px-6 py-4 text-start text-xs font-bold text-white/70 uppercase tracking-wider">
                  {t('live.orderId')}
                </th>
                <th className="px-6 py-4 text-start text-xs font-bold text-white/70 uppercase tracking-wider">
                  {t('live.customer')}
                </th>
                <th className="px-6 py-4 text-start text-xs font-bold text-white/70 uppercase tracking-wider">
                  {t('live.amount')}
                </th>
                <th className="px-6 py-4 text-start text-xs font-bold text-white/70 uppercase tracking-wider">
                  {t('live.status')}
                </th>
                <th className="px-6 py-4 text-start text-xs font-bold text-white/70 uppercase tracking-wider">
                  {t('live.time')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order, index) => {
                const statusStyle = getStatusStyle(order.status)
                return (
                  <tr
                    key={order.id + index}
                    className={`transition-colors hover:bg-white/5 ${
                      order.isNew ? 'bg-white/10 animate-slide-up' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-white font-bold">{order.id}</span>
                        {order.isNew && (
                          <span className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-[#F26F59] to-[#25B0BA] text-white font-bold">
                            {t('live.new')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-sm font-bold">
                          {(i18n.language === 'ar' ? order.customer.ar : order.customer.en).charAt(0)}
                        </div>
                        <span className="text-white font-medium">
                          {i18n.language === 'ar' ? order.customer.ar : order.customer.en}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-bold">{formatCurrency(order.amount)}</span>
                      <span className="text-white/50 ms-1 text-sm">{t('live.currency')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${statusStyle.classes}`}>
                        <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                        {t(`live.${order.status}`)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-white/70">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-mono">{formatTime(order.time)}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/10">
          {orders.map((order, index) => {
            const statusStyle = getStatusStyle(order.status)
            return (
              <div
                key={order.id + index}
                className={`p-4 ${order.isNew ? 'bg-white/10 animate-slide-up' : ''}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white font-bold text-sm">{order.id}</span>
                    {order.isNew && (
                      <span className="px-2 py-0.5 text-xs rounded-md bg-gradient-to-r from-[#F26F59] to-[#25B0BA] text-white font-bold">
                        {t('live.new')}
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${statusStyle.classes}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                    {t(`live.${order.status}`)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white text-xs font-bold">
                      {(i18n.language === 'ar' ? order.customer.ar : order.customer.en).charAt(0)}
                    </div>
                    <span className="text-white text-sm font-medium">
                      {i18n.language === 'ar' ? order.customer.ar : order.customer.en}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-white font-bold">{formatCurrency(order.amount)}</span>
                    <span className="text-white/50 ms-1 text-xs">{t('live.currency')}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-white/60">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono">{formatTime(order.time)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default LiveOrders
