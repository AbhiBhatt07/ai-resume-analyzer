import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const badgeColor = score > 70 ? 'bg-badge-green text-green-600' : score > 49 ? 'bg-badge-yellow text-yellow-600' : 'bg-badge-red text-red-600';

  return (
    <div className={`p-1 rounded-4xl text-sm ${badgeColor}`}>
      <p>{score > 70 ? 'Strong' : score > 49 ? 'Good Start' : 'Needs work'}</p>
    </div>
  );
};

export default ScoreBadge;