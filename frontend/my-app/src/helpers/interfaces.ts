export interface IFolderContent {
    name: string;
    type: 'Folder' | 'File';
    LastModified: Date;
}

export interface IFolderContentProps {
    folderContent: IFolderContent[] | undefined
}