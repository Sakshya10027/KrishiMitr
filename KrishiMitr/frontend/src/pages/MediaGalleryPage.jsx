import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { Image, Video, Newspaper, Calendar } from 'lucide-react';

export default function MediaGalleryPage() {
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos' | 'press'

  const photos = [
    { title: 'Soil Sampling Training Camp for Farmers in Ludhiana, Punjab', date: '04-Feb-2026', category: 'Field Camps', caption: 'Agricultural officers demonstrating scientific V-cut soil sampling to farmers.' },
    { title: 'Distribution of Soil Health Cards in Baramati Model Village', date: '18-Jan-2026', category: 'Events', caption: 'Over 500 farmers receiving printed cards with customized crop advisories.' },
    { title: 'Mobile Soil Testing Van Demonstration in Varanasi', date: '22-Nov-2025', category: 'Technology', caption: 'On-the-spot rapid soil chemical testing using IoT-enabled digital photometer kits.' },
    { title: 'School Science Students Testing Village Soil Samples', date: '15-Oct-2025', category: 'School Initiative', caption: 'Participatory student learning under the School Soil Health Programme.' }
  ];

  const videos = [
    { title: 'How to Take a Soil Sample: Official Step-by-Step Video Guide', duration: '5:42 mins', date: '2025' },
    { title: 'Understanding Your Soil Health Card: 12 Parameters Explained', duration: '8:15 mins', date: '2025' },
    { title: 'Success Story: How Gurpreet Singh Reduced Urea Use by 30%', duration: '4:20 mins', date: '2026' }
  ];

  return (
    <div className="shc-page-container">
      <Breadcrumb title="Media" />

      <main className="shc-main-content">
        <div className="shc-page-header-standard">
          <h1>Media &amp; Public Awareness Gallery</h1>
          <p>Photographs, informational video documentaries, and press coverage of Soil Health Card initiatives across India.</p>
        </div>

        {/* Media Tabs */}
        <div className="shc-school-tabs-wrap">
          <div className="shc-school-tabs">
            <button
              type="button"
              className={`shc-school-tab ${activeTab === 'photos' ? 'active' : ''}`}
              onClick={() => setActiveTab('photos')}
            >
              Photo Gallery
            </button>
            <button
              type="button"
              className={`shc-school-tab ${activeTab === 'videos' ? 'active' : ''}`}
              onClick={() => setActiveTab('videos')}
            >
              Video Tutorials
            </button>
          </div>
        </div>

        {activeTab === 'photos' ? (
          <div className="shc-media-grid">
            {photos.map((item, idx) => (
              <div key={idx} className="shc-media-card">
                <div className="shc-media-placeholder">
                  <Image size={40} className="placeholder-icon" />
                  <span className="placeholder-text">Soil Health Initiative Photo</span>
                </div>
                <div className="shc-media-card-body">
                  <div className="shc-media-tag-row">
                    <span className="shc-badge-neutral">{item.category}</span>
                    <small className="shc-media-date">{item.date}</small>
                  </div>
                  <h4 className="shc-media-title">{item.title}</h4>
                  <p className="shc-media-caption">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="shc-media-grid">
            {videos.map((vid, idx) => (
              <div key={idx} className="shc-media-card">
                <div className="shc-media-placeholder video">
                  <Video size={44} className="placeholder-icon" />
                  <span className="placeholder-text">Watch Video Tutorial</span>
                </div>
                <div className="shc-media-card-body">
                  <div className="shc-media-tag-row">
                    <span className="shc-badge-neutral">Video • {vid.duration}</span>
                    <small className="shc-media-date">{vid.date}</small>
                  </div>
                  <h4 className="shc-media-title">{vid.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
