import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  Info, 
  LayoutGrid, 
  GraduationCap, 
  FolderGit2, 
  UserCheck, 
  MapPin, 
  Leaf, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NavigationDrawer({ isOpen, onClose }) {
  const { t } = useLanguage();
  const [openSections, setOpenSections] = useState({
    school: false,
    resources: false,
    support: false,
    soilMap: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="shc-drawer-backdrop" onClick={onClose}>
      <aside 
        className="shc-drawer" 
        onClick={e => e.stopPropagation()} 
        aria-label={t('header.openMenu', 'Portal Navigation Drawer')}
      >
        <div className="shc-drawer-header">
          <button 
            type="button" 
            className="shc-drawer-close-btn" 
            onClick={onClose}
            aria-label={t('common.close', 'Close navigation')}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="shc-drawer-nav">
          {/* About us */}
          <NavLink 
            to="/aboutus" 
            className={({ isActive }) => `shc-drawer-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Info size={20} className="shc-drawer-icon" />
            <span>{t('nav.about', 'About us')}</span>
          </NavLink>

          {/* Legacy Dashboard */}
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => `shc-drawer-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <LayoutGrid size={20} className="shc-drawer-icon" />
            <span>{t('nav.legacyDashboard', 'Legacy Dashboard')}</span>
          </NavLink>

          {/* School Accordion */}
          <div className="shc-drawer-group">
            <button 
              type="button" 
              className="shc-drawer-accordion-btn"
              onClick={() => toggleSection('school')}
            >
              <div className="shc-drawer-accordion-left">
                <GraduationCap size={20} className="shc-drawer-icon" />
                <span>{t('nav.school', 'School')}</span>
              </div>
              {openSections.school ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {openSections.school && (
              <div className="shc-drawer-submenu">
                <NavLink to="/admin" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.login', 'Login')}
                </NavLink>
                <NavLink to="/school" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.schoolDashboard', 'Dashboard')}
                </NavLink>
                <NavLink to="/SchoolLibrary" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.schoolLibrary', 'Library')}
                </NavLink>
              </div>
            )}
          </div>

          {/* Resources Accordion */}
          <div className="shc-drawer-group">
            <button 
              type="button" 
              className="shc-drawer-accordion-btn"
              onClick={() => toggleSection('resources')}
            >
              <div className="shc-drawer-accordion-left">
                <FolderGit2 size={20} className="shc-drawer-icon" />
                <span>{t('nav.resources', 'Resources')}</span>
              </div>
              {openSections.resources ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {openSections.resources && (
              <div className="shc-drawer-submenu">
                <NavLink to="/GeneralResources" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.generalResources', 'General Resources')}
                </NavLink>
                <NavLink to="/media" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.media', 'Media')}
                </NavLink>
              </div>
            )}
          </div>

          {/* Support & Contact Accordion */}
          <div className="shc-drawer-group">
            <button 
              type="button" 
              className="shc-drawer-accordion-btn"
              onClick={() => toggleSection('support')}
            >
              <div className="shc-drawer-accordion-left">
                <UserCheck size={20} className="shc-drawer-icon" />
                <span>{t('nav.support', 'Support & Contact')}</span>
              </div>
              {openSections.support ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {openSections.support && (
              <div className="shc-drawer-submenu">
                <NavLink to="/support" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.support', 'Support')}
                </NavLink>
                <NavLink to="/contactus" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.contact', 'Contact us')}
                </NavLink>
              </div>
            )}
          </div>

          {/* Soil Map (Beta) Accordion */}
          <div className="shc-drawer-group">
            <button 
              type="button" 
              className="shc-drawer-accordion-btn"
              onClick={() => toggleSection('soilMap')}
            >
              <div className="shc-drawer-accordion-left">
                <MapPin size={20} className="shc-drawer-icon" />
                <span>{t('nav.soilMap', 'Soil Map (Beta)')}</span>
              </div>
              {openSections.soilMap ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {openSections.soilMap && (
              <div className="shc-drawer-submenu">
                <a 
                  href="https://soilhealth.dac.gov.in/slusi-visualisation/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="shc-drawer-sublink external"
                >
                  Soil Maps SLUSI <ExternalLink size={14} />
                </a>
                <NavLink to="/NutrientMapCycleII" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.cycle2', 'Nutrient Map - Cycle - II')}
                </NavLink>
                <NavLink to="/NutrientMapModelVillages" className="shc-drawer-sublink" onClick={onClose}>
                  {t('nav.modelVillages', 'Nutrient Map - Model Villages')}
                </NavLink>
              </div>
            )}
          </div>

          {/* NMNF */}
          <NavLink 
            to="/National_Mission_on_Natural_Farming" 
            className={({ isActive }) => `shc-drawer-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Leaf size={20} className="shc-drawer-icon" />
            <span>{t('nav.nmnf', 'NMNF')}</span>
          </NavLink>

          {/* Login */}
          <NavLink 
            to="/admin" 
            className={({ isActive }) => `shc-drawer-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Lock size={20} className="shc-drawer-icon" />
            <span>{t('nav.login', 'Login')}</span>
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}
