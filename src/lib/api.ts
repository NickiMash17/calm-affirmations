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
      // use default message
    }
    throw new Error(message);
  }

  return response.json();
}
