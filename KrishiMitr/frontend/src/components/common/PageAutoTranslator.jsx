import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { translateDOM } from '../../i18n/domTranslator';

export default function PageAutoTranslator() {
  const { currentLang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    let timer = null;

    const runTranslation = () => {
      const target = document.querySelector('.shc-app-wrapper') || document.body;
      if (target) {
        translateDOM(target, currentLang);
      }
    };

    // Run immediately on page route change or language change
    runTranslation();

    // Small delay to catch any asynchronously rendered components
    const timeoutId = setTimeout(runTranslation, 100);

    // Watch for dynamic DOM changes (e.g. search results, accordions, tabs)
    const observer = new MutationObserver(() => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(runTranslation, 60);
    });

    const rootTarget = document.querySelector('.shc-app-wrapper') || document.body;
    if (rootTarget) {
      observer.observe(rootTarget, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }

    return () => {
      clearTimeout(timeoutId);
      if (timer) clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentLang, location.pathname, location.search]);

  return null;
}
