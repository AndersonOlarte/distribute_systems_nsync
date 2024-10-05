import React, { CSSProperties, useEffect, useState } from 'react';
import FileUploader from './components/FileUploader/FileUploader';
import './App.css';
import { UploadedFile } from './Services/fileService';
import FolderContent from './components/FolderContent/FolderContent';
import { IDisplayFolders, IFolderContent, IFolderContentProps, IOperator } from './helpers/interfaces';
import StickyHeadTable from './components/table/MainTable';
import { FILE_MICROSERVICE_URL, GOV_CARPETA_URL, USER_MICROSERVICE_URL } from './url';
import exampleOperatorsJson from './helpers/responseOperators.json';
import { Button, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const App: React.FC = () => {
  const [userId, setUserId] = useState<string>('23423');
  const [folderId, setFolderId] = useState<number>(2);
  const [folderContentItems, setCurrentFolderContent] = useState<IFolderContent[]>([]);
  const [operators, setOperators] = useState<IOperator[]>([]);
  const [transferURL, setTransferURL] = useState<string>(''); // Estado para almacenar la URL de transferencia seleccionada
  const [selectedOperator, setSelectedOperator] = useState<string>(''); // Estado para almacenar el nombre del operador seleccionado

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

    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };

    getRootFolderContent();
  }, [userId]);

  useEffect(() => {
    const getOperators = async () => {
      const setDataFromJson = (operators: IOperator[]) => {
        operators.forEach((operator) => {
          const operatorData: IOperator = {
            participants: operator.participants,
            _id: operator._id,
            operatorName: operator.operatorName,
            transferAPIURL: operator.transferAPIURL
          };
          setOperators([operatorData, ...operators]);
        });
      };

      try {
        const response = await fetch(`https://ocrf9nzqde.execute-api.us-east-1.amazonaws.com/prod/documents/operators`);
        const responseJson: IOperator[] = (await response.json()).body;
        setDataFromJson(responseJson);
      } catch (error) {
        console.log('There was an error retrieving operators. Using mock data: ', error);
        // setDataFromJson(exampleOperatorsJson);
      }
    };
    getOperators();
  }, []);

  const onCHangeTransferOperator = (event: SelectChangeEvent) => {
    const operatorName = event.target.value;
    setSelectedOperator(operatorName);

    const selectedOperatorData = operators.find((op) => op.operatorName === operatorName);
    if (selectedOperatorData && selectedOperatorData.transferAPIURL) {
      setTransferURL(selectedOperatorData.transferAPIURL);
      console.log('URL selected: ', selectedOperatorData.transferAPIURL);
    }
  };

  const onClickTransferOperator = async (event: any) => {
    try {
      const response = await fetch(`${USER_MICROSERVICE_URL}/v1/users/${userId}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: transferURL })
      });

      if (response.ok) {
        alert('Transfer request sent to operator');
      } else {
        alert('Failed to send transfer request');
      }
    } catch (error) {
      alert('There was an issue sending the transfer request');
    }
  };

  const [folderItem, setFolderContent] = useState<UploadedFile[]>([]);

  const handleFileUpload = (newFile: UploadedFile) => {
    setFolderContent([...folderItem, newFile]);
  };

  const folderContentProperties: IDisplayFolders = {
    folderContent: folderContentItems ?? [],
    setFolderContent: setCurrentFolderContent,
    folderId: folderId,
    userId: userId,
    setFolderId: setFolderId
  };

  const tableContentProperties: IFolderContentProps = {
    folderContent: folderContentItems ?? [],
    userid: userId
  };

  return (
    <div className="container">
        {/* <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
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
          <h1>NSync File System</h1>
          <FileUploader onUpload={handleFileUpload} />
        </div>

        {/* File List */}
        <div className="sub-header">
          <div className="file-grid">
            <FolderContent {...folderContentProperties}></FolderContent>
          </div>

          {/* Transfer Operator Section */}
          <div className="transfer-button-container">
            <InputLabel id="operator-select-label">Cambio de operador</InputLabel>
            <Select
              labelId="operator-select-label"
              id="operator-select"
              value={selectedOperator}
              onChange={onCHangeTransferOperator}
              fullWidth
              variant="standard"
            >
              {operators.map((operator,index) => (
                <MenuItem key={operator._id+index} value={operator.operatorName}>
                  {operator.operatorName}
                </MenuItem>
              ))}
            </Select>
            <div className="transfer-button">
              <Button variant="contained" color="success" onClick={onClickTransferOperator} size="small">
                Transferir Docs
              </Button>
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
