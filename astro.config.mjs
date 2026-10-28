import { defineConfig } from 'astro/config';

// Load OPENROUTER_API_KEY from .env for local dev (`astro dev` / `astro preview`).
// In production the key lives in nginx (see nginx.conf), never in the static build.
try {
  process.loadEnvFile?.('.env');
} catch {
  // no .env file — that's fine
}

const apiKey = process.env.OPENROUTER_API_KEY ?? '';

// Same-origin endpoint used by the Prompt Lab playground:
//   POST /api/llm/chat/completions  ->  https://openrouter.ai/api/v1/chat/completions
// Only the chat endpoint is proxied, so the key can't be used for anything else.
const llmProxy = {
  '^/api/llm/chat/completions$': {
    target: 'https://openrouter.ai',
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/api\/llm/, '/api/v1'),
    headers: {
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      'HTTP-Referer': 'http://localhost:4321',
      'X-Title': 'StarLost Prompt Lab',
    },
  },
};

export default defineConfig({
  vite: {
    server: { proxy: llmProxy },
    preview: { proxy: llmProxy },
  },
});
