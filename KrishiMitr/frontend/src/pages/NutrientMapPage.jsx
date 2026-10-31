import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import IndiaNutrientMap from '../components/maps/IndiaNutrientMap';

export default function NutrientMapPage() {
  const location = useLocation();
  const isModelVillages = location.pathname.includes('ModelVillages');
  const title = isModelVillages ? 'Nutrient Map - Model Villages' : 'Nutrient Map - Cycle - II';

  return (
    <div className="shc-page-container">
      <Breadcrumb title={title} />

      <main className="shc-main-content">
        <div className="shc-page-header-standard">
          <h1>{title}</h1>
          <p>
            Macro and micronutrient fertility spatial distribution across India based on validated laboratory soil sample testing data.
          </p>
        </div>

        <IndiaNutrientMap cycleTitle={title} />
      </main>
    </div>
  );
}
