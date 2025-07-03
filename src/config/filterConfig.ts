
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
  // Extrai quantidades de quartos únicas
  const uniqueRooms = [...new Set(items.map(item => {
    if (item.quartos >= 4) return "4";
    return item.quartos.toString();
  }))];

  // Converte para o formato do filtro
  const roomFilters = uniqueRooms.map(room => {
    if (room === "4") return { value: "4", label: "4+ Quartos" };
    return { value: room, label: `${room} ${room === "1" ? "Quarto" : "Quartos"}` };
  });

  // Sempre adiciona "Todos" no início
  return [
    { value: "todos", label: "Todas as Quantidades" },
    ...roomFilters.sort((a, b) => parseInt(a.value) - parseInt(b.value))
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
    const roomsNumber = parseInt(selectedRooms);
    if (selectedRooms === "4" && item.quartos < 4) {
      return false;
    } else if (selectedRooms !== "4" && item.quartos !== roomsNumber) {
      return false;
    }
  }

  return true;
};
