import React, { useEffect } from 'react';
import { IDisplayFolders } from '../../helpers/interfaces'; // Asegúrate de importar las interfaces correctas
import { FILE_MICROSERVICE_URL } from '../../url';

const FolderContent = (props: IDisplayFolders) => {

    useEffect(() => {
        const OnFolderClick = async (folderId: number) => {
            try {
                const url = `${FILE_MICROSERVICE_URL}/v1/users/${props.userId}/folders/${props.folderId}/content`
                console.log(url);
                const response = await fetch(url);
                const responseJson = await response.json();
                console.log(responseJson);
                props.setFolderContent(responseJson.folderContent);  // Actualiza el contenido de la carpeta con la respuesta
            } catch (error) {
                console.error('Error fetching folder content:', error);
            }
        };

        OnFolderClick(props.folderId || 1);
    }, [props.folderId, props.setFolderId])

    return (
        <section className='folder-container'>
            {props.folderContent?.filter((folderItem) => folderItem.type === 'Folder').map((folderItem) => (
                <div key={folderItem.id} className='file-card' onClick={() => props.setFolderId(folderItem.id)}>
                    <img src="/folder.png" alt="Folder icon" width={'30px'} />
                    <span>{folderItem.name}</span>
                </div>
            ))}
        </section>
    );
};

export default FolderContent;