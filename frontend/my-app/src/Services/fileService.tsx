import { storage } from './firebase'; // Firebase configuration file

export interface UploadedFile {
  name: string;
  url: string;
}

export const uploadFile = async (file: File): Promise<UploadedFile> => {
//   const storageRef = storage.ref();
//   const fileRef = storageRef.child(file.name);
//   await fileRef.put(file);
//   const url = await fileRef.getDownloadURL();
const url = 'url'
  return { name: file.name, url };
};
