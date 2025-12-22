import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/formatSize';

interface FileUploaderProps {
    onFileSelect?: (file: File) => void;
}
const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
const [file, setFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        setFile(file);
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20 MB

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxFiles: 1,
        maxSize: maxFileSize
    })


    // const file = acceptedFiles[0] || null;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='space-y-4 cursor-pointer'>

                    {file ? (
                        <div className='uploader-select-file flex justify-between' onClick={(e) => e.stopPropagation()}>
                            <div className='flex items-center space-x-3'>
                                <img src="/images/pdf.png" alt="pdf" className='size-10' />
                                <div>
                                    <p className='text-sm mx-w-xs text-gray-700 font-medium truncate'>{file.name}</p>
                                    <p className='text-sm text-gray-500'>
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className='p-2 cursor-pointer' onClick={(e) => {
                                setFile(null);
                                e.stopPropagation();
                                onFileSelect?.(null)
                            }}>
                                <img src="/icons/cross.svg" alt="remove" className='w-4 h-4' />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className='mx-auto w-10 h-10 flex items-center justify-center mb-2'>
                                <img src="/icons/info.svg" alt="upload" className='size-20' />
                            </div>
                            <p className='text-lg text-gray-500'>
                                <span className='font-semibold'>Click to upload </span>
                                or drag & drop
                            </p>
                            <p className='text-lg text-gray-500'>PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader