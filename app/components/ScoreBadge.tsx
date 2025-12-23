// ============= ScoreBadge.tsx =============
import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const badgeStyle =
    score > 70
      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      : score > 49
        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        : 'bg-red-500/10 text-red-500 border-red-500/20';

  const label = score > 70 ? 'Strong' : score > 49 ? 'Good Start' : 'Needs Work';

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${badgeStyle}`}>
      {label}
    </div>
  );
};

export default ScoreBadge;