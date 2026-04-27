import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { JournalEntry } from '../services/api';

const Review: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  
  // Use state for mood to allow editing if needed, default to what API found
  const [moodScore, setMoodScore] = useState(8);

  useEffect(() => {
    if (location.state && location.state.entry) {
      const journalEntry = location.state.entry as JournalEntry;
      setEntry(journalEntry);
      
      // Attempt to map string mood to a number or use a default
      // This is a simple heuristic since backend returns string mood
      const moodMap: Record<string, number> = {
        'anxious': 3,
        'stressed': 4,
        'tired': 5,
        'neutral': 6,
        'calm': 8,
        'focused': 9,
        'happy': 10
      };
      setMoodScore(moodMap[journalEntry.analysis.mood.toLowerCase()] || 7);
    } else {
      // If no entry is passed, we might want to redirect to dashboard or record
      // For now, let's keep the mock experience if no data
      console.warn('No entry data found in location state');
    }
  }, [location]);

  if (!entry) {
    return (
      <div className="p-card-padding text-center">
        <h2 className="font-h1 text-h2 mb-4">No reflection found</h2>
        <p className="font-body-md text-on-surface-variant mb-8">It looks like you haven't recorded a reflection recently.</p>
        <button 
          onClick={() => navigate('/record')}
          className="bg-primary text-on-primary px-8 py-3 rounded-full font-h3 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
        >
          Go to Record
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-gutter">
      <div className="col-span-12 md:col-span-8 space-y-gutter">
        {/* Transcript Card */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-h3 text-h3">Transcript</h3>
            <button className="text-primary font-h3 text-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit</span> Edit
            </button>
          </div>
          <p className="font-body-lg text-on-surface leading-relaxed italic">
            "{entry.transcript}"
          </p>
        </div>

        {/* Mood Selector Card */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5">
          <h3 className="font-h3 text-h3 mb-8">How did this reflection feel?</h3>
          <div className="space-y-12">
            <div className="flex justify-between px-2 text-4xl">
              <span className={moodScore <= 3 ? 'scale-125 transition-transform' : 'opacity-40'}>😔</span>
              <span className={moodScore > 3 && moodScore <= 5 ? 'scale-125 transition-transform' : 'opacity-40'}>😐</span>
              <span className={moodScore > 5 && moodScore <= 7 ? 'scale-125 transition-transform' : 'opacity-40'}>😌</span>
              <span className={moodScore > 7 && moodScore <= 9 ? 'scale-125 transition-transform' : 'opacity-40'}>🌿</span>
              <span className={moodScore > 9 ? 'scale-125 transition-transform' : 'opacity-40'}>✨</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={moodScore} 
              onChange={(e) => setMoodScore(parseInt(e.target.value))}
              className="w-full h-3 bg-secondary-container rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="text-center font-h3 text-primary text-xl">
              {entry.analysis.mood.toUpperCase()} • {moodScore}/10
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4 space-y-gutter">
        {/* AI Insights Card */}
        <div className="bg-primary-container rounded-xl p-card-padding writing-shadow text-on-primary-container relative overflow-hidden">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>colors_spark</span>
            <span className="font-label-caps text-xs tracking-widest">THOUGHTS INSIGHT</span>
          </div>
          <h3 className="font-h3 text-xl mb-4">{entry.analysis.title || 'Theme Insight'}</h3>
          <p className="font-body-md opacity-90 leading-relaxed mb-8">
            {entry.analysis.summary}
          </p>
          
          {entry.analysis.insights && entry.analysis.insights.length > 0 && (
            <div className="mb-8 space-y-4">
               <p className="font-label-caps text-[10px] opacity-70 uppercase tracking-widest">Key Observation</p>
               <ul className="list-disc pl-4 font-body-md opacity-90 space-y-2">
                 {entry.analysis.insights.map((insight, i) => (
                   <li key={i}>{insight}</li>
                 ))}
               </ul>
            </div>
          )}

          <div className="space-y-3">
            <p className="font-label-caps text-[10px] opacity-70 uppercase tracking-widest">Tags</p>
            <div className="flex flex-wrap gap-2">
              {entry.analysis.themes.map((theme) => (
                <span key={theme} className="bg-on-primary-container/10 px-3 py-1 rounded-full text-xs font-label-caps uppercase">
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-primary text-on-primary py-4 rounded-full font-h3 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all mb-4"
          >
            Save Reflection
          </button>
          <button 
            onClick={() => navigate('/record')}
            className="w-full text-on-surface-variant font-h3 py-4 hover:bg-surface-container rounded-full transition-colors"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
