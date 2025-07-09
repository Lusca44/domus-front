/**
 * Utilitários para melhorar a responsividade das landing pages
 */

/**
 * Formata valores monetários para melhor exibição no mobile
 * @param value Valor a ser formatado
 * @returns Valor formatado com quebras apropriadas
 */
export const formatMobilePrice = (value: string): string => {
  // Se o valor contém "R$", tenta quebrar em uma linha melhor
  if (value.includes('R$')) {
    return value.replace('R$', 'R$\u00A0'); // Adiciona espaço não quebrável
  }
  return value;
};

/**
 * Classes CSS responsivas para textos com valores
 */
export const responsiveValueClasses = {
  // Para preços principais
  mainPrice: "text-sm sm:text-base md:text-lg lg:text-xl font-bold",
  
  // Para descrições de valor
  valueDescription: "text-xs sm:text-sm md:text-base",
  
  // Para cards de plantas
  cardTitle: "text-sm sm:text-base md:text-lg font-semibold",
  cardSubtitle: "text-xs sm:text-sm md:text-base text-gray-600",
  cardValue: "text-xs sm:text-sm md:text-base font-medium",
  
  // Para seções de características
  charTitle: "text-xs sm:text-sm font-medium",
  charValue: "text-xs sm:text-sm md:text-base font-semibold",
  
  // Para botões
  buttonText: "text-sm sm:text-base",
  
  // Para grids responsivos
  gridCols: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
  gridColsChar: "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4",
  
  // Para containers
  container: "px-4 sm:px-6 lg:px-8",
  sectionPadding: "py-8 sm:py-12 lg:py-16",
  
  // Para espaçamentos
  spacing: "space-y-3 sm:space-y-4 lg:space-y-6",
  smallSpacing: "space-y-2 sm:space-y-3",
};

/**
 * Breakpoints para uso em condicionais JavaScript
 */
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

/**
 * Classe para textos que podem quebrar em mobile
 */
export const wrapText = (text: string, maxLength: number = 20): string => {
  if (text.length <= maxLength) return text;
  
  const words = text.split(' ');
  const result = [];
  let currentLine = '';
  
  for (const word of words) {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) result.push(currentLine);
      currentLine = word;
    }
  }
  
  if (currentLine) result.push(currentLine);
  return result.join('\n');
};

/**
 * Função para truncar textos longos em mobile
 */
export const truncateForMobile = (text: string, isMobile: boolean, maxLength: number = 50): string => {
  if (!isMobile || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};