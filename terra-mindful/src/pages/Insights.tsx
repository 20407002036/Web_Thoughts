import React from 'react';

const Insights: React.FC = () => {
  return (
    <div className="space-y-gutter">
      <div className="px-2">
        <h2 className="font-h1 text-h2 text-on-surface">Your Insights</h2>
        <p className="font-body-md text-on-surface-variant">Thoughts analysis of your patterns this week.</p>
      </div>

      <div className="grid grid-cols-12 gap-gutter">
        {/* Insight Card 1 */}
        <div className="col-span-12 md:col-span-6 bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
            <h3 className="font-h3 text-xl">Emotional Momentum</h3>
          </div>
          <p className="font-body-md text-on-surface-variant mb-6">
            Your mood scores have increased by 15% over the last 3 days. This correlates with your increased mention of "nature" and "walking."
          </p>
          <div className="h-2 w-full bg-secondary-container rounded-full overflow-hidden">
             <div className="h-full bg-primary w-[65%]"></div>
          </div>
          <p className="mt-2 text-[10px] font-label-caps text-on-surface-variant uppercase">65% Positive Resonance</p>
        </div>

        {/* Insight Card 2 */}
        <div className="col-span-12 md:col-span-6 bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-tertiary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology_alt</span>
            </div>
            <h3 className="font-h3 text-xl">Core Themes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Presence', 'Growth', 'Gratitude', 'Work-Life Balance', 'Mindfulness', 'Connection'].map((theme, i) => (
              <span 
                key={theme} 
                className="bg-surface-container px-4 py-2 rounded-full text-sm font-body-md"
                style={{ opacity: 1 - (i * 0.1) }}
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Deep Dive Card */}
        <div className="col-span-12 bg-primary-container rounded-xl p-card-padding writing-shadow text-on-primary-container relative overflow-hidden">
           <div className="relative z-10 max-w-2xl">
              <h3 className="font-h2 text-h2 mb-4">The "Silence" Pattern</h3>
              <p className="font-body-lg opacity-90 leading-relaxed mb-6">
                You've mentioned "quiet" and "silence" in your last 4 evening entries. Thoughts notices that these reflections are 2x longer than your morning ones. It seems your most profound insights emerge after the world settles down.
              </p>
              <button className="bg-on-primary-container text-primary-container px-8 py-3 rounded-full font-label-caps tracking-widest text-xs">
                 EXPLORE THIS PATTERN
              </button>
           </div>
           <div className="absolute right-0 top-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-[200px]">auto_awesome</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
