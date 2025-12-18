import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Layout from './components/Layout'
import LiveOrders from './pages/LiveOrders'
import Draw from './pages/Draw'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/live" replace />} />
        <Route path="/live" element={<LiveOrders />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </Layout>
  )
}

export default App






