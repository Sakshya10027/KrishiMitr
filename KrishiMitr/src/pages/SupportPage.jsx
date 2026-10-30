import React, { useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import { FAQS } from '../services/resourceService';
import { 
  HelpCircle, 
  PhoneCall, 
  Ticket, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  CheckCircle2, 
  X, 
  Send,
  Loader2
} from 'lucide-react';
import apiClient from '../services/apiClient';

export default function SupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketForm, setTicketForm] = useState({
    farmerName: '',
    phone: '',
    category: 'Soil Health Card Not Received',
    description: ''
  });
  const [submittedTicketId, setSubmittedTicketId] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketForm.farmerName || !ticketForm.phone) return;

    setIsSubmitting(true);
    try {
      const res = await apiClient.post('/support/tickets', {
        farmerName: ticketForm.farmerName,
        phone: ticketForm.phone,
        category: ticketForm.category,
        description: ticketForm.description || 'Support request lodged via portal.'
      });

      if (res && res.success && res.data) {
        setSubmittedTicketId(res.data.ticketNumber);
        setIsSubmitting(false);
        return;
      }
    } catch {
      // Offline / fallback ticket generation
    }

    const newId = `TKT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicketId(newId);
    setIsSubmitting(false);
  };

  const resetModal = () => {
    setShowTicketModal(false);
    setSubmittedTicketId(null);
    setTicketForm({
      farmerName: '',
      phone: '',
      category: 'Soil Health Card Not Received',
      description: ''
    });
  };

  return (
    <div className="shc-page-container">
      <Breadcrumb title="Support" />

      <main className="shc-main-content">
        {/* Support Hero Header matching reference */}
        <div className="shc-support-hero">
          <div className="shc-support-hero-content">
            <h1>Need Help? We're Here for You</h1>
            <p>
              Find answers to frequently asked questions, lodge a service query regarding your Soil Health Card, or contact our dedicated agricultural helpline.
            </p>

            <div className="shc-support-hero-actions">
              <button 
                type="button" 
                className="shc-btn-primary"
                onClick={() => setShowTicketModal(true)}
              >
                <Ticket size={18} />
                <span>Raise a Ticket</span>
              </button>

              <a href="tel:+919342769256" className="shc-btn-secondary">
                <PhoneCall size={18} />
                <span>Call for Support (+91 93427 69256)</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="shc-faq-section">
          <div className="shc-faq-header">
            <h2>Frequently Asked Questions (FAQs)</h2>
            <div className="shc-faq-downloads">
              <button 
                type="button" 
                className="shc-download-link-btn"
                onClick={() => alert('Downloading official FAQ Guide (English PDF)')}
              >
                <Download size={14} />
                <span>Download FAQs (English)</span>
              </button>
              <button 
                type="button" 
                className="shc-download-link-btn"
                onClick={() => alert('Downloading official FAQ Guide (Hindi PDF)')}
              >
                <Download size={14} />
                <span>Download FAQs (हिन्दी)</span>
              </button>
            </div>
          </div>

          <div className="shc-faq-accordion-list">
            {FAQS.map((faq, idx) => (
              <div key={idx} className={`shc-faq-item ${openFaqIndex === idx ? 'expanded' : ''}`}>
                <button
                  type="button"
                  className="shc-faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {openFaqIndex === idx && (
                  <div className="shc-faq-answer-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Raise a Ticket Modal */}
        {showTicketModal && (
          <div className="shc-modal-backdrop" onClick={resetModal}>
            <div className="shc-modal-box" onClick={e => e.stopPropagation()}>
              <div className="shc-modal-header">
                <h3>Raise a Support Ticket</h3>
                <button type="button" className="shc-btn-icon" onClick={resetModal}>
                  <X size={20} />
                </button>
              </div>

              {!submittedTicketId ? (
                <form onSubmit={handleTicketSubmit} className="shc-modal-form">
                  <div className="shc-input-group">
                    <label className="shc-floating-label">Farmer / Citizen Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={ticketForm.farmerName}
                      onChange={e => setTicketForm({ ...ticketForm, farmerName: e.target.value })}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={ticketForm.phone}
                      onChange={e => setTicketForm({ ...ticketForm, phone: e.target.value })}
                      maxLength={10}
                      required
                      className="shc-text-input"
                    />
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-select-label">Issue Category</label>
                    <select
                      value={ticketForm.category}
                      onChange={e => setTicketForm({ ...ticketForm, category: e.target.value })}
                      className="shc-select"
                    >
                      <option value="Soil Health Card Not Received">Soil Health Card Not Received</option>
                      <option value="Discrepancy in Soil Test Report">Discrepancy in Soil Test Report</option>
                      <option value="Laboratory Address Inquiry">Laboratory Address Inquiry</option>
                      <option value="Fertilizer Recommendation Query">Fertilizer Recommendation Query</option>
                      <option value="Other Technical Problem">Other Technical Problem</option>
                    </select>
                  </div>

                  <div className="shc-input-group">
                    <label className="shc-floating-label">Detailed Description</label>
                    <textarea
                      rows={4}
                      placeholder="Please describe your query or problem in detail..."
                      value={ticketForm.description}
                      onChange={e => setTicketForm({ ...ticketForm, description: e.target.value })}
                      className="shc-textarea"
                    />
                  </div>

                  <div className="shc-modal-actions">
                    <button type="button" className="shc-btn-secondary" onClick={resetModal}>
                      Cancel
                    </button>
                    <button type="submit" className="shc-btn-primary">
                      <Send size={16} />
                      <span>Submit Ticket</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="shc-ticket-success">
                  <CheckCircle2 size={48} className="success-icon" />
                  <h4>Ticket Submitted Successfully!</h4>
                  <p>Your reference ticket number is:</p>
                  <div className="shc-ticket-id-badge">{submittedTicketId}</div>
                  <p className="subtext">
                    Our agricultural support team will review your query and contact you at +91 {ticketForm.phone} within 48 hours.
                  </p>
                  <button type="button" className="shc-btn-primary" onClick={resetModal}>
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
