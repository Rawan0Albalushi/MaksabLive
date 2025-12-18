import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.live": "Live Orders",
      "nav.draw": "Lucky Draw",
      "nav.language": "العربية",
      
      // Live Orders Page
      "live.title": "Live Orders",
      "live.subtitle": "Real-time order tracking",
      "live.totalOrders": "Total Orders",
      "live.todayRevenue": "Today's Revenue",
      "live.avgOrderValue": "Avg Order Value",
      "live.activeCustomers": "Active Customers",
      "live.recentOrders": "Recent Orders",
      "live.orderId": "Order ID",
      "live.customer": "Customer",
      "live.amount": "Amount",
      "live.status": "Status",
      "live.time": "Time",
      "live.new": "New",
      "live.processing": "Processing",
      "live.completed": "Completed",
      "live.pending": "Pending",
      "live.currency": "OMR",
      "live.autoRefresh": "Auto-refresh every 5s",
      "live.lastUpdate": "Last updated",
      "live.newOrderReceived": "New Order!",
      "live.congratulations": "Congratulations! You have a new order",
      "live.autoClose": "Auto-closing in",
      "live.gotIt": "Got it!",
      
      // Draw Page
      "draw.title": "Lucky Draw",
      "draw.subtitle": "Win amazing prizes!",
      "draw.winner": "Winner",
      "draw.participants": "Participants",
      "draw.startDraw": "Start Draw",
      "draw.spinning": "Spinning...",
      "draw.congratulations": "Congratulations!",
      "draw.winnerIs": "The winner is",
      "draw.newDraw": "New Draw",
      "draw.prize": "Prize",
      "draw.grandPrize": "Grand Prize",
      "draw.participant": "Participant",
      
      // Common
      "common.loading": "Loading...",
      "common.error": "Error occurred",
      "common.retry": "Retry",
    }
  },
  ar: {
    translation: {
      // Navigation
      "nav.live": "الطلبـــات المباشـــرة",
      "nav.draw": "الســـحب",
      "nav.language": "English",
      
      // Live Orders Page
      "live.title": "الطلبـــات المباشـــرة",
      "live.subtitle": "تتبـــع الطلبـــات في الوقت الفعلـــي",
      "live.totalOrders": "إجمالي الطلبـــات",
      "live.todayRevenue": "إيــرادات اليـــوم",
      "live.avgOrderValue": "متوســـط قيمة الطلب",
      "live.activeCustomers": "العملاء النشطيـــن",
      "live.recentOrders": "الطلبـــات الأخيـــرة",
      "live.orderId": "رقم الطلب",
      "live.customer": "العميـــل",
      "live.amount": "المبلـــغ",
      "live.status": "الحالـــة",
      "live.time": "الوقـــت",
      "live.new": "جديـــد",
      "live.processing": "قيد المعالجـــة",
      "live.completed": "مكتمـــل",
      "live.pending": "معلـــق",
      "live.currency": "ر.ع",
      "live.autoRefresh": "تحديث تلقائي كل 5 ثواني",
      "live.lastUpdate": "آخـــر تحديـــث",
      "live.newOrderReceived": "طلب جديد!",
      "live.congratulations": "تهانينا! لديك طلب جديد",
      "live.autoClose": "سيغلق تلقائياً",
      "live.gotIt": "تم، فهمت!",
      
      // Draw Page
      "draw.title": "الســـحب",
      "draw.subtitle": "اربـــح جوائـــز مذهلـــة!",
      "draw.winner": "الفائـــز",
      "draw.participants": "المشاركيـــن",
      "draw.startDraw": "ابـــدأ الســـحب",
      "draw.spinning": "جاري الســـحب...",
      "draw.congratulations": "تهانينـــا!",
      "draw.winnerIs": "الفائـــز هـــو",
      "draw.newDraw": "سحـــب جديـــد",
      "draw.prize": "الجائـــزة",
      "draw.grandPrize": "الجائـــزة الكبـــرى",
      "draw.participant": "مشـــارك",
      
      // Common
      "common.loading": "جاري التحميـــل...",
      "common.error": "حـــدث خطـــأ",
      "common.retry": "إعادة المحاولـــة",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

