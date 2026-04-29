import { useState, useEffect } from 'react'
import { Utensils, Moon, Sun, Plus, Activity, LayoutGrid, Clock } from 'lucide-react'
import { RecipeCard } from './components/RecipeCard'
import { RecipeDetail } from './components/RecipeDetail'
import { Dashboard } from './components/Dashboard'
import { mockRecipes } from './data/mockRecipes'
import { useTimers } from './hooks/useTimers'
import type { Recipe } from './types'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [activeTab, setActiveTab] = useState<'recipes' | 'dashboard'>('recipes')
  const { timers, startTimer } = useTimers()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const handleStartPhase = (phaseId: string) => {
    if (!selectedRecipe) return;
    const phase = selectedRecipe.phases.find(p => p.id === phaseId);
    if (!phase) return;

    startTimer(selectedRecipe.id, phase.id, phase.durationMinutes);
    setActiveTab('dashboard');
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-24">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => { setSelectedRecipe(null); setActiveTab('recipes'); }}
          >
            <div className="bg-orange-500 p-2 rounded-lg shadow-lg shadow-orange-500/20">
              <Utensils className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-black tracking-tight">RezeptHive</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              {darkMode ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {selectedRecipe ? (
          <RecipeDetail 
            recipe={selectedRecipe} 
            onBack={() => setSelectedRecipe(null)} 
            onStartPhase={handleStartPhase}
          />
        ) : activeTab === 'recipes' ? (
          <>
            <section className="mb-12">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight">
                Meisterhafte Rezepte. <br />Präzise Timer.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg">
                Vom Pökeln bis zum Räuchern – alles an einem Ort perfekt im Griff.
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={setSelectedRecipe} 
                />
              ))}

              <button className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-all cursor-pointer group bg-white/50 dark:bg-slate-900/50">
                <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-orange-50">
                  <Plus className="w-8 h-8" />
                </div>
                <span className="font-bold">Neues Rezept</span>
              </button>
            </div>
          </>
        ) : (
          <Dashboard />
        )}
      </main>

      {/* Navigation Tab Bar */}
      {!selectedRecipe && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-2 rounded-2xl shadow-2xl flex gap-2">
            <button 
              onClick={() => setActiveTab('recipes')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'recipes' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Entdecken</span>
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all relative ${activeTab === 'dashboard' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
              <Clock className="w-5 h-5" />
              <span>Prozesse</span>
              {timers.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {timers.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      )}
    </div>
  )
}

export default App
