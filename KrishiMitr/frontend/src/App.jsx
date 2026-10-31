import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import NavigationDrawer from './components/common/NavigationDrawer';
import Footer from './components/common/Footer';
import BhartiAIWidget from './components/common/BhartiAIWidget';
import LanguageSelectorModal from './components/common/LanguageSelectorModal';
import PageAutoTranslator from './components/common/PageAutoTranslator';
import { LanguageProvider } from './context/LanguageContext';

// Pages
import HomePage from './pages/HomePage';
import SoilHealthCardPage from './pages/SoilHealthCardPage';
import SoilTestingLabsPage from './pages/SoilTestingLabsPage';
import AboutUsPage from './pages/AboutUsPage';
import LegacyDashboardPage from './pages/LegacyDashboardPage';
import SchoolDashboardPage from './pages/SchoolDashboardPage';
import SchoolLibraryPage from './pages/SchoolLibraryPage';
import GeneralResourcesPage from './pages/GeneralResourcesPage';
import MediaGalleryPage from './pages/MediaGalleryPage';
import SupportPage from './pages/SupportPage';
import ContactUsPage from './pages/ContactUsPage';
import NutrientMapPage from './pages/NutrientMapPage';
import NMNFPage from './pages/NMNFPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserRegistrationPage from './pages/UserRegistrationPage';
import RAWERegistrationPage from './pages/RAWERegistrationPage';
import NotFoundPage from './pages/NotFoundPage';

import './styles/portal.css';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="shc-app-wrapper">
      <ScrollToTop />
      <PageAutoTranslator />
      <Header onToggleDrawer={() => setDrawerOpen(true)} />
      <NavigationDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/soilhealthcard" element={<SoilHealthCardPage />} />
        <Route path="/soilTestingLabs" element={<SoilTestingLabsPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
        <Route path="/dashboard" element={<LegacyDashboardPage />} />
        <Route path="/school" element={<SchoolDashboardPage />} />
        <Route path="/SchoolLibrary" element={<SchoolLibraryPage />} />
        <Route path="/GeneralResources" element={<GeneralResourcesPage />} />
        <Route path="/media" element={<MediaGalleryPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/contactus" element={<ContactUsPage />} />
        <Route path="/NutrientMapCycleII" element={<NutrientMapPage />} />
        <Route path="/NutrientMapModelVillages" element={<NutrientMapPage />} />
        <Route path="/National_Mission_on_Natural_Farming" element={<NMNFPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/ForgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/admin/userRegistration" element={<UserRegistrationPage />} />
        <Route path="/admin/RAWERegistration" element={<RAWERegistrationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
      <BhartiAIWidget />
      <LanguageSelectorModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <MainLayout />
      </Router>
    </LanguageProvider>
  );
}
