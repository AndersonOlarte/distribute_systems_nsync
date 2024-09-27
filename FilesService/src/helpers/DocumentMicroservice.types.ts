import { Document } from "../entities/Document.entity";

export interface GetDocumentsByFolderId {
    documents: Document[];
    statusCode: number;
}