import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  return (
    <div className="space-y-gutter">
      {/* Greeting & Hero Section */}
      <section className="relative h-[280px] rounded-xl overflow-hidden flex items-center p-card-padding soft-gradient-bg">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-h1 text-h1 text-on-surface mb-2">Good morning, {profile?.display_name?.split(' ')[0] || 'Friend'}.</h2>
          <p className="font-body-lg text-on-surface-variant max-w-md">Your mind is a garden. What will you plant in your journal today?</p>
        </div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-40">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkP-HgXgmwM8HcZ2ZCDbmRTqha5tCudDKOpRNGkbAsoFHxGVtXto9bm5Xto8E8oSmAsYKFXPkNMy2uVuVOB50kJMFY8ERWeY8dBa1HvpP8Fxi59IiswdzNgCpSoiLnk5A8BW0THjB049wVaZJWlK1jFGAymNAoPq8dwiBYAjcrQxSgKOywUgjjwS_DTfSHiOPQfSWpA0nH9cUZPWd0bl_4Xmol3PUOZxFxO_ig-nyFdiuc9LQWfWK8qTtoa4Cs6OHCdzSsxJAamNM" 
            style={{ maskImage: 'linear-gradient(to left, black, transparent)' }}
            alt="Soft focused green leaves"
          />
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Quick Record Card */}
        <div className="col-span-12 md:col-span-4 bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5 flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-xl transition-all duration-300">
          <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <span className="material-symbols-outlined text-on-secondary-container text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
          </div>
          <h3 className="font-h3 text-h3 text-on-surface mb-2">Quick Record</h3>
          <p className="font-body-md text-on-surface-variant mb-6">Capture a voice reflection in the moment.</p>
          <button 
            onClick={() => navigate('/record')}
            className="bg-primary px-8 py-3 rounded-full text-on-primary font-label-caps tracking-widest flex items-center gap-2"
          >
            START ENTRY
          </button>
        </div>

        {/* Daily Reflection Prompt Card */}
        <div className="col-span-12 md:col-span-8 bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <span className="material-symbols-outlined text-9xl">auto_awesome</span>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full mb-6">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>colors_spark</span>
                <span className="font-label-caps text-[10px]">AI INSIGHT PROMPT</span>
              </div>
              <h3 className="font-h2 text-h2 text-on-surface leading-snug">"Looking back at your week, what was a moment that felt surprisingly effortless?"</h3>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <p className="font-body-md text-on-surface-variant italic">12 other people are reflecting on this today.</p>
              <button className="text-primary font-h3 text-sm flex items-center gap-1 hover:underline">
                Write now <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Weekly Mood Chart */}
        <div className="col-span-12 md:col-span-7 bg-surface-container-lowest rounded-xl p-card-padding writing-shadow border border-outline-variant/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-h3 text-h3 text-on-surface">Weekly Balance</h3>
              <p className="font-body-md text-on-surface-variant">Your emotional resonance over the last 7 days.</p>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">more_horiz</span>
          </div>
          <div className="flex items-end justify-between h-48 gap-4 px-4">
            {[
              { day: 'MON', height: 'h-[40%]' },
              { day: 'TUE', height: 'h-[75%]' },
              { day: 'WED', height: 'h-[55%]' },
              { day: 'THU', height: 'h-[90%]' },
              { day: 'FRI', height: 'h-[65%]', active: true },
              { day: 'SAT', height: 'h-[45%]' },
              { day: 'SUN', height: 'h-[30%]' },
            ].map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-2 flex-1 group">
                <div className={`w-full ${d.active ? 'bg-primary' : 'bg-secondary-fixed-dim/30'} rounded-t-lg transition-all ${d.height} group-hover:opacity-80`}></div>
                <span className={`font-label-caps text-[10px] ${d.active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Stats/Summary */}
        <div className="col-span-12 md:col-span-5 bg-primary-container rounded-xl p-card-padding writing-shadow text-on-primary-container relative overflow-hidden">
          <h3 className="font-h3 text-h3 mb-4">Focus Insight</h3>
          <p className="font-body-lg opacity-90 leading-relaxed mb-8">
            You've mentioned "gratitude" and "peace" 40% more this week than last. Your evening reflections show a consistent trend of decompression.
          </p>
          <div className="flex gap-4">
            <div className="flex-1 bg-on-primary-container/10 p-4 rounded-lg">
              <span className="block text-2xl font-bold">{profile?.streak_count || 0}</span>
              <span className="text-xs uppercase tracking-widest opacity-70">Day Streak</span>
            </div>
            <div className="flex-1 bg-on-primary-container/10 p-4 rounded-lg">
              <span className="block text-2xl font-bold">8.4</span>
              <span className="text-xs uppercase tracking-widest opacity-70">Avg Mood</span>
            </div>
          </div>
        </div>

        {/* Recent Entries Section */}
        <div className="col-span-12 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-h2 text-h2 text-on-surface">Recent Reflections</h3>
            <button className="text-primary font-h3 text-sm hover:underline">View All Archives</button>
          </div>
          <div className="space-y-4">
            <EntryCard 
              date="24" 
              month="OCT" 
              title="A quiet morning by the lake" 
              tags={[{ label: 'PEACEFUL', type: 'primary' }, { label: 'NATURE', type: 'tertiary' }]}
              excerpt="I spent about thirty minutes just watching the ripples. No phone, no music, just the sound of the wind. It's interesting how much clarity comes when you stop searching for it..."
              icon="image"
            />
            <EntryCard 
              date="22" 
              month="OCT" 
              title="Navigating the new project stress" 
              tags={[{ label: 'WORK', type: 'secondary' }, { label: 'ANXIOUS', type: 'error' }]}
              excerpt="The deadline is looming, and I feel that familiar tightness in my chest. Thoughts suggested I break things down into micro-tasks, which actually helped me sleep better..."
              icon="mic"
            />
            <EntryCard 
              date="21" 
              month="OCT" 
              title="Evening Gratitude List" 
              tags={[{ label: 'GRATITUDE', type: 'primary' }]}
              excerpt="1. The smell of fresh coffee. 2. A long conversation with Sarah. 3. Finishing the first draft. It's the small things that actually build the foundation of a good day..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface EntryCardProps {
  date: string;
  month: string;
  title: string;
  tags: { label: string; type: string }[];
  excerpt: string;
  icon?: string;
}

const EntryCard: React.FC<EntryCardProps> = ({ date, month, title, tags, excerpt, icon }) => {
  const getTagClass = (type: string) => {
    switch (type) {
      case 'primary': return 'bg-primary/10 text-primary';
      case 'tertiary': return 'bg-tertiary/10 text-tertiary';
      case 'secondary': return 'bg-secondary-container text-on-secondary-container';
      case 'error': return 'bg-error/10 text-error';
      default: return 'bg-stone-100 text-stone-600';
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 writing-shadow border border-outline-variant/5 flex items-start gap-8 group cursor-pointer hover:bg-surface-container-low transition-colors">
      <div className="flex flex-col items-center min-w-[80px]">
        <span className="text-h2 font-h2 text-stone-300 group-hover:text-primary transition-colors">{date}</span>
        <span className="font-label-caps text-on-surface-variant uppercase">{month}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-h3 text-lg text-on-surface">{title}</h4>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <span key={tag.label} className={`${getTagClass(tag.type)} text-[10px] px-2 py-0.5 rounded-full font-label-caps`}>
                {tag.label}
              </span>
            ))}
          </div>
        </div>
        <p className="font-body-md text-on-surface-variant line-clamp-2 max-w-3xl">
          {excerpt}
        </p>
      </div>
      <div className="flex items-center gap-4">
        {icon && <span className="material-symbols-outlined text-stone-300">{icon}</span>}
        <span className="material-symbols-outlined text-stone-400">more_vert</span>
      </div>
    </div>
  );
};

export default Dashboard;
