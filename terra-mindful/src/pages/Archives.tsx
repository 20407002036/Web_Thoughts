import React from 'react';

const Archives: React.FC = () => {
  const entries = [
    {
      id: 1,
      date: "24",
      month: "OCT",
      title: "A quiet morning by the lake",
      tags: [{ label: 'PEACEFUL', type: 'primary' }, { label: 'NATURE', type: 'tertiary' }],
      excerpt: "I spent about thirty minutes just watching the ripples. No phone, no music, just the sound of the wind. It's interesting how much clarity comes when you stop searching for it...",
      icon: "image"
    },
    {
      id: 2,
      date: "22",
      month: "OCT",
      title: "Navigating the new project stress",
      tags: [{ label: 'WORK', type: 'secondary' }, { label: 'ANXIOUS', type: 'error' }],
      excerpt: "The deadline is looming, and I feel that familiar tightness in my chest. Thoughts suggested I break things down into micro-tasks, which actually helped me sleep better...",
      icon: "mic"
    },
    {
      id: 3,
      date: "21",
      month: "OCT",
      title: "Evening Gratitude List",
      tags: [{ label: 'GRATITUDE', type: 'primary' }],
      excerpt: "1. The smell of fresh coffee. 2. A long conversation with Sarah. 3. Finishing the first draft. It's the small things that actually build the foundation of a good day...",
    },
    {
        id: 4,
        date: "18",
        month: "OCT",
        title: "Sunday Hike Reflections",
        tags: [{ label: 'HEALTH', type: 'primary' }, { label: 'OUTDOORS', type: 'tertiary' }],
        excerpt: "My legs are tired but my mind is clear. There's something about climbing a hill that puts all your smaller problems into perspective. Looking down at the valley, I felt a deep sense of belonging.",
        icon: "landscape"
    },
    {
        id: 5,
        date: "15",
        month: "OCT",
        title: "Late Night Productivity",
        tags: [{ label: 'WORK', type: 'secondary' }, { label: 'FOCUS', type: 'primary' }],
        excerpt: "The house was finally quiet, and I found myself in a state of flow that I haven't experienced in weeks. I realized that my best work happens when the world is asleep.",
    }
  ];

  return (
    <div className="space-y-gutter">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        <div>
          <h2 className="font-h1 text-h2 text-on-surface">Your Archives</h2>
          <p className="font-body-md text-on-surface-variant">5 reflections found this month</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-sm">filter_list</span>
            <select className="bg-transparent border-none focus:ring-0 text-sm font-body-md outline-none cursor-pointer">
              <option>All Time</option>
              <option>This Month</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant mr-2 text-sm">tag</span>
            <select className="bg-transparent border-none focus:ring-0 text-sm font-body-md outline-none cursor-pointer">
              <option>All Tags</option>
              <option>Peaceful</option>
              <option>Work</option>
              <option>Gratitude</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <ArchiveEntryCard key={entry.id} {...entry} />
        ))}
      </div>

      <div className="pt-8 text-center">
         <button className="text-primary font-h3 text-sm hover:underline py-4 px-8 rounded-full border border-primary/20 hover:bg-primary/5 transition-colors">
            Load Older Reflections
         </button>
      </div>
    </div>
  );
};

interface ArchiveEntryCardProps {
  date: string;
  month: string;
  title: string;
  tags: { label: string; type: string }[];
  excerpt: string;
  icon?: string;
}

const ArchiveEntryCard: React.FC<ArchiveEntryCardProps> = ({ date, month, title, tags, excerpt, icon }) => {
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

export default Archives;
