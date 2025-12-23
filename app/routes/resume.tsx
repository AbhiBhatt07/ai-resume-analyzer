import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
// Import some meta data first
export const meta = () => [
    { title: "Resumind | Review" },
    { name: "description", content: "Detailed overview of your resume " },
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

            console.log({ resumeUrl, imageUrl, feedback: data.feedback });

        }
        loadResume();

    }, [id])

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`)
    }, [isLoading])

    return (
        <main className="pt-0!">
            <nav className="resume-nav">
                <Link to='/' className="back-button">
                    <img src="/public/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
                    <span className="text-gray-500 text-sm font-semibold">
                        Back to Homepage
                    </span>
                </Link>
            </nav>
            <div className="flex flex-raw w-full max-lg:flex-col-reverse">
                <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-screen sticky items-center top-0 justify-center">

                    {imgaeUrl && resumeUrl && (
                        <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-full max-wxl:h-fit w-fit">

                            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" >
                                <img src={imgaeUrl} alt="" className="w-full h-full object-contain rounded-2xl" />
                            </a>
                        </div>
                    )}
                </section>
                <section className="feedback-section">
                    <h2 className="text-4xl text-black! font-bold">Resume Review</h2>
                    {feedback ? (
                        <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                            <Summary feedback={feedback} />
                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            <Details feedback={feedback} />
                        </div>
                    ) : (
                        // Loading state gif
                        <img src="/images/resume-scan-2.gif" className="w-1/2" />
                    )}
                </section>
            </div>
        </main>
    )
}

export default resume