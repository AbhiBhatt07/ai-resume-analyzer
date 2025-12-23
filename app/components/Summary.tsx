// ============= Summary.tsx =============
import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "./ScoreBadge";
import { TrendingUp } from "lucide-react";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70 ? 'text-emerald-500' : score > 49 ? 'text-amber-500' : 'text-red-500';

  return (
    <div className="resume-summary">
      <div className="flex flex-row gap-3 items-center">
        <p className="text-base font-medium text-zinc-300">{title}</p>
        <ScoreBadge score={score} />
      </div>
      <p className="text-lg font-semibold">
        <span className={textColor}>{score}/100</span>
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-dark-card border border-zinc-800 rounded-xl shadow-lg hover:border-zinc-700 transition-all duration-300">
      <div className="flex flex-row items-center p-6 gap-8 border-b border-zinc-800">
        <ScoreGauge score={feedback.overallScore} />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold text-white">Your Resume Score</h2>
          </div>
          <p className="text-sm text-zinc-400">
            Calculated based on the categories below
          </p>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
        <Category title="Content" score={feedback.content.score} />
        <Category title="Structure" score={feedback.structure.score} />
        <Category title="Skills" score={feedback.skills.score} />
        <Category title="ATS Compatibility" score={feedback.ATS.score} />
      </div>
    </div>
  );
};

export default Summary;