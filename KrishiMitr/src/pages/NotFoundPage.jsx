import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { AlertCircle, Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="shc-page-container">
      <Breadcrumb title="Page Not Found" />

      <main className="shc-main-content">
        <div className="shc-notfound-card">
          <div className="shc-notfound-icon">
            <AlertCircle size={56} />
          </div>
          <h1 className="shc-notfound-code">404</h1>
          <h2 className="shc-notfound-title">Page Not Found</h2>
          <p className="shc-notfound-desc">
            The page you requested could not be located on the Soil Health Card Portal. It may have moved, or the URL might be mistyped.
          </p>

          <div className="shc-notfound-actions">
            <Link to="/" className="shc-btn-primary">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/soilhealthcard" className="shc-btn-secondary">
              <Search size={16} />
              <span>Get Soil Health Card</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
