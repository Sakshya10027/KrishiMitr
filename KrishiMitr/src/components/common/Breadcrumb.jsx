import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslatedString } from '../../i18n/domTranslator';

export default function Breadcrumb({ title }) {
  const { currentLang, t } = useLanguage();
  const displayTitle = getTranslatedString(title, currentLang) || t(`nav.${title}`, title);

  return (
    <div className="shc-breadcrumb-bar">
      <div className="shc-breadcrumb-inner">
        <Link to="/" className="shc-breadcrumb-home" title={t('nav.home', 'Go to Home')}>
          <Home size={18} />
        </Link>
        <span className="shc-breadcrumb-title">{displayTitle}</span>
      </div>
    </div>
  );
}
