import { PAGE_PHRASES, PARAGRAPH_TRANSLATIONS } from './pageTranslations';

// WeakMap to store original English text of nodes
const originalTextMap = new WeakMap();
const originalAttrMap = new WeakMap();

// Master translation resolver
export function getTranslatedString(englishText, lang) {
  if (!englishText || lang === 'en') return englishText;

  const trimmed = englishText.trim();
  if (!trimmed) return englishText;

  // 1. Direct paragraph match
  if (PARAGRAPH_TRANSLATIONS[trimmed] && PARAGRAPH_TRANSLATIONS[trimmed][lang]) {
    return englishText.replace(trimmed, PARAGRAPH_TRANSLATIONS[trimmed][lang]);
  }

  // 2. Direct phrase match
  if (PAGE_PHRASES[trimmed] && PAGE_PHRASES[trimmed][lang]) {
    return englishText.replace(trimmed, PAGE_PHRASES[trimmed][lang]);
  }

  // 3. Case-insensitive lookup
  const lowerTrimmed = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(PAGE_PHRASES)) {
    if (key.toLowerCase() === lowerTrimmed && val[lang]) {
      return englishText.replace(trimmed, val[lang]);
    }
  }

  return null;
}

let isTranslating = false;

// Function to translate the whole DOM tree
export function translateDOM(container, lang) {
  if (!container || isTranslating) return;

  isTranslating = true;

  try {
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          if (!node || !node.parentNode) return NodeFilter.FILTER_REJECT;
          const parentTag = node.parentNode.nodeName.toUpperCase();
          if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'].includes(parentTag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (node.parentNode.classList && node.parentNode.classList.contains('notranslate')) {
            return NodeFilter.FILTER_REJECT;
          }
          if (!node.nodeValue || !node.nodeValue.trim()) {
            return NodeFilter.FILTER_SKIP;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let currentNode = walker.nextNode();
    while (currentNode) {
      // Record original text
      if (!originalTextMap.has(currentNode)) {
        originalTextMap.set(currentNode, currentNode.nodeValue);
      }

      const origText = originalTextMap.get(currentNode);

      if (lang === 'en') {
        if (currentNode.nodeValue !== origText) {
          currentNode.nodeValue = origText;
        }
      } else {
        const translated = getTranslatedString(origText, lang);
        if (translated && currentNode.nodeValue !== translated) {
          currentNode.nodeValue = translated;
        }
      }

      currentNode = walker.nextNode();
    }

    // Translate input placeholders
    const inputs = container.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(input => {
      if (!originalAttrMap.has(input)) {
        originalAttrMap.set(input, { placeholder: input.getAttribute('placeholder') || '' });
      }
      const orig = originalAttrMap.get(input).placeholder;
      if (lang === 'en') {
        input.setAttribute('placeholder', orig);
      } else {
        const trans = getTranslatedString(orig, lang);
        if (trans) input.setAttribute('placeholder', trans);
      }
    });

  } catch (err) {
    console.error('DOM Translation Error:', err);
  } finally {
    isTranslating = false;
  }
}
