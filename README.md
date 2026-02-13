# Calm Affirmations
Live Mood Architect – Technical Challenge Submission

A full-stack AI web app that generates short, supportive therapeutic affirmations.

## Overview
Calm Affirmations is a gentle, supportive space that turns a user's name and feelings into a short, encouraging affirmation. It's designed to feel calm and personal while staying non-clinical and safe. The OpenAI API powers the affirmation generation, and the UI focuses on clarity, comfort, and responsiveness. The app avoids giving medical advice and responds safely to sensitive inputs.

## How it works
1. Enter your name
2. Describe how you're feeling
3. Click **Generate affirmation**
4. Get a short, supportive message tailored to your input

## Live URLs
* Frontend: https://calm-affirmations-topaz.vercel.app/
* Backend: https://calm-affirmations.onrender.com

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

* Frontend: React + Vite + TypeScript, Tailwind CSS, shadcn/ui
* Backend: Python + FastAPI
* AI: OpenAI API
* Deploy: Vercel (frontend), Render (backend)

## Features
* Clean, responsive UI
* Name + feeling inputs (with quick-select feeling chips)
* Loading states and friendly error handling
* Safe, non-clinical therapeutic affirmations
* Proper HTTP status codes for errors
* CORS configured for deployed frontend

## Project Structure

```
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
* `POST /api/affirmation`
   * Request: `{ "name": string, "feeling": string }`
   * Response: `{ "affirmation": string }`
   * Errors: `400` for validation, `502/504` for upstream failures
* `GET /healthz`

## Environment Variables
Backend (`backend/.env`)

```
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TIMEOUT=20
OPENAI_MAX_RETRIES=2
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

Frontend (`frontend/.env`)

```
VITE_API_BASE=http://localhost:8000
```

## Run Locally
Backend

```
cd backend
python -m venv .venv
# PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Frontend

```
cd frontend
npm install
npm run dev
```

Root Convenience Scripts

```
npm run dev:backend
npm run dev:frontend
```

## Deployment Notes
Backend (Render)
* Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
* Set env vars in Render dashboard: `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_TIMEOUT`, `OPENAI_MAX_RETRIES`, `ALLOWED_ORIGINS`
* Verify `/docs` and `/healthz`

Frontend (Vercel)
* Set `VITE_API_BASE` to the deployed backend URL
* Rebuild/redeploy after env updates

## Safety & Prompt Guidance
* Affirmations are supportive and non-clinical.
* No medical/legal advice, no diagnosis.
* If self-harm intent is detected, respond safely and encourage seeking professional help.
* Responses are short (2–4 sentences), warm, and specific to the user's input.

## With More Time
* Add user accounts or optional local storage so people can save their favorite affirmations.
* Expand the Journal area into a light daily check-in with reminders and mood trends.
* Add multilingual support to make the experience more inclusive.
* Run a small usability test to refine tone, copy, and accessibility details.

## Challenge Submission Details
* ✅ Public GitHub repository link: https://github.com/NickiMash17/calm-affirmations
* ✅ Live URL (frontend): https://calm-affirmations-topaz.vercel.app/
* ✅ Live URL (backend): https://calm-affirmations.onrender.com
* Screenshot of hosting provider environment variable configuration (secret value blurred) – attached in submission.
* ✅ Short note (2–5 bullets): what I would improve with more time

## Author
Built by Nicolette Mashaba  
GitHub: https://github.com/NickiMash17  
Portfolio: https://nicmash-porfolio.vercel.app/

---

Made by Nicolette Mashaba with ❤️ for mental well-being.