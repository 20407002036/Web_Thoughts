import React from 'react';

const entries = [
  {
    id: 1,
    title: 'A quiet morning by the lake',
    excerpt: 'I spent thirty minutes watching ripples. The silence made room for clarity and steadiness.',
    date: 'Apr 30, 2026',
    mood: 'Peaceful',
    type: 'image',
  },
  {
    id: 2,
    title: 'Navigating project stress',
    excerpt: 'Breaking everything into tiny next steps reduced my anxiety and gave me momentum.',
    date: 'Apr 29, 2026',
    mood: 'Anxious',
    type: 'voice',
  },
  {
    id: 3,
    title: 'Evening gratitude list',
    excerpt: 'Coffee, connection, and progress. I felt grounded by simple moments again.',
    date: 'Apr 28, 2026',
    mood: 'Grateful',
    type: 'text',
  },
  {
    id: 4,
    title: 'Sunday hike reflections',
    excerpt: 'Physical effort quieted mental noise. Distance gave me a healthier perspective.',
    date: 'Apr 25, 2026',
    mood: 'Calm',
    type: 'image',
  },
];

const Archives: React.FC = () => {
  return (
    <div className="space-y-5 lg:space-y-6">
      <section className="rounded-3xl border border-border/60 bg-card p-5 writing-shadow">
        <p className="label-eyebrow">Library</p>
        <h2 className="mt-2 font-h1 text-h2 text-on-surface">Your Archives</h2>
        <p className="mt-2 text-sm text-on-surface-variant sm:text-base">Browse your past reflections and revisit meaningful moments.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground">All</button>
          <button className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-on-surface">Voice</button>
          <button className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-on-surface">Text</button>
          <button className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-on-surface">Images</button>
        </div>
      </section>

      <section className="space-y-3">
        {entries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-3xl border border-border/60 bg-card p-5 writing-shadow transition-colors hover:bg-muted/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="label-eyebrow">{entry.date}</p>
                <h3 className="mt-1 font-h2 text-h3 text-on-surface">{entry.title}</h3>
              </div>
              <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-on-secondary-container">
                {entry.mood}
              </span>
            </div>

            <p className="mt-3 text-sm text-on-surface-variant sm:text-base">{entry.excerpt}</p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-[15px]">
                {entry.type === 'voice' ? 'mic' : entry.type === 'image' ? 'image' : 'article'}
              </span>
              <span>{entry.type}</span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Archives;
