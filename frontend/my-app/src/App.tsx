import React, { useState } from 'react';
import FileUploader from './components/FileUploader/FileUploader';
import FileList from './components/FileList/FileList';
import './App.css';
import { UploadedFile } from './Services/fileService';

const App: React.FC = () => {

  // const folderContent = fetch()
  const [folderItem, setFolderContent] = useState<UploadedFile[]>([]);

  const handleFileUpload = (newFile: UploadedFile) => {
    setFolderContent([...folderItem, newFile]);
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>My Drive</h2>
        <ul>
          <li>Files</li>
          <li>Shared with me</li>
          <li>Recent</li>
          <li>Trash</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>React File System</h1>
          <FileUploader onUpload={handleFileUpload} />
        </div>

      {/* File List */}
        <div className="file-grid">
          {folderItem.map((file, index) => (
            <div key={index} className="file-card">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
