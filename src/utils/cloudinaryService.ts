import axios from 'axios';
import * as CryptoJS from 'crypto-js';

// Configurações do Cloudinary (crie no dashboard do Cloudinary)
// const CLOUD_NAME = 'seu_cloud_name'; // Substitua pelo seu
const CLOUD_NAME = 'dpaoqegd9'; // Substitua pelo seu
// const UPLOAD_PRESET = 'seu_upload_preset'; // Crie um preset não assinado
const UPLOAD_PRESET = 'react_upload'; // Crie um preset não assinado

const API_KEY = '839817118466323'; 

const API_SECRET = 'i5FSdUwhJzNAOSONxksoWqTdueM';

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);
  formData.append('folder', 'lancamentos'); // Organize em pastas

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
    
    // 1. Construir parâmetros em ordem alfabética
    const params = {
      invalidate: 'true',
      public_id: publicId,
      timestamp: timestamp.toString(),
      // Não inclua api_key na assinatura!
    };

    // 2. Gerar string para assinatura
    const signData = Object.keys(params)
      .sort() // Ordem alfabética é crucial!
      .map(key => `${key}=${params[key as keyof typeof params]}`)
      .join('&');
    
    // 3. Gerar assinatura com SHA1
    const signature = CryptoJS.SHA1(signData + API_SECRET).toString();

    // 4. Adicionar parâmetros adicionais para a requisição
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

// Extrai o public_id de uma URL do Cloudinary
export const extractPublicId = (url: string): string => {
  try {
    // Padrão para URLs do Cloudinary com pasta
    const folderPattern = /upload\/(?:v\d+\/)?(.+?)\.\w+$/;
    const matches = url.match(folderPattern);
    
    if (matches && matches[1]) {
      // Retorna o caminho completo incluindo pasta
      return matches[1];
    }
    
    // Fallback para URLs sem padrão reconhecido
    const segments = url.split('/');
    const fileName = segments[segments.length - 1];
    return fileName.split('.')[0];
  } catch (error) {
    console.error("Erro ao extrair public ID:", error, url);
    return '';
  }
};