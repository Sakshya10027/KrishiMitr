import React, { useState } from 'react';
import { X, Send, Bot, MessageSquare, Sparkles } from 'lucide-react';
import bhartiAvatar from '../../assets/logos/bharti-ai.svg';
import apiClient from '../../services/apiClient';

export default function BhartiAIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Namaste! I am Bharti AI, your virtual assistant for the Soil Health Card portal. How can I assist your farming practices today?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');

  const quickPrompts = [
    'How do I download my Soil Health Card?',
    'What does low Organic Carbon (OC) mean?',
    'Explain the STCR recommendation approach',
    'How do I find a nearby Soil Testing Lab?'
  ];

  const handleSend = async (userText) => {
    const textToSend = userText || inputVal;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInputVal('');
    setIsLoading(true);

    // 1. Try real backend AI assistant endpoint
    try {
      const response = await apiClient.post('/assistant/chat', {
        message: textToSend,
        conversationId
      });

      if (response && response.success && response.data) {
        if (response.data.conversationId) {
          setConversationId(response.data.conversationId);
        }
        setMessages(prev => [...prev, { sender: 'ai', text: response.data.answer }]);
        setIsLoading(false);
        return;
      }
    } catch {
      // Backend offline or AI provider unavailable -> use domain-knowledge fallback
    }

    // 2. Intelligent offline fallback
    setTimeout(() => {
      let reply = 'Thank you for your question. Under the Soil Health Card Scheme, regular 3-year soil testing ensures optimal fertilizer usage and cost efficiency.';
      const lower = textToSend.toLowerCase();

      if (lower.includes('download') || lower.includes('card') || lower.includes('get')) {
        reply = 'To download your Soil Health Card, navigate to "Get Soil Health Card" from the top menu. Enter your 10-digit registered mobile number or search by Farmer Name & District, verify the captcha, and click Submit. You can print or download the official card in PDF format!';
      } else if (lower.includes('carbon') || lower.includes('oc')) {
        reply = 'Organic Carbon (OC) below 0.5% is Low. To improve OC, incorporate 10 tonnes/ha of well-decomposed Farm Yard Manure (FYM), vermicompost, or practice green manuring with Dhaincha/Sanai before planting.';
      } else if (lower.includes('stcr') || lower.includes('fertilizer') || lower.includes('recommendation')) {
        reply = 'STCR (Soil Test Crop Response) is ICAR’s precision formula. Rather than generic blanket doses, it calculates exact nutrient doses (Urea, DAP, MOP, micronutrients) for targeted crop yields based on current soil deficiencies.';
      } else if (lower.includes('lab') || lower.includes('testing')) {
        reply = 'You can locate accredited soil labs by visiting "Find Nearest Soil Testing Lab" (/soilTestingLabs). Select your State and District to view addresses, phone numbers, static lab facilities, and mobile testing vans.';
      } else if (lower.includes('natural') || lower.includes('nmnf') || lower.includes('organic')) {
        reply = 'The National Mission on Natural Farming (NMNF) promotes chemical-free agriculture through indigenous bio-inputs such as Jeevamrit, Beejamrit, and Ghanjeevamrit, restoring earthworm activity and biological soil fertility.';
      }

      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsLoading(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="shc-bharti-floating-btn" onClick={() => setIsOpen(!isOpen)} title="Chat with Bharti AI">
        <img src={bhartiAvatar} alt="Bharti AI Assistant" className="shc-bharti-btn-img" />
        <span className="shc-bharti-btn-badge">Bharti AI</span>
      </div>

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="shc-bharti-chat-window">
          <div className="shc-bharti-chat-header">
            <div className="shc-bharti-chat-title">
              <img src={bhartiAvatar} alt="Bharti AI" className="shc-bharti-chat-avatar" />
              <div>
                <strong>Bharti AI</strong>
                <small>Kisan Soil Health Assistant</small>
              </div>
            </div>
            <button 
              type="button" 
              className="shc-bharti-chat-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="shc-bharti-chat-body">
            {messages.map((m, idx) => (
              <div key={idx} className={`shc-chat-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="shc-bharti-quick-prompts">
            {quickPrompts.map((q, i) => (
              <button key={i} type="button" className="shc-quick-chip" onClick={() => handleSend(q)}>
                <Sparkles size={12} />
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Message Input */}
          <form 
            className="shc-bharti-chat-footer"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              type="text" 
              placeholder="Ask a question about soil or crops..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button type="submit" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
