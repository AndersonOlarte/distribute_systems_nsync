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
      <form action="http://localhost:3000/v1/users/1/folders/1/document" method="post" encType="multipart/form-data">
        <input type="file" name="newFile"onChange={handleFileChange}/>
        <button type="submit" className="button" onClick={handleUpload}>Upload file</button>
    </form>
    </div>
  );
};

export default FileUploader;
