# Prompt Lab (AI Engineer 101)

A separate section of the site at `/prompt-lab`, next to the blog (sidebar tab "Prompt Lab").

| Page | Path |
| --- | --- |
| Overview: what a prompt is + the 8-point checklist | `/prompt-lab` |
| Section 1: pick the better prompt (left vs right) | `/prompt-lab/quiz` |
| Section 2: prompt playground with a free OpenRouter model | `/prompt-lab/playground` |

## How the AI calls work

The browser calls `POST /api/llm/chat/completions` on the same site. nginx adds the OpenRouter
key and forwards only that endpoint to `https://openrouter.ai/api/v1/chat/completions`. The key
is never in the static build or the browser. The default model is `openrouter/free`
(OpenRouter's Free Models Router, which picks an available free model).

Each playground run makes 2 requests: the answer, then the AI Coach analysis (students can turn
the automatic coach off in the analysis window).

Students can optionally paste their own OpenRouter key in the playground settings; it stays in
their browser's localStorage and calls OpenRouter directly, with its own limits.

## Setup

1. Create a key at https://openrouter.ai/settings/keys.
2. **Lock the key down before adding credits.** The proxy forwards the request body as-is, so a
   visitor who edits the request could ask for a paid model on your key. The playground blocks
   non-free models on the shared key, but that check runs in the browser and can be bypassed.
   In OpenRouter, create a Guardrail for this key with:
   - a model allowlist of free models only (test that `openrouter/free` still works with it), and
   - a small budget (for example $0–1).
   See https://openrouter.ai/docs/guides/features/guardrails
3. `cp .env.example .env`, put the key in `OPENROUTER_API_KEY`, and optionally set
   `LAB_ACCESS_CODE` to a class code (letters and digits). Give the code to students in class.
4. Local dev: `npm run dev`. `astro.config.mjs` proxies only `/api/llm/chat/completions` to
   OpenRouter using `.env` (the class code isn't checked in dev).
5. Production: `docker compose up -d --build`. Compose passes both values to the nginx
   container, which renders `nginx.conf` as a template at start-up. Compose refuses to start
   if `OPENROUTER_API_KEY` is missing from `.env` (this also applies to `down`/`logs`).

## Free-tier limits to plan a class around

OpenRouter's free-model limits apply to the whole **account**, not per key, and every student
using the site shares them:

- 20 requests per minute. With the coach on, that's about 10 playground runs per minute for
  the entire class.
- 50 requests per day, or 1,000 per day once the account has ever bought $10 of credits.
  For a full class on the shared key, the one-time $10 top-up is effectively required
  (do step 2 first).
- Alternatives: have students create their own free OpenRouter keys and paste them in the
  playground settings, or ask them to switch the automatic coach off while experimenting.

nginx also limits each visitor IP to 30 requests/min (burst 20). Students on one classroom
network share an IP, so the OpenRouter limits above usually bite first.
