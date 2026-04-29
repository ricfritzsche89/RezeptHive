import React, { useState, useEffect } from 'react';
import { Clock, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTimers } from '../hooks/useTimers';
import { mockRecipes } from '../data/mockRecipes';
import type { ActiveTimer } from '../types';

export const Dashboard: React.FC = () => {
  const { timers, removeTimer, getRemainingTime } = useTimers();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRefresh(r => r + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (timers.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-400">Keine aktiven Prozesse</h3>
        <p className="text-slate-500">Starte einen Timer in einem Rezept, um ihn hier zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black flex items-center gap-3">
        <Clock className="text-orange-500" />
        Aktive Prozesse
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timers.map(timer => {
          const recipe = mockRecipes.find(r => r.id === timer.recipeId);
          const phase = recipe?.phases.find(p => p.id === timer.phaseId);
          const remaining = getRemainingTime(timer.endTime);
          const isOver = remaining.total <= 0;

          return (
            <div key={timer.id} className={`p-6 rounded-2xl border transition-all ${isOver ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg">{recipe?.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{phase?.title}</p>
                </div>
                <button 
                  onClick={() => removeTimer(timer.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Verbleibende Zeit
                  </p>
                  <div className={`text-2xl font-mono font-black ${isOver ? 'text-green-500' : 'text-orange-500'}`}>
                    {isOver ? (
                      <span className="flex items-center gap-2 text-lg uppercase">
                        <CheckCircle2 className="w-6 h-6" /> Abgeschlossen
                      </span>
                    ) : (
                      `${remaining.days}d ${remaining.hours}h ${remaining.minutes}m ${remaining.seconds}s`
                    )}
                  </div>
                </div>
                {!isOver && (
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg animate-pulse">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
