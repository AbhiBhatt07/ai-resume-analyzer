interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  // Determine gradient background based on score
  const getBackgroundGradient = () => {
    if (score > 69) return "from-green-100";
    if (score > 49) return "from-yellow-100";
    return "from-red-100";
  };

  // Determine icon and label based on score
  const getIconAndLabel = () => {
    if (score > 69) {
      return {
        icon: "/icons/ats-good.svg",
        label: "Good ATS Score",
      };
    }
    if (score > 49) {
      return {
        icon: "/icons/ats-warning.svg",
        label: "Moderate ATS Score",
      };
    }
    return {
      icon: "/icons/ats-bad.svg",
      label: "Low ATS Score",
    };
  };

  const { icon, label } = getIconAndLabel();
  const backgroundGradient = getBackgroundGradient();

  return (
    <div
      className={`rounded-lg bg-gradient-to-br ${backgroundGradient} to-white p-6 shadow-md border border-gray-200`}
    >
      {/* Top Section with Icon and Headline */}
      <div className="mb-4 flex items-start gap-4">
        <img
          src={icon}
          alt={label}
          className="h-12 w-12 flex-shrink-0"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            ATS Score - {score}/100
          </h2>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-6 border-t border-gray-300 pt-4">
        <h3 className="mb-2 font-semibold text-gray-800">
          Optimize for ATS Systems
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          ATS (Applicant Tracking Systems) scan your resume for keywords and
          formatting. Improving your ATS score increases your chances of passing
          automated screening and reaching human recruiters.
        </p>
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <div className="mb-6">
          <h4 className="mb-3 font-semibold text-gray-800">Suggestions</h4>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3">
                <img
                  src={
                    suggestion.type === "good"
                      ? "/icons/check.svg"
                      : "/icons/warning.svg"
                  }
                  alt={suggestion.type}
                  className="mt-0.5 h-5 w-5 flex-shrink-0"
                />
                <span className="text-sm text-gray-700">
                  {suggestion.tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Closing Line */}
      <div className="border-t border-gray-300 pt-4">
        <p className="text-sm font-medium text-gray-800 italic">
          Implement these suggestions to improve your resume's ATS compatibility
          and increase your chances of success.
        </p>
      </div>
    </div>
  );
};

export default ATS