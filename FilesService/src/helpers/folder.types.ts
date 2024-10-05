export interface FolderContent {
    id: number;
    name: string;
    type: 'Folder' | 'File';
    LastModified: Date;
    url?: string;
}