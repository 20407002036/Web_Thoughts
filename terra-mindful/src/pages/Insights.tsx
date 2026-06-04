import React from 'react';

const Insights: React.FC = () => {
  return (
    <div className="space-y-5 lg:space-y-6">
      <section className="rounded-3xl border border-border/60 bg-card p-5 writing-shadow sm:p-6">
        <p className="label-eyebrow">Reflection Analytics</p>
        <h2 className="mt-2 font-h1 text-h2 text-on-surface">Your Weekly Insights</h2>
        <p className="mt-2 max-w-2xl text-sm text-on-surface-variant sm:text-base">
          A gentle view of your emotional rhythm, recurring themes, and where your energy has shifted.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="rounded-3xl border border-border/60 bg-card p-5 writing-shadow">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
            </div>
            <h3 className="font-h2 text-h3 text-on-surface">Emotional Momentum</h3>
          </div>
          <p className="text-sm text-on-surface-variant sm:text-base">
            Mood language increased by 15% over the last three days, especially around presence, nature, and gratitude.
          </p>
          <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-secondary-container">
            <div className="h-full w-[65%] bg-primary" />
          </div>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">65% Positive Resonance</p>
        </article>

        <article className="rounded-3xl border border-border/60 bg-card p-5 writing-shadow">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary/10">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology_alt</span>
            </div>
            <h3 className="font-h2 text-h3 text-on-surface">Recurring Themes</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Presence', 'Growth', 'Gratitude', 'Balance', 'Mindfulness', 'Connection'].map((theme) => (
              <span key={theme} className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-on-surface">
                {theme}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-primary-container p-6 text-on-primary-container writing-shadow">
        <div className="absolute -right-10 -top-10 opacity-15">
          <span className="material-symbols-outlined text-[180px]">auto_awesome</span>
        </div>
        <div className="relative z-10 max-w-2xl">
          <p className="label-eyebrow text-on-primary-container/65">Deep Dive</p>
          <h3 className="mt-2 font-h1 text-h2">The Quiet Pattern</h3>
          <p className="mt-3 font-body-lg leading-relaxed text-on-primary-container/90">
            Your evening entries mention quiet and stillness twice as often as morning ones. This may be your best window for meaningful reflection.
          </p>
          <button className="mt-5 rounded-full bg-on-primary-container px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-primary-container transition-opacity hover:opacity-90">
            Explore This Pattern
          </button>
        </div>
      </section>
    </div>
  );
};

export default Insights;
