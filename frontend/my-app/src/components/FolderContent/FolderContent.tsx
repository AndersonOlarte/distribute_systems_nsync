import React from 'react';
import { IFolderContent, IFolderContentProps } from '../../helpers/interfaces';
import { FaFolder } from 'react-icons/fa';



const FolderContent = (props: IFolderContentProps) => {
    return(
        <section className='folder-container'>
            {
                 props.folderContent?.filter((folderItem) => folderItem.type === 'Folder').map((folderItem, index) =>{
                    return(
                        <div key={index} className='file-card'>
                            <img src="/folder.png" alt="example" width={'30px'} />
                            <span>{folderItem.name}</span>
                            
                            
                        </div>
                    )
                })
            }
        </section>
    )
}
export default FolderContent;