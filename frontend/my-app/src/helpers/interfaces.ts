import { Dispatch } from "react";

export interface IFolderContent {
    id: number;
    name: string;
    type: 'Folder' | 'File';
    LastModified: Date;
    url?: string;
}

export interface IFolderContentProps {
    folderContent: IFolderContent[] | undefined;
    userid?: string;
}


export interface IDisplayFolders {
    folderContent: IFolderContent[] | undefined;
    setFolderContent: Dispatch<React.SetStateAction<IFolderContent[]>>;
    folderId: number | undefined;
    userId?: string;
    setFolderId: Dispatch<React.SetStateAction<number>>
}

export interface IOperator {
    participants: string[];
    _id: string; 
    operatorName: string;
    transferAPIURL?: string;
}

export interface IGetOperatorsResponse {
    
}