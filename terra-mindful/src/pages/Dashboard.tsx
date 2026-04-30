import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const chartData = [35, 62, 48, 78, 56, 42, 30];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const firstName = profile?.display_name?.split(' ')[0] || 'Friend';

  return (
    <div className="space-y-5 lg:space-y-6">
      <section className="soft-gradient-bg overflow-hidden rounded-3xl border border-border/50 p-6 sm:p-8 writing-shadow">
        <p className="label-eyebrow mb-3">Daily Prompt</p>
        <h2 className="font-h1 text-h1 text-balance text-on-surface">
          Good morning, {firstName}. What did today teach you about yourself?
        </h2>
        <p className="mt-4 max-w-2xl font-body-lg text-on-surface-variant">
          Take one mindful minute and capture what felt true, difficult, or quietly beautiful.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/record')}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">mic</span>
            Start Reflection
          </button>
          <button
            onClick={() => navigate('/archives')}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-on-surface transition-colors hover:bg-muted"
          >
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            Open Archives
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <article className="md:col-span-7 rounded-3xl border border-border/60 bg-card p-5 writing-shadow">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="label-eyebrow">Weekly Balance</p>
              <h3 className="font-h2 text-h3 text-on-surface">Emotional Rhythm</h3>
            </div>
            <span className="material-symbols-outlined text-muted-foreground">bar_chart</span>
          </div>
          <div className="flex h-40 items-end gap-2 rounded-2xl bg-muted/50 p-4">
            {chartData.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-md ${index === 4 ? 'bg-primary' : 'bg-secondary-fixed-dim/70'}`}
                  style={{ height: `${value}%` }}
                />
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${index === 4 ? 'text-primary' : 'text-muted-foreground'}`}>
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="md:col-span-5 rounded-3xl border border-border/60 bg-primary-container p-5 text-on-primary-container writing-shadow">
          <p className="label-eyebrow text-on-primary-container/70">Focus Insight</p>
          <h3 className="mt-2 font-h2 text-h3">The Gratitude Pattern</h3>
          <p className="mt-3 font-body-md leading-relaxed text-on-primary-container/90">
            You used gratitude language 40% more this week, especially in evening entries. Your tone becomes calmer after sunset.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-on-primary-container/10 p-3">
              <p className="text-2xl font-bold">{profile?.streak_count || 0}</p>
              <p className="label-eyebrow text-on-primary-container/70">Day Streak</p>
            </div>
            <div className="rounded-2xl bg-on-primary-container/10 p-3">
              <p className="text-2xl font-bold">8.4</p>
              <p className="label-eyebrow text-on-primary-container/70">Avg Mood</p>
            </div>
          </div>
        </article>
      </section>

      <section className="rounded-3xl border border-border/60 bg-card p-5 writing-shadow">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="label-eyebrow">Latest Entries</p>
            <h3 className="font-h2 text-h3 text-on-surface">Recent Reflections</h3>
          </div>
          <button
            onClick={() => navigate('/archives')}
            className="rounded-full px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          <EntryCard
            title="A quiet morning by the lake"
            excerpt="I spent thirty minutes watching ripples without my phone. Clarity arrived when I stopped trying to force it."
            mood="Peaceful"
            date="Today"
          />
          <EntryCard
            title="Navigating new project stress"
            excerpt="Breaking work into micro-tasks eased the pressure and helped me sleep better by the end of the day."
            mood="Anxious"
            date="Yesterday"
          />
          <EntryCard
            title="Evening gratitude list"
            excerpt="The small wins mattered most tonight: coffee, a thoughtful conversation, and finishing the first draft."
            mood="Grateful"
            date="2 days ago"
          />
        </div>
      </section>
    </div>
  );
};

interface EntryCardProps {
  title: string;
  excerpt: string;
  mood: string;
  date: string;
}

const EntryCard: React.FC<EntryCardProps> = ({ title, excerpt, mood, date }) => {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-background p-4 transition-colors hover:bg-muted/35 md:flex-row md:items-center md:justify-between">
      <div>
        <h4 className="font-h3 text-[1.05rem] text-on-surface">{title}</h4>
        <p className="mt-1 text-sm text-on-surface-variant">{excerpt}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-secondary-container px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-on-secondary-container">
          {mood}
        </span>
        <span className="text-xs font-medium text-muted-foreground">{date}</span>
      </div>
    </article>
  );
};

export default Dashboard;
