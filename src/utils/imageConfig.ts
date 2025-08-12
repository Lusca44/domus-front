// Em utils/imageConfig.ts
export const resolveImageUrl = (url: string) => {
  if (url.startsWith('http')) return url;

  const CLOUD_NAME = "";

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${url}`;
};