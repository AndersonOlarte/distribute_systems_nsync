import { Router } from "express";
import { createFolder, getChildFolders } from "../controllers/folder.controller";

const routerFolder = Router();

routerFolder.post('/v1/folders', createFolder);

routerFolder.get('/v1/folders/:id/child-folders', getChildFolders);

export default routerFolder;