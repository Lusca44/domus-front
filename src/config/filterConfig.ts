
// **SISTEMA DE FILTROS AUTOMATIZADO**
// Este arquivo centraliza toda a lógica de filtros do projeto
// Os filtros são gerados automaticamente baseados nos dados dos cards

export interface RegiaoFilter {
  value: string;
  label: string;
}

export interface QuartosFilter {
  value: string;
  label: string;
}

// **FUNÇÃO PRINCIPAL**: Gera filtros de região automaticamente baseado nos dados
// Esta função percorre todos os itens e extrai as regiões únicas
export const getAvailableRegions = (items: any[]): RegiaoFilter[] => {
  if (!items?.length) return [{ value: "todas", label: "Todas as Regiões" }];
  
  // Extrai regiões únicas dos dados
  const uniqueRegions = [...new Set(items.map(item => item.regiao))];
  
  // Converte para o formato do filtro
  const regionFilters = uniqueRegions.map(regiao => ({
    value: mapRegiaoToFilter(regiao),
    label: regiao
  }));

  // Sempre adiciona "Todas as Regiões" no início
  return [
    { value: "todas", label: "Todas as Regiões" },
    ...regionFilters.sort((a, b) => a.label.localeCompare(b.label))
  ];
};

// **FUNÇÃO PRINCIPAL**: Gera filtros de quartos automaticamente baseado nos dados
export const getAvailableRooms = (items: any[]): QuartosFilter[] => {
  if (!items?.length) return [{ value: "todos", label: "Todas as Quantidades" }];
  
  // Extrai quantidades de quartos únicas e mapeia valores especiais
  const uniqueRooms = [...new Set(items.map(item => {
    // Mapear valores especiais primeiro
    if (item.quartos === 0) return "studio";
    if (item.quartos === 1) return "1";
    if (item.quartos >= 4) return "4";
    return item.quartos.toString();
  }))];

  // Converte para o formato do filtro com ordem específica
  const roomFilters = uniqueRooms.map(room => {
    switch (room) {
      case "studio":
        return { value: "studio", label: "Studio" };
      case "1":
        return { value: "1", label: "1 Quarto" };
      case "2":
        return { value: "2", label: "2 Quartos" };
      case "3":
        return { value: "3", label: "3 Quartos" };
      case "4":
        return { value: "4", label: "4+ Quartos" };
      default:
        return { value: room, label: `${room} Quartos` };
    }
  });

  // Ordem específica para os filtros
  const orderMap = { "studio": 0, "1": 1, "2": 2, "3": 3, "4": 4 };
  roomFilters.sort((a, b) => {
    const orderA = orderMap[a.value as keyof typeof orderMap] ?? 999;
    const orderB = orderMap[b.value as keyof typeof orderMap] ?? 999;
    return orderA - orderB;
  });

  // Sempre adiciona "Todos" no início
  return [
    { value: "todos", label: "Todas as Quantidades" },
    ...roomFilters
  ];
};

// **FUNÇÕES DE MAPEAMENTO**: Convertem nomes para valores de filtro e vice-versa
export const mapRegiaoToFilter = (regiao: string): string => {
  return regiao.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
};

export const mapFilterToRegiao = (filterValue: string, items: any[]): string => {
  // Procura a região original nos dados
  const item = items.find(item => mapRegiaoToFilter(item.regiao) === filterValue);
  return item ? item.regiao : filterValue;
};

// **FUNÇÃO DE VALIDAÇÃO**: Verifica se um item passa pelos filtros selecionados
export const itemMatchesFilters = (
  item: any, 
  selectedRegion: string, 
  selectedRooms: string, 
  allItems: any[]
): boolean => {
  // Filtro de região
  if (selectedRegion !== "todas") {
    const expectedRegion = mapFilterToRegiao(selectedRegion, allItems);
    if (item.regiao !== expectedRegion) {
      return false;
    }
  }

  // Filtro de quartos
  if (selectedRooms !== "todos") {
    switch (selectedRooms) {
      case "studio":
        if (item.quartos !== 0) return false;
        break;
      case "1":
        if (item.quartos !== 1) return false;
        break;
      case "2":
        if (item.quartos !== 2) return false;
        break;
      case "3":
        if (item.quartos !== 3) return false;
        break;
      case "4":
        if (item.quartos < 4) return false;
        break;
      default:
        const roomsNumber = parseInt(selectedRooms);
        if (item.quartos !== roomsNumber) return false;
        break;
    }
  }

  return true;
};
