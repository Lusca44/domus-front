export const resolveImageUrl = (url: string) =>{

function removeUltimoDigito(str: string): string {
  return str.slice(0, -1);
}

  const path = import.meta.env.VITE_API_BASE_URL;

  return`${removeUltimoDigito(path)}${url}`;
}