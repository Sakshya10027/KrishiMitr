import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, Bot, MessageSquare, Sparkles, Loader2, Volume2, VolumeX, Globe, Check } from 'lucide-react';
import bhartiAvatar from '../../assets/logos/bharti-ai.svg';
import apiClient from '../../services/apiClient';
import { useLanguage } from '../../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/translations';

const LANG_LOCALE_MAP = {
  hi: 'hi-IN',
  en: 'en-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  te: 'te-IN',
  ta: 'ta-IN',
  bn: 'bn-IN',
  pa: 'pa-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  or: 'or-IN'
};

const LISTEN_LABELS = {
  en: { listen: 'Listen', stop: 'Stop', translating: 'Translating...' },
  hi: { listen: 'सुनें', stop: 'रोकें', translating: 'अनुवाद हो रहा है...' },
  mr: { listen: 'ऐका', stop: 'थांबवा', translating: 'भाषांतर होत आहे...' },
  gu: { listen: 'સાંભળો', stop: 'રોકો', translating: 'ભાષાંતર થઈ રહ્યું છે...' },
  te: { listen: 'వినండి', stop: 'ఆపండి', translating: 'అనువదిస్తోంది...' },
  ta: { listen: 'கேளுங்கள்', stop: 'நிறுத்து', translating: 'மொழிபெயர்க்கிறது...' },
  bn: { listen: 'শুনুন', stop: 'থামুন', translating: 'অনুবাদ হচ্ছে...' },
  pa: { listen: 'ਸੁਣੋ', stop: 'ਰੋਕੋ', translating: 'ਅਨੁਵਾਦ ਹੋ ਰਿਹਾ ਹੈ...' },
  kn: { listen: 'ಕೇಳಿ', stop: 'ನಿಲ್ಲಿಸಿ', translating: 'ಅನುವಾದಿಸಲಾಗುತ್ತಿದೆ...' },
  ml: { listen: 'കേൾക്കൂ', stop: 'നിർത്തൂ', translating: 'വിവർത്തനം ചെയ്യുന്നു...' },
  or: { listen: 'ଶୁଣନ୍ତୁ', stop: 'ବନ୍ଦ କରନ୍ତୁ', translating: 'ଅନୁବାଦ ହେଉଛି...' }
};

const GREETINGS = {
  en: 'Namaste! I am Bharti AI, your virtual assistant for the Soil Health Card portal. How can I assist your farming practices today?',
  hi: 'नमस्ते! मैं भारती एआई हूँ, मृदा स्वास्थ्य कार्ड पोर्टल के लिए आपकी आभासी सहायक। आज मैं आपकी कृषि पद्धतियों में कैसे सहायता कर सकती हूँ?',
  mr: 'नमस्ते! मी भारती एआय आहे, सॉइल हेल्थ कार्ड पोर्टलसाठी तुमची आभासी सहाय्यक. आज मी तुमच्या शेतीत कशी मदत करू शकते?',
  gu: 'નમસ્તે! હું ભારતી AI છું, સોઇલ હેલ્થ કાર્ડ પોર્ટલ માટે તમારી વર્ચ્યુઅલ સહાયક. આજે હું તમારી ખેતીમાં કેવી રીતે મદદ કરી શકું?',
  te: 'నమస్తే! నేను భారతి AI, సాయిಲ್ హెల్త్ కార్డ్ పోర్టల్ కోసం మీ వర్చువల్ అసిస్టెంట్. ఈ రోజు మీ వ్యవసాయానికి నేను ఎలా సహాయపడగలను?',
  ta: 'வணக்கம்! நான் பாரதி AI, மண் சுகாதார அட்டை போர்ட்டலுக்கான உங்கள் மெய்நிகர் உதவியாளர். உங்கள் விவசாயத்திற்கு நான் எவ்வாறு உதவ முடியும்?',
  bn: 'নমস্কার! আমি ভারতী এআই, মৃত্তিকা স্বাস্থ্য কার্ড পোর্টালের জন্য আপনার ভার্চুয়াল সহকারী। আজ আপনার কৃষিকাজে আমি কীভাবে সাহায্য করতে পারি?',
  pa: 'ਨਮਸਤੇ! ਮੈਂ ਭਾਰਤੀ ਏਆਈ ਹਾਂ, ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਪੋਰਟਲ ਲਈ ਤੁਹਾਡੀ ਵਰਚੁਅਲ ਸਹਾਇਕ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਖੇਤੀ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?',
  kn: 'ನಮಸ್ಕಾರ! ನಾನು ಭಾರತಿ AI, ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಪೋರ್ಟಲ್‌ಗಾಗಿ ನಿಮ್ಮ ವರ್ಚುವಲ್ ಸಹಾಯಕ. ನಿಮ್ಮ ಕೃಷಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
  ml: 'നമസ്കാരം! ഞാൻ ഭാരതി AI, സോയിൽ ഹെൽത്ത് കാർഡ് പോർട്ടലിന്റെ വെർച്വൽ അസിസ്റ്റന്റ്. ഇന്ന് നിങ്ങളുടെ കൃഷിയിൽ ഞാൻ എങ്ങനെ സഹായിക്കാം?',
  or: 'ନମସ୍କାର! ମୁଁ ଭାରତୀ ଏଆଇ, ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ କାର୍ଡ ପୋର୍ଟାଲ ପାଇଁ ଆପଣଙ୍କ ଭର୍ଚୁଆଲ୍ ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କ କୃଷିରେ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?'
};

const QUICK_PROMPTS = {
  en: [
    'How do I download my Soil Health Card?',
    'What does low Organic Carbon (OC) mean?',
    'Explain the STCR recommendation approach',
    'How do I find a nearby Soil Testing Lab?'
  ],
  hi: [
    'अपना मृदा स्वास्थ्य कार्ड कैसे डाउनलोड करें?',
    'कम जैविक कार्बन (OC) का क्या मतलब है?',
    'STCR उर्वरक सिफारिश पद्धति क्या है?',
    'निकटतम मृदा परीक्षण प्रयोगशाला कैसे खोजें?'
  ],
  mr: [
    'माझे सॉइल हेल्थ कार्ड कसे डाउनलोड करावे?',
    'कमी सेंद्रिय कर्ब (OC) चा काय अर्थ होतो?',
    'STCR खत शिफारस पद्धत स्पष्ट करा',
    'जवळची माती परीक्षण प्रयोगशाळा कशी शोधावी?'
  ],
  gu: [
    'હું મારું સોઇલ હેલ્થ કાર્ડ કેવી રીતે ડાઉનલોડ કરું?',
    'ઓછા ઓર્ગેનિક કાર્બન (OC) નો અર્થ શું થાય?',
    'STCR ખાતર ભલામણ પદ્ધતિ સમજાવો',
    'નજીકની માટી પરીક્ષણ પ્રયોગશાળા કેવી રીતે શોધવી?'
  ],
  te: [
    'సాయిల్ హెల్త్ కార్డ్ ఎలా డౌన్‌లోడ్ చేసుకోవాలి?',
    'తక్కువ సేంద్రీయ కార్బన్ (OC) అంటే ఏమిటి?',
    'STCR ఎరువుల సిఫార్సు విధానాన్ని వివరించండి',
    'సమీపంలోని మట్టి పరీక్ష ప్రయోగశాలను ఎలా కనుగొనాలి?'
  ],
  ta: [
    'மண் சுகாதார அட்டையை எவ்வாறு பதிவிறக்குவது?',
    'குறைந்த கரிம கார்பன் (OC) என்றால் என்ன?',
    'STCR உர பரிந்துரை முறையை விளக்குங்கள்',
    'அருகிலுள்ள மண் பரிசோதனை ஆய்வகத்தை எவ்வாறு கண்டுபிடிப்பது?'
  ],
  bn: [
    'মৃত্তিকা স্বাস্থ্য কার্ড কীভাবে ডাউনলোড করব?',
    'কম জৈব কার্বন (OC) মানে কী?',
    'STCR সার সুপারিশ পদ্ধতি ব্যাখ্যা করুন',
    'কাছের মাটি পরীক্ষা গবেষণাগার কীভাবে খুঁজব?'
  ],
  pa: [
    'ਆਪਣਾ ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਕਿਵੇਂ ਡਾਊਨਲੋਡ ਕਰਾਂ?',
    'ਘੱਟ ਜੈਵਿਕ ਕਾਰਬਨ (OC) ਦਾ ਕੀ ਮਤਲਬ ਹੈ?',
    'STCR ਖਾਦ ਸਿਫਾਰਸ਼ ਵਿਧੀ ਸਮਝਾਓ',
    'ਨੇੜਲੀ ਮਿੱਟੀ ਪਰਖ ਪ੍ਰਯੋਗਸ਼ਾਲਾ ਕਿਵੇਂ ਲੱਭੀਏ?'
  ]
};

// Clean markdown for smooth text-to-speech
function cleanTextForSpeech(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\|[-:\s|]+\|/g, '')
    .replace(/\|/g, ', ')
    .replace(/`{1,3}.*?`{1,3}/gs, '')
    .replace(/[-*•]\s+/g, '')
    .replace(/\n+/g, '. ')
    .trim();
}

// Break into chunks of under 180 chars at sentence or space boundaries for Google TTS
function chunkTextForTTS(text) {
  const chunks = [];
  const sentences = text.split(/(?<=[.?!।\n])\s+/);
  for (const s of sentences) {
    if (s.length <= 180) {
      if (s.trim()) chunks.push(s.trim());
    } else {
      const words = s.split(/\s+/);
      let current = '';
      for (const w of words) {
        if ((current + ' ' + w).length > 180) {
          if (current.trim()) chunks.push(current.trim());
          current = w;
        } else {
          current = current ? current + ' ' + w : w;
        }
      }
      if (current.trim()) chunks.push(current.trim());
    }
  }
  return chunks;
}

// Translate text dynamically using local proxy or Google endpoint
async function translateText(text, targetLang) {
  if (!text || (targetLang === 'en' && /^[a-zA-Z0-9\s.,!?'"()\-–—:;%#@&*+=/]+$/.test(text.slice(0, 100)))) {
    return text;
  }
  // 1. Try local Vite /api/translate proxy
  try {
    const res = await fetch(`/api/translate?tl=${encodeURIComponent(targetLang)}&q=${encodeURIComponent(text)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.translated) return data.translated;
    }
  } catch {
    // fallback
  }

  // 2. Direct Google Translate API
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data[0]) {
        return data[0].map(item => item[0]).join('');
      }
    }
  } catch (err) {
    console.warn('Translation failed, fallback to original:', err);
  }
  return text;
}

export default function BhartiAIWidget() {
  const { currentLang, currentLangObj } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioLang, setAudioLang] = useState(currentLang || 'hi');
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [isTranslatingAudio, setIsTranslatingAudio] = useState(false);
  const [translationsMap, setTranslationsMap] = useState({});

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: GREETINGS[currentLang || 'hi'] || GREETINGS.hi
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatBodyRef = useRef(null);
  const audioRef = useRef(null);

  // Sync audio language when portal language changes
  useEffect(() => {
    if (currentLang) {
      setAudioLang(currentLang);
      // Update greeting if only 1 initial message
      setMessages(prev => {
        if (prev.length === 1 && prev[0].sender === 'ai') {
          return [{ sender: 'ai', text: GREETINGS[currentLang] || GREETINGS.hi }];
        }
        return prev;
      });
    }
  }, [currentLang]);

  // When user changes audio language from dropdown
  const handleAudioLangChange = (newLang) => {
    setAudioLang(newLang);
    // If only initial greeting is present, switch greeting
    setMessages(prev => {
      if (prev.length === 1 && prev[0].sender === 'ai') {
        return [{ sender: 'ai', text: GREETINGS[newLang] || GREETINGS.hi }];
      }
      return prev;
    });
  };

  // Auto-scroll chat body
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen, translationsMap]);

  // Stop audio on close or cleanup
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingIdx(null);
    setIsTranslatingAudio(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
  }, [isOpen, stopAudio]);

  // Play audio in native language (Google TTS + Web Speech API fallback)
  const speakMessage = useCallback(async (msgObj, idx, langCode) => {
    // If already speaking this message, toggle off
    if (speakingIdx === idx) {
      stopAudio();
      return;
    }

    stopAudio();
    setSpeakingIdx(idx);
    setIsTranslatingAudio(true);

    const originalText = msgObj.text || '';
    let textToSpeak = originalText;

    // Check if translation is needed
    const scriptCheck = {
      hi: /[\u0900-\u097F]/,
      mr: /[\u0900-\u097F]/,
      gu: /[\u0A80-\u0AFF]/,
      te: /[\u0C00-\u0C7F]/,
      ta: /[\u0B80-\u0BFF]/,
      bn: /[\u0980-\u09FF]/,
      pa: /[\u0A00-\u0A7F]/,
      kn: /[\u0C80-\u0CFF]/,
      ml: /[\u0D00-\u0D7F]/,
      or: /[\u0B00-\u0B7F]/,
      en: /^[a-zA-Z0-9\s.,!?'"()\-–—:;%#@&*+=/]+$/
    };

    const hasTargetScript = scriptCheck[langCode] ? scriptCheck[langCode].test(originalText) : false;

    // If target is not English, and the message doesn't already have that native script, translate it!
    if (langCode !== 'en' && !hasTargetScript) {
      try {
        const translated = await translateText(originalText, langCode);
        if (translated) {
          textToSpeak = translated;
          setTranslationsMap(prev => ({ ...prev, [idx]: translated }));
        }
      } catch (e) {
        console.warn('Translation before speaking error:', e);
      }
    }

    setIsTranslatingAudio(false);

    const cleaned = cleanTextForSpeech(textToSpeak);
    if (!cleaned) {
      setSpeakingIdx(null);
      return;
    }

    // Attempt 1: Local /api/tts audio proxy (streams natural native MP3 without CORS blocks)
    const chunks = chunkTextForTTS(cleaned);
    let chunkIndex = 0;

    const playWithWebSpeech = () => {
      if (!('speechSynthesis' in window)) {
        setSpeakingIdx(null);
        return;
      }
      window.speechSynthesis.cancel();
      const locale = LANG_LOCALE_MAP[langCode] || 'hi-IN';
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      const matched = voices.find(
        v => v.lang === locale || v.lang.replace('_', '-').toLowerCase() === locale.toLowerCase() || v.lang.startsWith(langCode)
      );
      if (matched) {
        utterance.voice = matched;
        utterance.lang = matched.lang;
      } else {
        utterance.lang = locale;
        if (voices.length > 0) {
          utterance.voice = voices[0];
        }
      }

      utterance.onend = () => setSpeakingIdx(null);
      utterance.onerror = () => setSpeakingIdx(null);
      window.speechSynthesis.speak(utterance);
    };

    const playNextChunk = () => {
      if (chunkIndex >= chunks.length) {
        setSpeakingIdx(null);
        return;
      }
      const chunk = chunks[chunkIndex];
      const audioUrl = `/api/tts?tl=${encodeURIComponent(langCode)}&q=${encodeURIComponent(chunk)}`;
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        chunkIndex++;
        playNextChunk();
      };

      audio.onerror = (e) => {
        console.warn('Local /api/tts chunk playback failed, trying Web Speech:', e);
        playWithWebSpeech();
      };

      audio.play().catch((err) => {
        console.warn('Audio play error, falling back to Web Speech:', err);
        playWithWebSpeech();
      });
    };

    playNextChunk();
  }, [speakingIdx, stopAudio]);

  const handleSend = async (userText) => {
    const textToSend = userText || inputVal;
    if (!textToSend.trim() || isLoading) return;

    stopAudio();

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInputVal('');
    setIsLoading(true);

    const selectedLangObj = SUPPORTED_LANGUAGES.find(l => l.code === audioLang) || currentLangObj;
    const targetLangName = selectedLangObj?.name || 'Hindi';

    const handleSuccessReply = (replyText) => {
      setMessages(prev => {
        const nextMsgs = [...prev, { sender: 'ai', text: replyText, lang: audioLang }];
        const newIdx = nextMsgs.length - 1;
        if (autoSpeak) {
          setTimeout(() => speakMessage({ text: replyText }, newIdx, audioLang), 300);
        }
        return nextMsgs;
      });
      setIsLoading(false);
    };

    // 1. Try backend assistant endpoint
    try {
      const response = await apiClient.post('/assistant/chat', {
        message: textToSend,
        conversationId,
        language: audioLang
      });

      if (response && response.success && response.data) {
        if (response.data.conversationId) {
          setConversationId(response.data.conversationId);
        }
        const replyText = response.data.reply || response.data.answer;
        if (replyText) {
          handleSuccessReply(replyText);
          return;
        }
      }
    } catch {
      // Backend offline -> direct client Groq fallback
    }

    // 2. Direct client fallback using Groq API key
    try {
      const groqKey = import.meta.env.VITE_GROQ_API_KEY || '';
      if (groqKey) {
        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${groqKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: import.meta.env.VITE_GROQ_MODEL || 'openai/gpt-oss-120b',
            messages: [
              {
                role: 'system',
                content: `You are Bharti AI (भारती एआई), an intelligent agricultural and soil health assistant for Indian farmers on the KrishiMitr portal.
The farmer's selected language is ${targetLangName} (${audioLang}).
CRITICAL REQUIREMENT: You MUST write your entire response strictly in ${targetLangName} using native script (e.g. Devanagari for Hindi/Marathi, Gujarati script, etc.), even if the farmer asked or clicked in English.`
              },
              ...messages.slice(-6).map(m => ({
                role: m.sender === 'user' ? 'user' : 'assistant',
                content: m.text
              })),
              { role: 'user', content: textToSend }
            ],
            temperature: 0.6
          })
        });

        if (groqRes.ok) {
          const data = await groqRes.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content && content.trim()) {
            handleSuccessReply(content.trim());
            return;
          }
        }
      }
    } catch {
      // Fallback to offline domain rules
    }

    // 3. Intelligent offline domain fallback (translated per language)
    setTimeout(async () => {
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

      if (audioLang !== 'en') {
        reply = await translateText(reply, audioLang);
      }

      handleSuccessReply(reply);
    }, 400);
  };

  const currentLabels = LISTEN_LABELS[audioLang] || LISTEN_LABELS.en;
  const activeQuickPrompts = QUICK_PROMPTS[audioLang] || QUICK_PROMPTS.hi;

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
          {/* Header */}
          <div className="shc-bharti-chat-header">
            <div className="shc-bharti-chat-title">
              <img src={bhartiAvatar} alt="Bharti AI" className="shc-bharti-chat-avatar" />
              <div>
                <strong>Bharti AI</strong>
                <small>Kisan Soil Health Assistant • Voice Enabled</small>
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

          {/* Voice & Native Language Bar */}
          <div className="shc-voice-header-bar">
            <div className="shc-voice-header-left">
              <Globe size={13} />
              <span>Voice:</span>
              <select
                className="shc-audio-lang-select"
                value={audioLang}
                onChange={(e) => handleAudioLangChange(e.target.value)}
                title="Select Native Voice Language"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.native} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
            <div className="shc-voice-header-right">
              <label className="shc-voice-toggle-label" title="Automatically read incoming answers aloud">
                <input
                  type="checkbox"
                  checked={autoSpeak}
                  onChange={(e) => setAutoSpeak(e.target.checked)}
                />
                <span>Auto-read</span>
              </label>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="shc-bharti-chat-body" ref={chatBodyRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`shc-chat-bubble ${m.sender}`}>
                <div className="shc-chat-text">{m.text}</div>

                {/* Show translated text if user clicked listen and translation was made */}
                {translationsMap[idx] && (
                  <div className="shc-msg-translated">
                    <span className="shc-msg-translated-badge">
                      ✓ {SUPPORTED_LANGUAGES.find(l => l.code === audioLang)?.native || audioLang} Translation:
                    </span>
                    <div>{translationsMap[idx]}</div>
                  </div>
                )}

                {/* Audio Action Bar on AI Responses */}
                {m.sender === 'ai' && (
                  <div className="shc-chat-audio-bar">
                    <button
                      type="button"
                      className={`shc-listen-btn ${speakingIdx === idx ? 'is-speaking' : ''}`}
                      onClick={() => speakMessage(m, idx, audioLang)}
                      title={`Listen in ${SUPPORTED_LANGUAGES.find(l => l.code === audioLang)?.native || 'Native Language'}`}
                    >
                      {speakingIdx === idx ? (
                        isTranslatingAudio ? (
                          <>
                            <Loader2 size={13} className="shc-spin-icon" />
                            <span>{currentLabels.translating}</span>
                          </>
                        ) : (
                          <>
                            <VolumeX size={13} />
                            <span className="shc-sound-wave">
                              <span className="shc-sound-bar"></span>
                              <span className="shc-sound-bar"></span>
                              <span className="shc-sound-bar"></span>
                            </span>
                            <span>{currentLabels.stop}</span>
                          </>
                        )
                      ) : (
                        <>
                          <Volume2 size={13} />
                          <span>{currentLabels.listen}</span>
                        </>
                      )}
                    </button>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
                      🔊 {SUPPORTED_LANGUAGES.find(l => l.code === audioLang)?.native || 'Audio'}
                    </span>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="shc-chat-bubble ai shc-chat-typing">
                <Loader2 size={14} className="shc-spin-icon" style={{ display: 'inline', marginRight: 6 }} />
                <span>Bharti AI is thinking...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="shc-bharti-quick-prompts">
            {activeQuickPrompts.map((q, i) => (
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
              placeholder={audioLang === 'hi' ? 'मिट्टी या फसल के बारे में प्रश्न पूछें...' : 'Ask a question about soil or crops...'}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" aria-label="Send message" disabled={isLoading || !inputVal.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
