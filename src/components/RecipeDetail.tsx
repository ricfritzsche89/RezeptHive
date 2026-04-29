import React, { useState } from 'react';
import { ArrowLeft, Weight, Clock, Play } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onStartPhase: (phaseId: string) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onStartPhase }) => {
  const [targetWeight, setTargetWeight] = useState(recipe.baseWeightGrams);

  const scaleAmount = (amount: number, isScalable: boolean) => {
    if (!isScalable) return amount;
    return (amount / recipe.baseWeightGrams) * targetWeight;
  };

  const formatDuration = (minutes: number) => {
    const days = Math.floor(minutes / (24 * 60));
    const hours = Math.floor((minutes % (24 * 60)) / 60);
    if (days > 0) return `${days} Tage ${hours > 0 ? `${hours} Std.` : ''}`;
    return `${hours} Std.`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-orange-500 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Zurück zur Übersicht</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info & Ingredients */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <h2 className="text-3xl font-black mb-4">{recipe.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
            <div className="flex items-center gap-3 mb-6">
              <Weight className="text-orange-500 w-5 h-5" />
              <h3 className="font-bold">Mengenrechner</h3>
            </div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-2">
              Gewicht des Hauptzutat (g)
            </label>
            <input 
              type="number" 
              value={targetWeight}
              onChange={(e) => setTargetWeight(Number(e.target.value))}
              className="w-full bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <h3 className="font-bold text-xl mb-4">Zutaten</h3>
            <ul className="space-y-3">
              {recipe.ingredients.map(ing => (
                <li key={ing.id} className="flex justify-between items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-300">{ing.name}</span>
                  <span className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    {scaleAmount(ing.amount, ing.isScalable).toLocaleString()} {ing.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Phases/Steps */}
        <div className="lg:col-span-2">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
            <Clock className="w-5 h-5 text-slate-400" />
            Zubereitungsphasen
          </h3>
          <div className="space-y-4">
            {recipe.phases.map((phase, index) => (
              <div 
                key={phase.id}
                className="relative pl-12 pb-8 last:pb-0 group"
              >
                {/* Timeline connector */}
                {index !== recipe.phases.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
                )}
                
                {/* Step indicator */}
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                  {index + 1}
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-900 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-bold text-lg">{phase.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDuration(phase.durationMinutes)}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onStartPhase(phase.id)}
                      className="flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-xl font-bold hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Timer starten</span>
                    </button>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
