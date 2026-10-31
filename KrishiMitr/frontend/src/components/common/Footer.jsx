import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Phone, AlertCircle } from 'lucide-react';
import emblemImg from '../../assets/logos/emblem-india.svg';
import shcLogo from '../../assets/logos/shc-logo.svg';
import footer1Img from '../../assets/images/footer1-BbVL-VcF.jpeg';
import footer2Img from '../../assets/images/footer2-D6805mYk.jpeg';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="shc-footer">
      <div className="shc-footer-inner">
        {/* Top Logo Section */}
        <div className="shc-footer-branding">
          <div className="shc-footer-emblem-wrap">
            <img src={emblemImg} alt="Emblem of India" className="shc-footer-emblem" />
            <div className="shc-footer-ministry-text">
              <strong>{t('header.gov', 'Government of India')}</strong>
              <span>{t('header.ministry', 'Ministry of Agriculture and Farmers Welfare')}</span>
              <span>{t('header.dept', 'Department of Agriculture and Farmers Welfare')}</span>
            </div>
          </div>

          <div className="shc-footer-divider" />

          <div className="shc-footer-scheme-wrap">
            <img src={shcLogo} alt="Soil Health Card" className="shc-footer-scheme-logo" />
            <div className="shc-footer-scheme-text">
              <strong>{t('header.title', 'Soil Health Card')}</strong>
              <span>{t('header.tagline', 'Healthy Earth, Greener Farm')}</span>
            </div>
          </div>
        </div>

        {/* Links & Information Grid */}
        <div className="shc-footer-grid">
          {/* Col 1: Portal Navigation */}
          <div className="shc-footer-col">
            <ul className="shc-footer-links notranslate">
              <li><Link to="/aboutus">{t('footer.about', 'About us')}</Link></li>
              <li><Link to="/dashboard">{t('footer.legacyDashboard', 'Legacy Dashboard')}</Link></li>
              <li><Link to="/school">{t('footer.schoolDashboard', 'School Dashboard')}</Link></li>
              <li><Link to="/SchoolLibrary">{t('footer.schoolLibrary', 'School Library')}</Link></li>
              <li><Link to="/GeneralResources">{t('footer.generalResources', 'General Resources')}</Link></li>
              <li><Link to="/media">{t('footer.media', 'Media')}</Link></li>
              <li><Link to="/support">{t('footer.support', 'Support')}</Link></li>
              <li><Link to="/contactus">{t('footer.contact', 'Contact us')}</Link></li>
              <li><Link to="/NutrientMapCycleII">{t('footer.soilMap', 'Soil Map (Beta)')}</Link></li>
              <li><Link to="/National_Mission_on_Natural_Farming">{t('footer.nmnf', 'NMNF')}</Link></li>
              <li><Link to="/admin">{t('footer.login', 'Login')}</Link></li>
            </ul>
          </div>

          {/* Col 2: Policy & Sitemaps */}
          <div className="shc-footer-col">
            <ul className="shc-footer-links notranslate">
              <li><Link to="/aboutus">{t('footer.privacy', 'Privacy Policy')}</Link></li>
              <li><Link to="/aboutus">{t('footer.sitemap', 'Site Map')}</Link></li>
              <li><Link to="/GeneralResources">{t('footer.guidelines', 'Guidelines & SOPs')}</Link></li>
              <li><Link to="/soilTestingLabs">{t('footer.findLab', 'Find Nearest Lab')}</Link></li>
              <li><Link to="/soilhealthcard">{t('footer.downloadSHC', 'Download SHC')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Support & Contact */}
          <div className="shc-footer-col">
            <ul className="shc-footer-links-support notranslate">
              <li>
                <Link to="/support" className="shc-footer-icon-link">
                  <span>{t('footer.reportIssue', 'Report an Issue')}</span>
                  <ExternalLink size={15} />
                </Link>
              </li>
              <li>
                <a href="mailto:support-soilhealth@gov.in" className="shc-footer-icon-link">
                  <span>{t('footer.writeMail', 'Write us a Mail')}</span>
                  <ExternalLink size={15} />
                </a>
              </li>
              <li>
                <a href="tel:+919342769256" className="shc-footer-icon-link">
                  <Phone size={15} />
                  <span>+91 93427 69256</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Institutional Attribution & Tech Notice */}
        <div className="shc-footer-legal">
          <p>
            {t('footer.designedBy', 'Designed, Developed and Maintained by Krishitantra. Information and data in this application is managed by State Agricultural Departments and Department of Agriculture and Farmers Welfare. STCR formulae and other related information for generation of Soil Health Cards have been provided by Indian Council of Agricultural Research.')}
          </p>
          <p className="shc-footer-tech-specs">
            {t('footer.specs', 'For best experience view site in 1024x1080 resolution. Supports all modern browsers Chrome v84+, Safari 4+, Mozilla Firefox V90+.')}
          </p>
        </div>

        {/* Visitor Counter */}
        <div className="shc-footer-visitor">
          <span className="shc-visitor-label">{t('footer.visitorCount', 'Visitor Count')}</span>
          <span className="shc-visitor-number">3593825</span>
        </div>

        {/* Educational Demonstration Disclaimer */}
        <div className="shc-demo-disclaimer-banner">
          <AlertCircle size={16} />
          <span>
            {t('footer.disclaimer', 'Independent educational and developmental recreation of the Soil Health Card Portal for evaluation purposes. Not an official Government of India service.')}
          </span>
        </div>
      </div>

      {/* Split Bottom Banner: Swasth Dhara & Khet Hara */}
      <div className="shc-split-banner">
        <div className="shc-split-banner-item" style={{ backgroundImage: `url(${footer1Img})` }}>
          <img src={footer1Img} alt="Swasth Dhara - Healthy Earth" className="shc-split-banner-img" />
          <div className="shc-split-banner-overlay">
            <span className="shc-split-banner-text notranslate">{t('footer.swasthDhara', 'SWASTH DHARA')}</span>
          </div>
        </div>
        <div className="shc-split-banner-item" style={{ backgroundImage: `url(${footer2Img})` }}>
          <img src={footer2Img} alt="Khet Hara - Greener Farm" className="shc-split-banner-img" />
          <div className="shc-split-banner-overlay">
            <span className="shc-split-banner-text notranslate">{t('footer.khetHara', 'KHET HARA')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
