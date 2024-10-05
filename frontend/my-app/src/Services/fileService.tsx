import { DOCUMENT_MICROSERVICE_URL } from '../url';
import { storage } from './firebase'; // Firebase configuration file

export interface UploadedFile {
  name: string;
  url: string;
}

export const uploadFile = async (file: File, userId: string, folderid: number): Promise<UploadedFile> => {
  const url = `${DOCUMENT_MICROSERVICE_URL}/v1/users/${userId}/folders/${folderid}/document`
  console.log(url);
  const response = await fetch(url,{
    method: 'POST'
  });
  const responseJson = await response.json();
  console.log(responseJson);
  return { name: file.name, url };
};
