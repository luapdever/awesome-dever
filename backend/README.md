# PaulBot — module NestJS

Cerveau du chatbot du portfolio. Le front (PaulBrain OS) ne parle jamais au LLM
directement : il passe soit par le **proxy Next** (`/api/chat`, mode SSR), soit
**directement** par ce backend (mode SPA). La **clé LLM ne vit que côté Nest**.

## Intégration dans ton app Nest existante

1. Copie le dossier `paulbot/` dans `src/` de ton backend.
2. Importe le module :

```ts
// app.module.ts
import { PaulbotModule } from "./paulbot/paulbot.module";

@Module({ imports: [PaulbotModule] })
export class AppModule {}
```

3. Endpoint exposé : `POST /paulbot/chat`
   Body : `{ "messages": [{ "role": "user", "content": "..." }], "lang": "fr" }`
   Réponse : `text/plain` en **streaming** (token par token).

## Variables d'environnement (backend)

```
LLM_BASE_URL=https://api.groq.com/openai/v1     # défaut Groq
LLM_MODEL=llama-3.3-70b-versatile
LLM_API_KEY=gsk_...                              # clé Groq (console.groq.com)
```

Bascule Ollama plus tard (aucun changement de code) :

```
LLM_BASE_URL=http://ollama:11434/v1
LLM_MODEL=llama3.1
LLM_API_KEY=ollama
```

## CORS (obligatoire seulement en mode SPA direct)

Si le front appelle Nest en direct (`NEXT_PUBLIC_CHAT_URL`), autorise son origine :

```ts
// main.ts
app.enableCors({ origin: ["https://luap-dever.netlify.app", "http://localhost:3010"] });
```

En mode proxy SSR (`/api/chat`), le CORS est inutile (même origine).

## Câblage front

| Mode | Variable (front) | Cible |
|---|---|---|
| SSR / proxy | `CHAT_API_URL` (serveur Next) | `http://api:4000/paulbot/chat` |
| SPA direct | `NEXT_PUBLIC_CHAT_URL` (build front) | `https://ton-api/paulbot/chat` |

## RAG plus tard

Quand le blog / la doc grossiront, ne modifie que `paul.context.ts`
(`buildSystemPrompt`) : ajoute-y le retrieval (embeddings `nomic-embed-text`
via Ollama + `sqlite-vec`/`pgvector`). Le controller, le service et le front
ne changent pas.
