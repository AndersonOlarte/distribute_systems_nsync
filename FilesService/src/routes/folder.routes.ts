import { Router } from "express";
import { createFolder, createRootFolder, deleteFolder, deleteFoldersRelatedToUser, getChildFolders, getFolderContent, getFolderMetaDataById } from "../controllers/folder.controller";

const routerFolder = Router();

routerFolder.post('/v1/users/:userid/folders', createFolder);

routerFolder.delete('/v1/users/:userid/folders/:folderid', deleteFolder);

routerFolder.delete('/v1/users/:userid/folders/', deleteFoldersRelatedToUser);

routerFolder.post('/v1/users/:userid/folders/root-folder', createRootFolder);

routerFolder.get('/v1/users/:userid/folders/:folderid/child-folders', getChildFolders);

routerFolder.get('/v1/users/:userid/folders/:folderid', getFolderMetaDataById);

routerFolder.get('/v1/users/:userid/folders/:folderid/content', getFolderContent);



export default routerFolder;