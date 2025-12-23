// ============= ATS.tsx =============
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  const getScoreColor = () => {
    if (score > 69) return "text-emerald-500";
    if (score > 49) return "text-amber-500";
    return "text-red-500";
  };

  const getIconAndLabel = () => {
    if (score > 69) {
      return { icon: CheckCircle2, label: "Excellent ATS Score", color: "text-emerald-500" };
    }
    if (score > 49) {
      return { icon: AlertCircle, label: "Moderate ATS Score", color: "text-amber-500" };
    }
    return { icon: AlertCircle, label: "Needs Improvement", color: "text-red-500" };
  };

  const { icon: Icon, label, color } = getIconAndLabel();

  return (
    <div className="bg-dark-card border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all duration-300">
      <div className="mb-6 flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-zinc-900 ${color}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">ATS Score</h2>
            <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}/100</span>
          </div>
          <p className="text-sm text-zinc-400">{label}</p>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-zinc-800">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
          <div>
            <h3 className="mb-2 font-semibold text-white text-sm">Optimize for ATS Systems</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              ATS (Applicant Tracking Systems) scan your resume for keywords and formatting. 
              Improving your ATS score increases your chances of passing automated screening.
            </p>
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm mb-4">Recommendations</h4>
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              {suggestion.type === "good" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              )}
              <span className="text-sm text-zinc-300">{suggestion.tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ATS;