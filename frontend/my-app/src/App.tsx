import React, { useEffect, useState } from 'react';
import FileUploader from './components/FileUploader/FileUploader';
import FileList from './components/FileList/FileList';
import './App.css';
import { UploadedFile } from './Services/fileService';
import FolderContent from './components/FolderContent/FolderContent';
import { IFolderContent } from './helpers/interfaces';
import StickyHeadTable from './components/table/MainTable';

const App: React.FC = () => {



  const [userId, setUserId] = useState<string>();
  const [folderId, setFolderId] = useState<number>();
  const [folderContent, setCurrentFolderContent] = useState<IFolderContent[]>();

  useEffect(() => {
        localStorage.setItem('userid', '1');
        const storedUser = '1';
        if (storedUser) {
          setUserId(storedUser);
        }
    const getRootFolderContent = async () => {
      const response = await fetch(`http://localhost:3001/v1/users/${storedUser}/folders/root-folder`);
      const responseJson = await response.json();
      setCurrentFolderContent(responseJson.folder);
    };

    getRootFolderContent();
  }, []);

  

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
          <FolderContent folderContent={folderContent}></FolderContent>
          {/* {folderItem.map((file, index) => (
            <div key={index} className="file-card">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </div>
          ))} */}
        </div>
        <section className="table-container">
          <StickyHeadTable folderContent={folderContent} ></StickyHeadTable>
        </section>
      </div>
    </div>
  );
};

export default App;
