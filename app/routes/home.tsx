
// ============= home.tsx =============
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FileText, Upload, Loader2 } from "lucide-react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      const resumes = (await kv.list('resume-*', true)) as KVItem[];
      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);
      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };
    loadResumes();
  }, []);

  return (
    <main className="bg-dark-bg min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading ">
          <h1 className="max-w-4xl gradient-text-neon">Track Your Applications & Resume Ratings</h1>
          {!loadingResumes && resumes?.length === 0 ? (
            <h2 className="max-w-2xl gradient-text-blue">No resumes found. Upload your first resume to get instant <span className="gradient-text-sunset">
              AI-powered feedback
            </span>
            </h2>
          ) : (
            <h2 className="max-w-2xl">Review your submissions and check AI-powered feedback</h2>
          )}
        </div>

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-accent animate-spin" />
            <p className="gradient-text-blue">Loading your resumes...</p>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-12 gap-6 p-12 border-2 border-dashed border-zinc-800 rounded-2xl max-w-2xl">
            <div className="p-6 bg-accent/10 rounded-full">
              <FileText className="w-12 h-12 text-accent" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-white">No Resumes Yet</h3>
              <p className="text-zinc-400">Get started by uploading your first resume</p>
            </div>
            <Link to="/upload" className="primary-button w-auto flex items-center gap-2 text-base">
              <Upload className="w-4 h-4" />
              Upload Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}