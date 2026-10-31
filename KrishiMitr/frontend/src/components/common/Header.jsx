import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Globe, ChevronDown } from 'lucide-react';
import emblemImg from '../../assets/logos/emblem-india.svg';
import shcLogo from '../../assets/logos/shc-logo.svg';
import nmnfLogo from '../../assets/logos/nmnf-logo.svg';
import { useLanguage } from '../../context/LanguageContext';

export default function Header({ onToggleDrawer }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isNmnfRoute = location.pathname.includes('Natural_Farming');
  const { currentLangObj, openLanguageModal, t } = useLanguage();

  return (
    <header className={`shc-header ${isAdminRoute ? 'shc-header-admin' : ''}`}>
      {/* Top Banner Row */}
      <div className="shc-header-top">
        <div className="shc-header-left">
          {/* Emblem of India */}
          <Link to="/" className="shc-emblem-wrap" title={t('header.gov', 'Government of India')}>
            <img src={emblemImg} alt="Emblem of India" className="shc-emblem-img" />
            <div className="shc-ministry-text">
              <span className="shc-gov-title">{t('header.gov', 'Government of India')}</span>
              <span className="shc-min-title">{t('header.ministry', 'Ministry of Agriculture and Farmers Welfare')}</span>
              <span className="shc-dept-title">{t('header.dept', 'Department of Agriculture and Farmers Welfare')}</span>
            </div>
          </Link>

          <div className="shc-header-divider" />

          {/* Scheme Logo */}
          <Link to="/" className="shc-scheme-wrap" title={t('header.title', 'Soil Health Card Portal')}>
            <img src={isNmnfRoute ? nmnfLogo : shcLogo} alt="Soil Health Card" className="shc-scheme-logo" />
            <div className="shc-scheme-text">
              <span className="shc-scheme-title">
                {isNmnfRoute ? t('header.nmnfTitle', 'NMNF') : t('header.title', 'Soil Health Card')}
              </span>
              <span className="shc-scheme-tagline">
                {isNmnfRoute ? t('header.nmnfTagline', 'National Mission on Natural Farming') : t('header.tagline', 'Healthy Earth, Greener Farm')}
              </span>
            </div>
          </Link>
        </div>

        {/* Right Utility: Language Selector */}
        <div className="shc-header-right">
          <button 
            type="button"
            className="shc-lang-btn" 
            onClick={openLanguageModal}
            title={t('header.changeLang', 'Change Regional Language')}
            aria-label={t('header.changeLang', 'Change Regional Language')}
          >
            <Globe size={18} className="shc-globe-icon" />
            <span>{currentLangObj.native}</span>
            <ChevronDown size={14} className="shc-lang-caret" />
          </button>
        </div>
      </div>

      {/* Navigation Toggle Row (Hamburger) */}
      <div className="shc-header-nav-bar">
        <button
          type="button"
          className="shc-menu-btn"
          onClick={onToggleDrawer}
          aria-label={t('header.openMenu', 'Open Navigation Menu')}
          title={t('header.openMenu', 'Open Menu')}
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
