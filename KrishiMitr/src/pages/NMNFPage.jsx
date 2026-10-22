import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import nmnfLogo from '../assets/logos/nmnf-logo.svg';
import { Sprout, Droplets, Sun, Wind, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function NMNFPage() {
  const pillars = [
    {
      title: 'Beejamrit (Seed Treatment)',
      icon: <Sprout size={28} />,
      desc: 'Indigenous microbial formulation using desi cow dung, cow urine, and lime to protect seeds from soil-borne pathogens and enhance germination.'
    },
    {
      title: 'Jeevamrit (Microbial Bio-Inoculant)',
      icon: <Droplets size={28} />,
      desc: 'Fermented bio-culture of desi cow dung, urine, jaggery, pulse flour, and virgin soil, multiplying millions of beneficial aerobic microbes per ml.'
    },
    {
      title: 'Acchadana (Mulching)',
      icon: <Sun size={28} />,
      desc: 'Covering the soil surface with organic biomass, crop residues, or live cover crops to prevent moisture evaporation, suppress weeds, and cool soil temperature.'
    },
    {
      title: 'Whapasa (Soil Aeration & Moisture)',
      icon: <Wind size={28} />,
      desc: 'Maintaining the balance of 50% water vapor and 50% air cavities in root zones, drastically cutting agricultural water consumption.'
    }
  ];

  return (
    <div className="shc-page-container">
      <Breadcrumb title="NMNF" />

      <main className="shc-main-content">
        {/* NMNF Hero Section */}
        <div className="shc-nmnf-hero">
          <div className="shc-nmnf-hero-overlay">
            <div className="shc-nmnf-badge-wrap">
              <img src={nmnfLogo} alt="NMNF Logo" className="shc-nmnf-logo-hero" />
              <div>
                <h2>NMNF</h2>
                <span>National Mission on Natural Farming</span>
              </div>
            </div>

            <h1 className="shc-nmnf-title">Reviving Soil, Restoring Life</h1>

            <p className="shc-nmnf-desc">
              A nationwide movement to transform Indian agriculture through Natural Farming — improving soil health, reducing chemical use, and empowering farmers with sustainable practices rooted in tradition.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Natural Farming */}
        <div className="shc-nmnf-pillars-section">
          <h2 className="shc-section-heading-center">Four Core Pillars of Natural Farming</h2>
          <p className="shc-section-subheading-center">Scientific bio-inputs that activate indigenous soil microbial ecology without external chemical dependency.</p>

          <div className="shc-nmnf-pillars-grid">
            {pillars.map((p, idx) => (
              <div key={idx} className="shc-nmnf-pillar-card">
                <div className="shc-pillar-icon-box">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="shc-nmnf-benefits-section">
          <h3>Impact on Soil Health &amp; Farmer Income</h3>
          <div className="shc-nmnf-benefits-grid">
            <div className="shc-benefit-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Rebuilding Soil Organic Carbon (SOC)</strong>
                <p>Natural mulching and bio-inputs replenish organic matter, reviving beneficial earthworms and mycorrhizae.</p>
              </div>
            </div>
            <div className="shc-benefit-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Zero Chemical Residues &amp; Lower Input Costs</strong>
                <p>Eliminates synthetic fertilizers and chemical pesticides, reducing production costs by up to 40%.</p>
              </div>
            </div>
            <div className="shc-benefit-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Water Conservation</strong>
                <p>Improved soil structure and humus retain moisture effectively, lowering irrigation water demand by 30-50%.</p>
              </div>
            </div>
            <div className="shc-benefit-item">
              <CheckCircle2 size={20} className="check-icon" />
              <div>
                <strong>Climate Resilience</strong>
                <p>Biologically active soils withstand drought and extreme heat conditions significantly better than chemically degraded soils.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
