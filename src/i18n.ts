import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Load file JSON
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
  .use(initReactI18next) // Kết nối với React
  .init({
    fallbackLng: 'vn', // Ngôn ngữ mặc định
    debug: true, // Bật log để debug
    interpolation: {
      escapeValue: false, // Không escape HTML (nếu cần)
    },
    supportedLngs: ['vn', 'cn'], // Chỉ hỗ trợ VN & CN
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Đường dẫn đến file JSON
    },
    detection: {
      order: ['localStorage', 'navigator'], // Ưu tiên lấy từ localStorage, nếu không thì lấy từ trình duyệt
      caches: ['localStorage'], // Lưu ngôn ngữ vào localStorage
    },
  });

export default i18n;
