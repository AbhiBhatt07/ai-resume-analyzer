

// ============= resume.tsx =============
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imgaeUrl, setImageUrl] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume-${id}`);
      if (!resume) return;
      const data = JSON.parse(resume as string);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };
    loadResume();
  }, [id]);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  return (
    <main className="pt-0 bg-dark-bg min-h-screen">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <ArrowLeft className="w-4 h-4" />
          <span className="gradient-text-purple">Back to Dashboard</span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-dark-bg lg:h-screen lg:sticky lg:top-0 flex items-center justify-center">
          {imgaeUrl && resumeUrl ? (
            <div className="animate-in fade-in duration-1000 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300 w-full h-full lg:h-[90vh]">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="relative group block h-full">
                <img src={imgaeUrl} alt="resume preview" className="w-full h-full object-contain bg-zinc-900" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-medium">Open Full Resume</span>
                  </div>
                </div>
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-3xl font-bold text-white">Resume <span className="gradient-text-purple">
            Analysis </span></h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
              <p className="text-zinc-400">Analyzing your resume...</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;