import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    setHistory(prev => {
      if (replace) {
        return [...prev.slice(0, -1), newMode];
      } else {
        return [...prev, newMode];
      }
    });
  }
  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0]);
    }

  }

  return { mode, transition, back };
};