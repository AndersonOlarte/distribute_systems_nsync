import React, { useState } from 'react';
import { uploadFile } from '../../Services/fileService';

interface FileUploaderProps {
  onUpload: (file: UploadedFile) => void;
}

interface UploadedFile {
  name: string;
  url: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const uploadedFile = await uploadFile(file);
      onUpload(uploadedFile);
    }
  };

  return (
    <div>
      <h2>Upload a file</h2>
      <input type="file" onChange={handleFileChange} />
      <button className="button" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
