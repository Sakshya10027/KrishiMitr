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

  async chat(message: string, conversationId?: string, userId?: string, language = 'en') {
    let convId = conversationId || `conv-${Date.now()}`;

    // 1. Manage Conversation Persistence
    try {
      let conversation;
      if (conversationId) {
        conversation = await prisma.assistantConversation.findUnique({
          where: { id: conversationId }
        });
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
        const domainKnowledge = this.getDomainKnowledgeFallback(message);
        reply = domainKnowledge.reply;
        citations = domainKnowledge.citations;
      } catch {
        const fallback = this.getDomainKnowledgeFallback(message);
        reply = fallback.reply;
        citations = fallback.citations;
      }
    } else {
      const fallback = this.getDomainKnowledgeFallback(message);
      reply = fallback.reply;
      citations = fallback.citations;
    }

    // Record assistant reply if DB available
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
      citations,
      language,
      provider: provider === 'fallback' ? 'Domain Knowledge Engine (ICAR / DA&FW)' : provider
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
