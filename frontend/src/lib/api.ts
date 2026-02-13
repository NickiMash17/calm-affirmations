const rawApiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";
const API_BASE = rawApiBase.replace(/\/+$/, "");

export interface AffirmationRequest {
  name: string;
  feeling: string;
}

export interface AffirmationResponse {
  affirmation: string;
}

export interface ApiError {
  detail: string;
}

export async function generateAffirmation(
  data: AffirmationRequest
): Promise<AffirmationResponse> {
  if (API_BASE.includes("your-backend.onrender.com")) {
    throw new Error(
      "Backend URL is not configured. Set VITE_API_BASE in frontend/.env to your running backend, e.g. http://localhost:8000."
    );
  }

  const response = await fetch(`${API_BASE}/api/affirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let message = "Something unexpected happened. Please try again in a moment.";
    try {
      const err: ApiError = await response.json();
      if (err.detail) message = err.detail;
    } catch {
      message = `Request failed (${response.status}). Check backend at ${API_BASE}.`;
    }
    throw new Error(message);
  }

  return response.json();
}
