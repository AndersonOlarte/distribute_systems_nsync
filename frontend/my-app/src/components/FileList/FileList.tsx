import React from 'react';
import { FaFolder, FaTrash, FaShareAlt } from 'react-icons/fa';




interface FileListProps {
  files: UploadedFile[];
}

interface UploadedFile {
  name: string;
  url: string;
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <div className="file-list">
      <h2>Your Files</h2>
      {files.map((file, index) => (
        <div key={index} className="file-list-item">
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
          // Dentro de la barra lateral:
<ul>
  <li><FaFolder /> Files</li>
  <li><FaShareAlt /> Shared with me</li>
  <li>Recent</li>
  <li><FaTrash /> Trash</li>
</ul>
        </div>
      ))}
    </div>
  );
};

export default FileList;
