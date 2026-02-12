import { useState, useEffect, useCallback } from "react";

/**
 * Typewriter hook — reveals text word by word.
 */
export function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayed("");
      setIsDone(false);
      return;
    }

    setDisplayed("");
    setIsDone(false);

    const words = text.split(" ");
    let current = 0;

    const interval = setInterval(() => {
      current++;
      setDisplayed(words.slice(0, current).join(" "));
      if (current >= words.length) {
        clearInterval(interval);
        setIsDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, isDone };
}
