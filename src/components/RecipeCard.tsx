import React from 'react';
import { Timer, ChevronRight } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  const totalDurationDays = Math.round(
    recipe.phases.reduce((acc, p) => acc + p.durationMinutes, 0) / (24 * 60)
  );

  return (
    <div 
      onClick={() => onClick(recipe)}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-video bg-gradient-to-br from-orange-400 to-red-500 relative flex items-center justify-center overflow-hidden">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-white/20 font-black text-6xl rotate-12 select-none">
            CURE
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold group-hover:text-orange-500 transition-colors">{recipe.title}</h3>
        </div>
        
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Timer className="w-3.5 h-3.5" />
            <span>Gesamtzeit: ~{totalDurationDays} Tage</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};
