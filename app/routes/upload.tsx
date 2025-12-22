import React, { useState, type FormEvent } from 'react'
import Navbar from '~/components/Navbar'
import FileUploader from '~/components/FileUploader'
import { usePuterStore } from '~/lib/puter'
import { convertPdfToImage } from '~/lib/pdf2img'
import { generateUUID } from '~/lib/formatSize'
import { prepareInstructions } from '../../constants'
const Upload = () => {
    const { auth, ai, kv, fs, isLoading } = usePuterStore();

    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setfile] = useState<File | null>(null)


    const handleFileSelect = (file: File | null) => {
        setfile(file)
    }

    const handleAnalyze = async (
        { companyName, jobTitle, jobDescription, file }:
            { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {

        setIsProcessing(true);
        setStatusText('Uploading the file.....')

        const uploadedFIle = await fs.upload([file]);
        if (!uploadedFIle) return setStatusText('Error: failed to upload file');

        setStatusText('Converting to image...')

        const imageFile = await convertPdfToImage(file);
        // console.log the when the error comes
        console.log(imageFile);
        
        if (!imageFile.file) return setStatusText('Error: Failed to convert PDF to Image')
        

        setStatusText('Uploading the image....')

        const uploadedImage = await fs.upload([imageFile.file]);
        if (!uploadedImage) return setStatusText('Error: failed to upload image');

        setStatusText('Preparing data....')

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFIle.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume-${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing resume.... This may take a few minutes.')

        const feedback = await ai.feedback(
            uploadedFIle.path,
            prepareInstructions({ jobTitle, jobDescription })
        )

        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);

        await kv.set(`resume-${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete! Redirecting to results page...');
        console.log(data);

    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file })
    }

    return (
        <main className="bg-url[('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className='main-section p-8'>
                <div className='page-heading'>
                    <h1>Smart feedback for your dream job</h1>
                    {
                        isProcessing ? (
                            <>
                                <h2>{statusText}</h2>
                                <img src="/images/resume-scan.gif" className='w-1/5' />
                            </>
                        ) : (
                            <h2>Drop your resume for an ATS score & improvment tips</h2>
                        )
                    }
                    {
                        !isProcessing && (
                            <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-4 max-w-2xl'>
                                <div className='form-div'>
                                    <label htmlFor="company-name">Company Name</label>
                                    <input type="text" name='company-name' placeholder='Company Name' id='company-name' />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor="job-title">Job Title</label>
                                    <input type="text" name='job-title' placeholder='Job Title' id='job-title' />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor="job-description">Job Description</label>
                                    <textarea rows={5} name='job-description' placeholder='Job Description' id='job-description' />
                                </div>
                                <div className='form-div'>
                                    <label htmlFor="uploader">Upload Resume</label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>
                                <button className='primary-button' type='submit'>
                                    Analyze Resume
                                </button>
                            </form>
                        )
                    }
                </div>
            </section>
        </main>
    )
}

export default Upload