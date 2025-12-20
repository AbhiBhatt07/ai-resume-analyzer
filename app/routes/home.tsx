import ResumeCard from "~/components/ResumeCard";
import { resumes } from "../../constants/";
import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    { name: "description", content: "Smart Feedbake for you dream job!" },
  ];
}

export default function Home() {

  const { auth } = usePuterStore()
  const navigate = useNavigate();

  // Redirect to next page if authenticated 
  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/')
  }, [auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-seciton">
        <div className="page-heading py-16">
          <h1 className="sm:max-w-3xl">
            Track Your Application & Resume Ratings
          </h1>
          <h2>Review your submissions and check AI-powered feedback.</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
