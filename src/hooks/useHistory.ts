import { useState, useCallback } from 'react';

const HISTORY_LIMIT = 10;

interface HistoryState {
  history: string[];
  index: number;
}

export function useHistory(initialState: string) {
   const [{ history, index }, setState] = useState<HistoryState>({
    history: [initialState],
    index: 0,
  });

  const state = history[index] ?? '';

  const push = useCallback((newState: string) => {
    setState(prev => {
      const trimmed = prev.history.slice(0, prev.index + 1);
      const nextHistory = [...trimmed, newState].slice(-HISTORY_LIMIT);

      return {
        history: nextHistory,
        index: nextHistory.length - 1,
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState(prev => ({
      ...prev,
      index: Math.max(0, prev.index - 1),
    }));
  }, []);

  const redo = useCallback(() => {
    setState(prev => ({
      ...prev,
      index: Math.min(prev.history.length - 1, prev.index + 1),
    }));
  }, []);

  return {
    state,
    push,
    undo,
    redo,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
  };
}