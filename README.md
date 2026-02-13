# Calm Affirmations

A full-stack AI web app that generates short, supportive therapeutic affirmations.

[![Frontend](https://img.shields.io/badge/Frontend-Vite%20%2B%20React%20%2B%20TypeScript-61DAFB?style=flat&logo=react&logoColor=white)](./frontend)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](./backend)
[![AI](https://img.shields.io/badge/AI-OpenAI%20API-000000?style=flat&logo=openai&logoColor=white)](https://platform.openai.com/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%2B%20Render-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

## Overview

**Calm Affirmations** is a gentle, supportive space that turns a user’s name and feelings into a short, encouraging affirmation. It is designed to feel calm and personal while staying non‑clinical and safe. The OpenAI API powers the affirmation generation, and the UI focuses on clarity, comfort, and responsiveness.

## Live URLs

- **Frontend:** https://calm-affirmations-topaz.vercel.app/
- **Backend:** https://calm-affirmations.onrender.com

## Tech Stack

- **Frontend:** React + Vite + TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Python + FastAPI
- **AI:** OpenAI API
- **Deploy:** Vercel (frontend), Render (backend)

## Features

- Clean, responsive UI
- Name + feeling inputs (with quick-select feeling chips)
- Loading states and friendly error handling
- Safe, non‑clinical therapeutic affirmations
- Proper HTTP status codes for errors
- CORS configured for deployed frontend

## Project Structure

```text
calm-affirmations/
├─ README.md
├─ backend/
│  ├─ main.py
│  ├─ requirements.txt
│  ├─ .env.example
│  └─ app/
│     ├─ core/
│     │  ├─ config.py
│     │  └─ safety.py
│     ├─ routes/
│     │  ├─ affirmation.py
│     │  └─ health.py
│     └─ schemas/
│        └─ affirmation.py
└─ frontend/
   ├─ index.html
   ├─ package.json
   ├─ vite.config.ts
   ├─ .env.example
   └─ src/
      ├─ main.tsx
      ├─ App.tsx
      ├─ pages/
      ├─ components/
      └─ lib/
```

## API Contract

- `POST /api/affirmation`
  - Request: `{ "name": string, "feeling": string }`
  - Response: `{ "affirmation": string }`
  - Errors: `400` for validation, `502/504` for upstream failures
- `GET /healthz`

## Environment Variables

**Backend** (`backend/.env`)

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TIMEOUT=20
OPENAI_MAX_RETRIES=2
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

**Frontend** (`frontend/.env`)

```env
VITE_API_BASE=http://localhost:8000
```

## Run Locally

### Backend

```bash
cd backend
python -m venv .venv
# PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Root Convenience Scripts

```bash
npm run dev:backend
npm run dev:frontend
```

## Deployment Notes

### Backend (Render)

- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Set env vars in Render dashboard: `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_TIMEOUT`, `OPENAI_MAX_RETRIES`, `ALLOWED_ORIGINS`
- Verify `/docs` and `/healthz`

### Frontend (Vercel)

- Set `VITE_API_BASE` to the deployed backend URL
- Rebuild/redeploy after env updates

## Safety & Prompt Guidance

- Affirmations are supportive and non‑clinical.
- No medical/legal advice, no diagnosis.
- If self‑harm intent is detected, respond safely and encourage seeking professional help.
- Responses are short (2–4 sentences), warm, and specific to the user’s input.

## With More Time

- Add user accounts or optional local storage so people can save their favorite affirmations.
- Expand the Journal area into a light daily check‑in with reminders and mood trends.
- Add multilingual support to make the experience more inclusive.
- Run a small usability test to refine tone, copy, and accessibility details.

## Submission Checklist

- ✅ Public GitHub repository link: https://github.com/NickiMash17/calm-affirmations
- ✅ Live URL (frontend): https://calm-affirmations-topaz.vercel.app/
- ✅ Live URL (backend): https://calm-affirmations.onrender.com
- 📸 Screenshot of hosting provider environment variable configuration (secret value blurred) - *See guides below*
- ✅ Short note (2–5 bullets): what you would improve with more time


## Author

- **GitHub:** https://github.com/NickiMash17/calm-affirmations
- **Portfolio:** https://nicmash-porfolio.vercel.app/
