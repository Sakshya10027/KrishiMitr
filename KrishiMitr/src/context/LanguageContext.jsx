import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SUPPORTED_LANGUAGES, translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('shc_lang') || 'en';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync with Google Translate and localStorage
  const setLanguage = useCallback((langCode) => {
    setCurrentLang(langCode);
    localStorage.setItem('shc_lang', langCode);
    document.documentElement.lang = langCode;

    // Trigger Google Translate cookie if present
    const cookieVal = langCode === 'en' ? '/en/en' : `/en/${langCode}`;
    document.cookie = `googtrans=${cookieVal}; path=/;`;
    try {
      document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/;`;
    } catch (e) {
      // ignore
    }

    // Trigger Google Translate dropdown if active on page
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Translation lookup helper
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    
    // Check current language
    let obj = translations[currentLang];
    for (const part of parts) {
      if (!obj || obj[part] === undefined) {
        obj = null;
        break;
      }
      obj = obj[part];
    }
    if (obj !== null && obj !== undefined) return obj;

    // Fallback to English
    let fallbackObj = translations['en'];
    for (const part of parts) {
      if (!fallbackObj || fallbackObj[part] === undefined) {
        fallbackObj = null;
        break;
      }
      fallbackObj = fallbackObj[part];
    }
    if (fallbackObj !== null && fallbackObj !== undefined) return fallbackObj;

    return fallback || path;
  }, [currentLang]);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider value={{
      currentLang,
      currentLangObj,
      setLanguage,
      t,
      languages: SUPPORTED_LANGUAGES,
      isModalOpen,
      openLanguageModal: () => setIsModalOpen(true),
      closeLanguageModal: () => setIsModalOpen(false),
      toggleLanguageModal: () => setIsModalOpen(prev => !prev)
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
