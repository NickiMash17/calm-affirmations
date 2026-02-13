const rawApiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";
const API_BASE = rawApiBase.replace(/\/+$/, "");

export async function createAffirmation(payload) {
  const res = await fetch(`${API_BASE}/api/affirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.detail || "Something went wrong. Please try again.");
  }
  return data;
}

