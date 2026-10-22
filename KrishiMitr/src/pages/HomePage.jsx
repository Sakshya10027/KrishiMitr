import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  BookOpen, 
  Award, 
  Sprout, 
  FileCheck, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Users
} from 'lucide-react';
import modiHeroImg from '../assets/images/Modi-DEXXZddR.webp';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="shc-home-page">
      {/* Hero Section */}
      <section className="shc-hero-section">
        <div className="shc-hero-container">
          <div className="shc-hero-content">
            <h1 className="shc-hero-title">
              {t('hero.titlePre', 'Empowering Farmers With')}{' '}
              <span className="shc-hero-serif">{t('hero.titleInsights', 'Soil Insights')}</span>{' '}
              {t('hero.titleMid', 'For')}{' '}
              <span className="shc-hero-serif">{t('hero.titleGrowth', 'Sustainable Growth')}</span>
            </h1>

            <p className="shc-hero-description">
              {t('hero.description', 'Empowered 10+ Million Farmers With Data-Driven Insights To Optimize Their Yields, Conserve Resources, And Build A Sustainable Future For Agriculture.')}
            </p>

            <div className="shc-hero-actions">
              <Link to="/soilhealthcard" className="shc-hero-btn-primary">
                {t('hero.getCard', 'Get Soil Health Card')}
              </Link>
              <Link to="/soilTestingLabs" className="shc-hero-btn-secondary">
                {t('hero.findLab', 'Find Nearest Soil Testing Lab')}
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visual Graphic (Farmers & Leadership Banner) */}
        <div className="shc-hero-image-wrap">
          <img 
            src={modiHeroImg} 
            alt={t('hero.titleGrowth', 'Empowering Farmers of India with Soil Health Cards')} 
            className="shc-hero-img" 
          />
        </div>
      </section>

      {/* Feature & Information Cards */}
      <section className="shc-features-section">
        <div className="shc-features-container">
          <div className="shc-features-grid">
            {/* Card 1: Scheme */}
            <div className="shc-feature-card">
              <div className="shc-feature-icon-wrap">
                <FileText size={24} className="shc-feature-icon" />
              </div>
              <h3>{t('features.schemeTitle', 'Soil Health Scheme')}</h3>
              <p>
                {t('features.schemeDesc', "Learn about the Government of India's nationwide program issuing customized soil test reports every 3 years.")}
              </p>
              <Link to="/aboutus" className="shc-feature-link">
                <span>{t('features.schemeLink', 'Explore Scheme')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2: Soil Health Card Generation */}
            <div className="shc-feature-card highlight">
              <div className="shc-feature-icon-wrap">
                <FileCheck size={24} className="shc-feature-icon" />
              </div>
              <h3>{t('hero.getCard', 'Get Soil Health Card')}</h3>
              <p>
                {t('features.schemeDesc', 'Search, view, and print your 12-parameter Soil Health Card with crop-specific ICAR-STCR fertilizer dosages.')}
              </p>
              <Link to="/soilhealthcard" className="shc-feature-link">
                <span>{t('search.downloadPdf', 'Download Card')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 3: Soil Testing Labs */}
            <div className="shc-feature-card">
              <div className="shc-feature-icon-wrap">
                <MapPin size={24} className="shc-feature-icon" />
              </div>
              <h3>{t('features.labsTitle', 'Soil Testing Labs')}</h3>
              <p>
                {t('features.labsDesc', 'Locate authorized soil testing laboratories across states and districts for fast chemical and physical analysis.')}
              </p>
              <Link to="/soilTestingLabs" className="shc-feature-link">
                <span>{t('features.labsLink', 'Find Laboratory')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 4: Balanced Fertilizer */}
            <div className="shc-feature-card">
              <div className="shc-feature-icon-wrap">
                <TrendingUp size={24} className="shc-feature-icon" />
              </div>
              <h3>{t('stats.heading', 'Balanced Nutrition')}</h3>
              <p>
                Scientific STCR formulas balance primary (NPK), secondary (S), and micronutrients (Zn, Fe, Cu, Mn, B) to cut input costs.
              </p>
              <Link to="/aboutus" className="shc-feature-link">
                <span>{t('features.schemeLink', 'Read Guidance')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 5: Interactive Soil Maps */}
            <div className="shc-feature-card">
              <div className="shc-feature-icon-wrap">
                <Award size={24} className="shc-feature-icon" />
              </div>
              <h3>{t('features.mapTitle', 'Soil Nutrient Maps')}</h3>
              <p>
                {t('features.mapDesc', 'Visualize national and state-level soil nutrient fertility maps with macro and micronutrient layer overlays.')}
              </p>
              <Link to="/NutrientMapCycleII" className="shc-feature-link">
                <span>{t('features.mapLink', 'View Maps')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 6: Natural Farming (NMNF) */}
            <div className="shc-feature-card">
              <div className="shc-feature-icon-wrap">
                <Sprout size={24} className="shc-feature-icon" />
              </div>
              <h3>{t('features.nmnfTitle', 'Natural Farming')}</h3>
              <p>
                {t('features.nmnfDesc', 'Discover the National Mission on Natural Farming (NMNF) for chemical-free indigenous bio-input farming.')}
              </p>
              <Link to="/National_Mission_on_Natural_Farming" className="shc-feature-link">
                <span>{t('features.nmnfLink', 'Explore NMNF')}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Statistics Banner */}
      <section className="shc-stats-strip-section">
        <div className="shc-stats-strip-container">
          <div className="shc-stat-item">
            <span className="shc-stat-number">23+ Crore</span>
            <span className="shc-stat-label">{t('stats.dispatched', 'Soil Health Cards Dispatched')}</span>
          </div>
          <div className="shc-stat-divider" />
          <div className="shc-stat-item">
            <span className="shc-stat-number">5.3+ Crore</span>
            <span className="shc-stat-label">{t('stats.tested', 'Soil Samples Analyzed')}</span>
          </div>
          <div className="shc-stat-divider" />
          <div className="shc-stat-item">
            <span className="shc-stat-number">11,500+</span>
            <span className="shc-stat-label">{t('stats.labs', 'Testing Labs & Mobile Units')}</span>
          </div>
          <div className="shc-stat-divider" />
          <div className="shc-stat-item">
            <span className="shc-stat-number">100%</span>
            <span className="shc-stat-label">{t('stats.coverage', 'States & UTs Covered')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
