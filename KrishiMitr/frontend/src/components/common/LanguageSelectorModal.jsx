import React, { useState, useEffect } from 'react';
import { X, Globe, Check, Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageSelectorModal() {
  const { isModalOpen, closeLanguageModal, currentLang, setLanguage, languages, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeLanguageModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeLanguageModal]);

  if (!isModalOpen) return null;

  const filteredLanguages = languages.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (code) => {
    setLanguage(code);
    closeLanguageModal();
  };

  return (
    <div className="shc-lang-modal-backdrop" onClick={closeLanguageModal}>
      <div 
        className="shc-lang-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shc-lang-modal-title"
      >
        {/* Modal Header */}
        <div className="shc-lang-modal-header">
          <div className="shc-lang-modal-title-wrap">
            <div className="shc-lang-modal-icon">
              <Globe size={22} />
            </div>
            <div>
              <h2 id="shc-lang-modal-title" className="shc-lang-modal-title">
                {t('header.selectLang', 'Select Regional Language')}
              </h2>
              <p className="shc-lang-modal-subtitle">
                भारतीय क्षेत्रीय भाषा चुनें / Choose your preferred language
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="shc-lang-modal-close" 
            onClick={closeLanguageModal}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="shc-lang-search-wrap">
          <Search size={18} className="shc-lang-search-icon" />
          <input 
            type="text" 
            placeholder={t('header.searchLang', 'Search language...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shc-lang-search-input"
            autoFocus
          />
        </div>

        {/* Language Grid */}
        <div className="shc-lang-grid">
          {filteredLanguages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={`shc-lang-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(lang.code)}
              >
                <div className="shc-lang-card-left">
                  <span className="shc-lang-badge">{lang.flag}</span>
                  <div className="shc-lang-names">
                    <span className="shc-lang-native">{lang.native}</span>
                    <span className="shc-lang-english">{lang.name}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="shc-lang-check">
                    <Check size={18} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="shc-lang-modal-footer">
          <span>Official portal support for 11 Constitutionally recognized Indian languages.</span>
        </div>
      </div>
    </div>
  );
}
