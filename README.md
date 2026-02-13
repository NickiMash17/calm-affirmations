# Live Mood Architect

Production-structured monorepo with a FastAPI backend and a React/Vite frontend.

## Canonical Architecture

```text
live-mood-architect/
+- README.md
+- .gitignore
+- backend/
¦  +- main.py
¦  +- requirements.txt
¦  +- .env.example
¦  +- app/
¦     +- __init__.py
¦     +- core/
¦     ¦  +- config.py
¦     ¦  +- safety.py
¦     +- routes/
¦     ¦  +- affirmation.py
¦     ¦  +- health.py
¦     +- schemas/
¦        +- affirmation.py
+- frontend/
   +- index.html
   +- package.json
   +- vite.config.ts
   +- .env.example
   +- src/
      +- main.tsx
      +- App.tsx
      +- pages/
      +- components/
      +- lib/
```

Notes:
- The backend canonical path is `backend/app/routes/affirmation.py`.
- `backend/app/api/routes/affirmations.py` remains as a compatibility shim.

## Separation of Concerns

- `backend/app/core/config.py`: env loading, typed settings, CORS origin parsing.
- `backend/app/core/safety.py`: prompt/safety constants.
- `backend/app/schemas/affirmation.py`: request/response contracts.
- `backend/app/routes/affirmation.py`: HTTP-level behavior and status mapping.
- `backend/app/routes/health.py`: operational health endpoint (`GET /healthz`).
- `frontend/src/lib/api.ts`: network client boundary.

## Environment Variables

Backend (`backend/.env`):

```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TIMEOUT=20
OPENAI_MAX_RETRIES=2
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

Frontend (`frontend/.env`):

```env
VITE_API_BASE=http://localhost:8000
```

## Local Run

Backend:

```bash
cd backend
python -m venv .venv
# PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Root convenience scripts:

```bash
npm run dev:backend
npm run dev:frontend
```

## API Contract

- `POST /api/affirmation`
- `400` for input validation failures
- `502` for upstream model/service failures
- `GET /healthz` for runtime health

## Deployment Checklist

Backend:
- Set `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_TIMEOUT`, `OPENAI_MAX_RETRIES`, `ALLOWED_ORIGINS`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Verify `/docs` and `/healthz`

Frontend:
- Set `VITE_API_BASE` to deployed backend URL
- Rebuild/redeploy after env updates

## Live URLs

- Frontend: https://calm-affirmations-topaz.vercel.app/
- Backend: https://calm-affirmations.onrender.com

## Submission Checklist

- Public GitHub repository link
- Live URL (frontend)
- Backend URL
- Screenshot of hosting provider environment variables (secret value blurred)
- Short note (2-5 bullets): what you would improve with more time
