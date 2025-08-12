import axios from 'axios';
import * as CryptoJS from 'crypto-js';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_VITE_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY; 
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;
const FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER;

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);
  formData.append('folder', FOLDER);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          console.log(`Progresso: ${percentCompleted}%`);
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Erro no upload para Cloudinary:', error);
    throw new Error('Falha no upload da imagem');
  }
};

export const deleteFromCloudinary = async (url: string): Promise<void> => {
  try {
    const publicId = extractPublicId(url);
    if (!publicId) throw new Error('Public ID não encontrado');

    const timestamp = Math.round(Date.now() / 1000);
    
    const params = {
      invalidate: 'true',
      public_id: publicId,
      timestamp: timestamp.toString(),
    };

    const signData = Object.keys(params)
      .sort() 
      .map(key => `${key}=${params[key as keyof typeof params]}`)
      .join('&');
    
    const signature = CryptoJS.SHA1(signData + API_SECRET).toString();

    const requestData = {
      ...params,
      signature,
      api_key: API_KEY,
    };

    await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
      requestData
    );
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    throw new Error('Falha ao deletar imagem');
  }
};

export const extractPublicId = (url: string): string => {
  try {
    const folderPattern = /upload\/(?:v\d+\/)?(.+?)\.\w+$/;
    const matches = url.match(folderPattern);
    
    if (matches && matches[1]) {
      return matches[1];
    }
    
    const segments = url.split('/');
    const fileName = segments[segments.length - 1];
    return fileName.split('.')[0];
  } catch (error) {
    console.error("Erro ao extrair public ID:", error, url);
    return '';
  }
};