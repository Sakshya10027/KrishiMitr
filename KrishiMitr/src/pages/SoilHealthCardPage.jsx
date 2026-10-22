import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import SoilHealthCardSearch from '../components/shc/SoilHealthCardSearch';
import SoilHealthCardView from '../components/shc/SoilHealthCardView';

export default function SoilHealthCardPage() {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="shc-page-container">
      <Breadcrumb title="Soil health card" />

      <main className="shc-main-content">
        {!selectedCard ? (
          <div className="shc-shc-intro-block">
            <h1 className="shc-page-title">Soil health Card</h1>
            <p className="shc-page-subtitle">
              Analyze your soil's nutrient levels to make smarter crop choices and invest in the right fertilizers for better results.
            </p>

            <SoilHealthCardSearch onSelectCard={setSelectedCard} />
          </div>
        ) : (
          <SoilHealthCardView 
            cardData={selectedCard} 
            onBack={() => setSelectedCard(null)} 
          />
        )}
      </main>
    </div>
  );
}
