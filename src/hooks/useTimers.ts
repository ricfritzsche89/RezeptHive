import { useState, useEffect } from 'react';
import type { ActiveTimer } from '../types';

export const useTimers = () => {
  const [timers, setTimers] = useState<ActiveTimer[]>(() => {
    const saved = localStorage.getItem('curing_timers');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('curing_timers', JSON.stringify(timers));
  }, [timers]);

  const startTimer = (recipeId: string, phaseId: string, durationMinutes: number) => {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

    const newTimer: ActiveTimer = {
      id: Math.random().toString(36).substr(2, 9),
      recipeId,
      phaseId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status: 'running'
    };

    setTimers(prev => [...prev, newTimer]);
    return newTimer;
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const getRemainingTime = (endTimeIso: string) => {
    const total = Date.parse(endTimeIso) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { total, days, hours, minutes, seconds };
  };

  return { timers, startTimer, removeTimer, getRemainingTime };
};
