import React, { useEffect, useState } from 'react';
import FileUploader from './components/FileUploader/FileUploader';
import './App.css';
import { UploadedFile } from './Services/fileService';
import FolderContent from './components/FolderContent/FolderContent';
import { IDisplayFolders, IFolderContent, IFolderContentProps, IOperator } from './helpers/interfaces';
import StickyHeadTable from './components/table/MainTable';
import { FILE_MICROSERVICE_URL, GOV_CARPETA_URL, USER_MICROSERVICE_URL } from './url';
import exampleOperatorsJson from './helpers/responseOperators.json';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';

const App: React.FC = () => {


  const [userId, setUserId] = useState<string>('1');
  const [folderId, setFolderId] = useState<number>(0);
  const [folderContentItems, setCurrentFolderContent] = useState<IFolderContent[]>([]);
  const [operators, setOperators] = useState<IOperator[]>([]);
  const [transferURL, setTransferURL] = useState<string>('');

  useEffect(() => {
        localStorage.setItem('userid', '23423');
        const storedUser = '23423';
        if (storedUser) {
          setUserId(storedUser);
        }
    const getRootFolderContent = async () => {
      try {
        const response = await fetch(`${FILE_MICROSERVICE_URL}/v1/users/${storedUser}/folders/root-folder`);
        const responseJson = await response.json();
        setCurrentFolderContent(responseJson.folder);
      } catch (error) {
        console.error('Error fetching folder content:', error);
      }
    };

    getRootFolderContent();
  }, [userId]);

  useEffect(() => {
    const getOperators = async () => {
      const setDataFromJson = (operators: IOperator[]) => {
        operators.map((operator)=> {
          const operatorData: IOperator = {
            participants: operator.participants,
            _id: operator._id,
            operatorName: operator.operatorName,
            transferAPIURL: operator.transferAPIURL
          }
          setOperators([operatorData, ...operators]);
        } )   
      }
      try {
        const response = await fetch(`${GOV_CARPETA_URL}/apis/getOperators`);
        const responseJson: IOperator[] = await response.json();
        setDataFromJson(responseJson);
      } catch (error) {
        console.log('there was an error retriving operators. Using mock data: ',error);     
        setDataFromJson(exampleOperatorsJson);
      }
    };
    getOperators();
  }, [])


  const onClickTransferOperator = (event:any) => {
    try {
      console.log('url: ', transferURL);
      fetch(`${USER_MICROSERVICE_URL}/v1/users/${userId}}/transfer`,
        {
          method: 'POST',
          body: JSON.stringify({url: transferURL})
        }
      )
      alert('transfer reques sent to operator');
    } catch (error) {
      
      alert('There was an issue sending transfer request');
    }

  }

  const [folderItem, setFolderContent] = useState<UploadedFile[]>([]);

  const handleFileUpload = (newFile: UploadedFile) => {
    setFolderContent([...folderItem, newFile]);
  };

  const folderContentProperties: IDisplayFolders = {
    folderContent: folderContentItems ?? [],
    setFolderContent: setCurrentFolderContent ,
    folderId: folderId,
    userId: userId,
    setFolderId: setFolderId
  }

  const tableContentProperties: IFolderContentProps = {
    folderContent: folderContentItems ?? [],
    userid: userId
  }

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

            <li>
 
            </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>NSync File System</h1>
          <FileUploader onUpload={handleFileUpload} />
        </div>

      {/* File List */}
      <div className='sub-header'>
        <div className="file-grid">
        <FolderContent {...folderContentProperties}></FolderContent>
        </div>
        <div className='transfer-button-container'>
              <InputLabel id="demo-simple-select-label" variant='standard'>Cambio de operador</InputLabel>
            <Select autoWidth = {true}
            fullWidth
              labelId="select-operators"
              id="operators"
              value={operators[0]}
              label="operatorName"
              // onChange= {setTransferURL}
            >
               {operators.map((operator, index) => {
              if (operator.transferAPIURL) {
                return (
                  <MenuItem 
                    value={operator.operatorName}
                    key={index} 
                      onClick={() => setTransferURL(operator.transferAPIURL || '')}
                  >
                    {operator.operatorName}</MenuItem>
                  )
              }
            })}
            </Select>
            <div className='tranfer-button'>
                <Button variant="contained" color = "success" onClick={onClickTransferOperator} size='small'>Tranferir Docs</Button>
            </div>
              </div>
      </div>
       
        <section className="table-container">
          <StickyHeadTable {...tableContentProperties}></StickyHeadTable>
        </section>
      </div>
    </div>
  );
};

export default App;
