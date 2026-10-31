import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { FileText, Clock, Sprout, ShieldAlert, Award, CheckCircle2 } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="shc-page-container">
      <Breadcrumb title="About us" />

      <main className="shc-main-content">
        <div className="shc-about-wrapper">
          <div className="shc-about-header">
            <h1 className="shc-about-title">ABOUT SOIL HEALTH CARD Scheme</h1>
            <p className="shc-about-slogan">"Swasth Dharaa.Khet Haraa." - Healthy Earth. Green Farm.</p>
          </div>

          <div className="shc-about-intro-text">
            <p>
              A Soil Health Card is used to assess the current status of soil health and, when used over time, to determine changes in soil health that are affected by land management. A Soil Health Card displays soil health indicators and associated descriptive terms. The indicators are typically based on farmers' practical experience and knowledge of local natural resources. The card lists soil health indicators that can be assessed with modern accredited laboratory equipment and calibrated field test kits.
            </p>
            <p>
              The soil card gives farmers a precise scientific assessment of which nutrients their soil is lacking, and hence, which crops they should invest in. They are also provided with customized fertilizer dosage advisories tailored to their landholding so, ultimately, the crop yield will see a sustained rise while farming input costs decrease.
            </p>
          </div>

          <h2 className="shc-about-subheading">Key Features of the Soil Health Card Scheme</h2>

          <div className="shc-about-features-grid">
            <div className="shc-about-feature-box">
              <div className="shc-about-feat-icon">
                <FileText size={22} />
              </div>
              <div>
                <h3>Soil Report</h3>
                <p>
                  In the form of a Soil Health Card, the farmer receives a comprehensive report containing all 12 chemical and physical parameters of the soil on their particular farm holding.
                </p>
              </div>
            </div>

            <div className="shc-about-feature-box">
              <div className="shc-about-feat-icon">
                <Clock size={22} />
              </div>
              <div>
                <h3>Regular Updates</h3>
                <p>
                  A farm holding receives an updated Soil Health Card once every 3 years so that changing soil fertility and nutrient depletion over time can be tracked and corrected.
                </p>
              </div>
            </div>

            <div className="shc-about-feature-box">
              <div className="shc-about-feat-icon">
                <Sprout size={22} />
              </div>
              <div>
                <h3>Crop-wise Recommendations</h3>
                <p>
                  The card includes tailored nutrient and fertilizer recommendations for multiple chosen crops based on targeted crop yields and current soil test levels.
                </p>
              </div>
            </div>

            <div className="shc-about-feature-box">
              <div className="shc-about-feat-icon">
                <ShieldAlert size={22} />
              </div>
              <div>
                <h3>Balanced Fertilizer Application</h3>
                <p>
                  Prevents indiscriminate and excessive use of chemical fertilizers (such as Urea), promoting balanced application of primary, secondary, and micronutrients alongside bio-fertilizers.
                </p>
              </div>
            </div>

            <div className="shc-about-feature-box">
              <div className="shc-about-feat-icon">
                <Award size={22} />
              </div>
              <div>
                <h3>ICAR Scientific Methodology</h3>
                <p>
                  All nutrient recommendations are computed using Soil Test Crop Response (STCR) formulae developed and validated across agro-climatic zones by the Indian Council of Agricultural Research (ICAR).
                </p>
              </div>
            </div>

            <div className="shc-about-feature-box">
              <div className="shc-about-feat-icon">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h3>100% Free of Cost to Farmers</h3>
                <p>
                  Soil sample collection from farmer fields, laboratory chemical analysis, and issuance of printed cards are conducted without any testing fee charged to the farmer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
