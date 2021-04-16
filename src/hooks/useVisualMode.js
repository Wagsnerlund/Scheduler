import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    let newHistory = [...history]
    if (replace) {
      newHistory.pop();
    }
    newHistory = [...newHistory, newMode];
    return setHistory(newHistory);
  }

  const back = function () {
    if (history.length < 2) {
      return setHistory([initial]);
    }
    const newHistory = [...history]
    newHistory.pop();
    setHistory(newHistory);
  }

  const mode = history.slice(-1)[0];

  return { mode, transition, back };
}
