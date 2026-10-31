import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function ttsProxyPlugin() {
  return {
    name: 'tts-proxy-plugin',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        try {
          const urlObj = new URL(req.url, 'http://localhost');
          const tl = urlObj.searchParams.get('tl') || 'hi';
          const q = urlObj.searchParams.get('q') || '';

          if (!q) {
            res.statusCode = 400;
            res.end('Missing text query');
            return;
          }

          const targetUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(tl)}&client=tw-ob&q=${encodeURIComponent(q)}`;
          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end('Upstream TTS error');
            return;
          }

          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          res.setHeader('Access-Control-Allow-Origin', '*');
          const arrayBuffer = await response.arrayBuffer();
          res.end(Buffer.from(arrayBuffer));
        } catch (err) {
          res.statusCode = 500;
          res.end(err.message || 'TTS Error');
        }
      });

      server.middlewares.use('/api/translate', async (req, res) => {
        try {
          const urlObj = new URL(req.url, 'http://localhost');
          const tl = urlObj.searchParams.get('tl') || 'hi';
          const q = urlObj.searchParams.get('q') || '';
          if (!q) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing query' }));
            return;
          }
          const targetUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(q)}`;
          const response = await fetch(targetUrl);
          if (!response.ok) {
            res.statusCode = response.status;
            res.end(JSON.stringify({ error: 'Upstream error' }));
            return;
          }
          const data = await response.json();
          const translated = data?.[0]?.map(item => item[0]).join('') || q;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ translated }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ttsProxyPlugin()],
})

