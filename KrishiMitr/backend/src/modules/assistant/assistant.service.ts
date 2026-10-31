import { prisma } from '../../config/database.js';
import { env } from '../../config/env.js';

export class AssistantService {
  private getDomainKnowledgeFallback(prompt: string): { reply: string; citations: string[] } {
    const lower = prompt.toLowerCase();

    if (lower.includes('download') || lower.includes('card') || lower.includes('get')) {
      return {
        reply: 'To download your Soil Health Card, navigate to "Get Soil Health Card" (/soilhealthcard) from the navigation bar. Enter your 10-digit registered mobile number or search by State, District, and Farmer Name. You can view your 12-parameter scorecard and click "Print & Download PDF" to get the certified card document.',
        citations: ['Soil Health Card Scheme National Guidelines (DA&FW)']
      };
    }

    if (lower.includes('carbon') || lower.includes('oc')) {
      return {
        reply: 'Soil Organic Carbon (OC) below 0.5% indicates low biological activity and poor nutrient holding capacity. To enhance OC, incorporate 10-12 tonnes/ha of well-decomposed Farm Yard Manure (FYM) or 5 tonnes/ha Vermicompost. In irrigated belts, cultivate green manure crops such as Dhaincha (Sesbania) or Sunnhemp and incorporate them at 45 days before the main crop.',
        citations: ['ICAR-Indian Institute of Soil Science (IISS) Bhopal Technical Bulletin']
      };
    }

    if (lower.includes('stcr') || lower.includes('fertilizer') || lower.includes('recommendation') || lower.includes('dosage')) {
      return {
        reply: 'STCR (Soil Test Crop Response) is ICAR’s precision agronomic calculation approach. Rather than applying generic blanket doses, it calculates exact nutrient requirements (N, P2O5, K2O) and converts them into commercial fertilizers (Urea, DAP, MOP) based on measured soil deficiencies and targeted crop yields.',
        citations: ['All India Coordinated Research Project on Soil Test Crop Response (AICRP-STCR)']
      };
    }

    if (lower.includes('lab') || lower.includes('testing') || lower.includes('stl')) {
      return {
        reply: 'Accredited static and mobile soil testing laboratories can be located under "Find Nearest Soil Testing Lab" (/soilTestingLabs). Filter by your State and District to check laboratory contact numbers, addresses, and sample capacities.',
        citations: ['National Soil Testing Laboratory Directory (GoI)']
      };
    }

    if (lower.includes('natural') || lower.includes('nmnf') || lower.includes('organic') || lower.includes('jeevamrit')) {
      return {
        reply: 'Under the National Mission on Natural Farming (NMNF), chemical inputs are replaced with cow-based bio-inoculants: Jeevamrit (liquid microbial booster), Beejamrit (seed treatment), and Ghanjeevamrit (solid organic base). These formulations stimulate indigenous soil microflora and earthworm activity.',
        citations: ['Operational Guidelines on National Mission on Natural Farming (DA&FW)']
      };
    }

    if (lower.includes('ph') || lower.includes('acidic') || lower.includes('alkaline')) {
      return {
        reply: 'Soil pH represents soil reaction. Values between 6.5 and 7.5 are optimal for nutrient uptake. Strongly acidic soils (pH < 5.5) require Agricultural Lime or Dolomite @ 2 to 4 tonnes/ha. Alkaline / sodic soils (pH > 8.5) benefit from Gypsum application followed by leaching.',
        citations: ['Central Soil Salinity Research Institute (ICAR-CSSRI) Karnal Advisory']
      };
    }

    if (lower.includes('zinc') || lower.includes('zn') || lower.includes('sulphur') || lower.includes('boron')) {
      return {
        reply: 'Micronutrients like Zinc and Boron are critical for enzymatic activity and grain setting. In Zinc-deficient soils (<0.6 ppm), broadcast 25 kg/ha Zinc Sulphate (21%) at sowing. In Sulphur-deficient soils (<10 ppm), incorporate 20 kg/ha elemental sulphur or 150 kg/ha Gypsum.',
        citations: ['ICAR Micronutrient Research Bulletin (MSNP)']
      };
    }

    return {
      reply: 'Namaste! As Bharti AI, your Soil Health Assistant, I can assist you with understanding your Soil Health Card test parameters, calculating fertilizer doses, adopting natural farming practices, and locating soil laboratories. Please ask your specific agronomic question.',
      citations: ['Department of Agriculture & Farmers Welfare, Ministry of Agriculture & Farmers Welfare, GoI']
    };
  }

  private async callLLM(
    message: string,
    history: Array<{ role: 'user' | 'assistant'; content: string }> = [],
    language = 'en'
  ): Promise<{ reply: string; citations: string[] }> {
    const provider = env.AI_PROVIDER;
    const apiKey = env.AI_API_KEY;
    if (!apiKey) {
      throw new Error('AI API key is missing');
    }

    let baseUrl = env.AI_BASE_URL || 'https://api.groq.com/openai/v1';
    if (provider === 'groq' || provider === 'grok') {
      if (!baseUrl || baseUrl === '') {
        baseUrl = 'https://api.groq.com/openai/v1';
      }
    }
    baseUrl = baseUrl.replace(/\/+$/, '');

    const model = env.AI_MODEL || 'openai/gpt-oss-120b';

    const langMap: Record<string, string> = {
      hi: 'Hindi (हिन्दी) in Devanagari script',
      mr: 'Marathi (मराठी) in Devanagari script',
      gu: 'Gujarati (ગુજરાતી) in Gujarati script',
      te: 'Telugu (తెలుగు) in Telugu script',
      ta: 'Tamil (தமிழ்) in Tamil script',
      bn: 'Bengali (বাংলা) in Bengali script',
      pa: 'Punjabi (ਪੰਜਾਬੀ) in Gurmukhi script',
      kn: 'Kannada (ಕನ್ನಡ) in Kannada script',
      ml: 'Malayalam (മലയാളം) in Malayalam script',
      or: 'Odia (ଓଡ଼ିଆ) in Odia script',
      en: 'English'
    };
    const targetLangName = langMap[language] || (language === 'en' ? 'English' : 'Hindi (हिन्दी) in Devanagari script');

    const systemPrompt = `You are Bharti AI (भारती एआई), the official intelligent virtual assistant for KrishiMitr and the National Soil Health Card Scheme under the Ministry of Agriculture & Farmers Welfare, Government of India.
Your mission is to guide Indian farmers, agronomists, extension officers, and citizens with warm, empathetic, practical, and scientifically sound agricultural advice.

Core Domain Guidelines:
1. Greet warmly (e.g. "Namaste Kisan Bhai / Farmer!" or "नमस्ते किसान भाई!").
2. Core Expertise:
   - Soil Health Card (SHC) parameters: pH, Organic Carbon (OC), Nitrogen (N), Phosphorus (P), Potassium (K), Sulphur (S), Zinc (Zn), Boron (B), Iron (Fe), Manganese (Mn), Copper (Cu).
   - STCR (Soil Test Crop Response) precision fertilizer calculations (Urea, DAP, MOP, SSP) based on soil test results and crop targets.
   - Natural & organic farming practices under National Mission on Natural Farming (NMNF): Jeevamrit, Beejamrit, Ghanjeevamrit, Neemastra, and crop rotation.
   - Soil amendments: Lime/Dolomite for acidic soils (pH < 6.0), Gypsum for sodic/alkaline soils (pH > 8.5), Farm Yard Manure (FYM) and green manuring (Dhaincha/Sanai) for low organic carbon.
   - Soil testing laboratory (STL) procedures, sample collection steps (V-shaped cut 0-15 cm), and card download process on the KrishiMitr portal.
3. Language & Script Enforcement:
   - The user's active regional language is: ${targetLangName}.
   - CRITICAL REQUIREMENT: You MUST write your ENTIRE response in ${targetLangName}. Even if the farmer types or clicks their question in English, address their question and reply completely in ${targetLangName}.
4. Tone & Format: Respectful, encouraging, well-structured with clear bullet points, practical dosages in kg/acre or kg/hectare, and easily actionable steps. Keep explanations concise and farmer-friendly.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-6),
      { role: 'user', content: message }
    ];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.6
        }),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API responded with ${response.status}: ${errorText}`);
      }

      const json: any = await response.json();
      const content = json?.choices?.[0]?.message?.content;
      if (!content || !content.trim()) {
        throw new Error('Empty response from AI model');
      }

      return {
        reply: content.trim(),
        citations: [
          'ICAR - Indian Institute of Soil Science (IISS)',
          'Soil Health Card Scheme (DA&FW, MoA&FW)',
          'National Mission on Natural Farming (NMNF)'
        ]
      };
    } catch (err) {
      clearTimeout(timeout);
      throw err;
    }
  }

  async chat(message: string, conversationId?: string, userId?: string, language = 'en') {
    let convId = conversationId || `conv-${Date.now()}`;
    let history: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    // 1. Manage Conversation Persistence
    try {
      let conversation;
      if (conversationId) {
        conversation = await prisma.assistantConversation.findUnique({
          where: { id: conversationId },
          include: {
            messages: {
              orderBy: { createdAt: 'asc' },
              take: 8
            }
          }
        });
        if (conversation?.messages) {
          history = conversation.messages.map(m => ({
            role: m.sender === 'USER' ? ('user' as const) : ('assistant' as const),
            content: m.message
          }));
        }
      }

      if (!conversation) {
        conversation = await prisma.assistantConversation.create({
          data: {
            userId: userId || null,
            title: message.slice(0, 40) + '...'
          }
        });
      }
      convId = conversation.id;

      // Record user message
      await prisma.assistantMessage.create({
        data: {
          conversationId: convId,
          sender: 'USER',
          message: message.trim(),
          language
        }
      });
    } catch {
      // Disconnected resilience
    }

    let reply = '';
    let citations: string[] = [];
    const provider = env.AI_PROVIDER;

    // Check external AI provider if configured, else use domain knowledge engine
    if (provider !== 'fallback' && env.AI_API_KEY) {
      try {
        const aiResult = await this.callLLM(message, history, language);
        reply = aiResult.reply;
        citations = aiResult.citations;
      } catch (err: any) {
        console.warn(`[Bharti AI] AI Provider error: ${err?.message || err}. Falling back to domain knowledge.`);
        const fallback = this.getDomainKnowledgeFallback(message);
        reply = fallback.reply;
        citations = fallback.citations;
      }
    } else {
      const fallback = this.getDomainKnowledgeFallback(message);
      reply = fallback.reply;
      citations = fallback.citations;
    }

    try {
      await prisma.assistantMessage.create({
        data: {
          conversationId: convId,
          sender: 'ASSISTANT',
          message: reply,
          language,
          citations
        }
      });
    } catch {
      // Disconnected resilience
    }

    return {
      conversationId: convId,
      reply,
      answer: reply,
      citations,
      language,
      provider: provider === 'fallback' ? 'Domain Knowledge Engine (ICAR / DA&FW)' : `${provider} (${env.AI_MODEL})`
    };
  }

  async getConversation(id: string) {
    return prisma.assistantConversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });
  }
}
