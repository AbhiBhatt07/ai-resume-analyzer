// ============= ResumeCard.tsx =============
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import { Briefcase, FileText } from "lucide-react";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const [resumeUrl, setResumeUrl] = useState('');
  const { fs } = usePuterStore();

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-500"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-3 flex-1">
          {companyName && (
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-bold text-white">{companyName}</h2>
            </div>
          )}
          {jobTitle && (
            <h3 className="text-sm text-zinc-400 ml-6">{jobTitle}</h3>
          )}
          {!companyName && !jobTitle && (
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <h2 className="text-lg font-bold text-white">Resume</h2>
            </div>
          )}
        </div>
        <div className="shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      {resumeUrl && (
        <div className="overflow-hidden rounded-xl border border-zinc-800 group-hover:border-zinc-700 transition-all duration-300 animate-in fade-in duration-500">
          <img
            src={resumeUrl}
            alt="resume"
            className="w-full h-[300px] object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;