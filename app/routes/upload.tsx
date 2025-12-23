
// ============= upload.tsx =============
import React, { useState, type FormEvent } from 'react';
import Navbar from '~/components/Navbar';
import FileUploader from '~/components/FileUploader';
import { usePuterStore } from '~/lib/puter';
import { convertPdfToImage } from '~/lib/pdf2img';
import { generateUUID } from '~/lib/utils';
import { prepareInstructions } from '../../constants';
import { useNavigate } from 'react-router';
import { Loader2, Sparkles } from 'lucide-react';

const Upload = () => {
  const { auth, ai, kv, fs, isLoading } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setfile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setfile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText('Uploading the file...');

    const uploadedFIle = await fs.upload([file]);
    if (!uploadedFIle) return setStatusText('Error: failed to upload file');

    setStatusText('Converting to image...');

    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to Image');

    setStatusText('Uploading the image...');

    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText('Error: failed to upload image');

    setStatusText('Preparing data...');

    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFIle.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: '',
    };
    await kv.set(`resume-${uuid}`, JSON.stringify(data));

    setStatusText('Analyzing resume... This may take a few minutes.');

    const feedback = await ai.feedback(uploadedFIle.path, prepareInstructions({ jobTitle, jobDescription }));

    if (!feedback) return setStatusText('Error: Failed to analyze resume');

    const feedbackText =
      typeof feedback.message.content === 'string'
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume-${uuid}`, JSON.stringify(data));
    setStatusText('Analysis complete! Redirecting...');
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest('form');
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get('company-name') as string;
    const jobTitle = formData.get('job-title') as string;
    const jobDescription = formData.get('job-description') as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-dark-bg min-h-screen">
      <Navbar />
      <section className="main-section py-20">
        <div className="page-heading">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
            <h1>Smart Feedback for Your Dream Job</h1>
          </div>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-6">
              <Loader2 className="w-12 h-12 text-accent animate-spin" />
              <h2>{statusText}</h2>
            </div>
          ) : (
            <h2>Upload your resume for an instant ATS score and improvement tips</h2>
          )}
        </div>

        {!isProcessing && (
          <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 max-w-2xl w-full">
            <div className="form-div">
              <label htmlFor="company-name">Company Name</label>
              <input type="text" name="company-name" placeholder="Enter company name" id="company-name" />
            </div>
            <div className="form-div">
              <label htmlFor="job-title">Job Title</label>
              <input type="text" name="job-title" placeholder="Enter job title" id="job-title" />
            </div>
            <div className="form-div">
              <label htmlFor="job-description">Job Description</label>
              <textarea rows={5} name="job-description" placeholder="Paste the job description here" id="job-description" />
            </div>
            <div className="form-div">
              <label htmlFor="uploader">Upload Resume</label>
              <FileUploader onFileSelect={handleFileSelect} />
            </div>
            <button className="primary-button mt-4" type="submit" disabled={!file}>
              Analyze Resume
            </button>
          </form>
        )}
      </section>
    </main>
  );
};

export default Upload;
