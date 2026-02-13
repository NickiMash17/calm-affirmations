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

  const controller = new AbortController();
  const timeoutMs = 15000;
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  let response: Response;

  try {
    response = await fetch(`${API_BASE}/api/affirmation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("The request took too long. Please try again.");
    }
    if (err instanceof TypeError) {
      throw new Error("We couldn't reach the affirmation service. Please try again.");
    }
    throw err;
  } finally {
    window.clearTimeout(timeoutId);
  }

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
