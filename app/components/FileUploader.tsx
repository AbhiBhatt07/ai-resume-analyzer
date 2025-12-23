// ============= FileUploader.tsx =============
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X } from "lucide-react";
import { formatSize } from '~/lib/utils';

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

  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: maxFileSize,
  });

  return (
    <div className="w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer ${
            isDragActive
              ? 'border-accent bg-accent/5'
              : 'border-zinc-800 hover:border-zinc-700 bg-dark-card'
          }`}
        >
          {file ? (
            <div
              className="flex justify-between items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-zinc-500">{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                onClick={(e) => {
                  setFile(null);
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-accent/10 rounded-full">
                <Upload className="w-8 h-8 text-accent" />
              </div>
              <div>
                <p className="text-base text-zinc-300 mb-1">
                  <span className="font-semibold text-white">Click to upload</span> or
                  drag & drop
                </p>
                <p className="text-sm text-zinc-500">PDF (max {formatSize(maxFileSize)})</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;