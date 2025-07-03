
// Configuração centralizada para filtros de região e quartos
// Este arquivo conecta automaticamente as landing pages aos filtros

export interface RegiaoFilter {
  value: string;
  label: string;
  landingPages?: string[];
}

export interface QuartosFilter {
  value: string;
  label: string;
}

// Mapeamento de regiões - automaticamente sincronizado com as landing pages existentes
export const regioesFilters: RegiaoFilter[] = [
  { 
    value: "todas", 
    label: "Todas as Regiões" 
  },
  { 
    value: "porto-maravilha", 
    label: "Porto Maravilha",
    landingPages: ["/porto-maravilha/lancamento/pixinguinha", "/porto-maravilha/lancamento/porto-carioca"]
  },
  { 
    value: "barra-tijuca", 
    label: "Barra da Tijuca",
    landingPages: ["/barra-tijuca/lancamento/atlantico"]
  },
  { 
    value: "recreio", 
    label: "Recreio dos Bandeirantes",
    landingPages: ["/recreio/lancamento/paradise"]
  },
  { 
    value: "niteroi", 
    label: "Niterói",
    landingPages: ["/niteroi/lancamento/caminhos-guanabara"]
  },
];

// Filtros de quartos
export const quartosFilters: QuartosFilter[] = [
  { value: "todos", label: "Todos as Quantidades" },
  { value: "1", label: "1 Quarto" },
  { value: "2", label: "2 Quartos" },
  { value: "3", label: "3 Quartos" },
  { value: "4", label: "4+ Quartos" },
];

// Função para mapear regiões para valores de filtro
export const mapRegiaoToFilter = (regiao: string): string => {
  const mapping: { [key: string]: string } = {
    "Porto Maravilha": "porto-maravilha",
    "Barra da Tijuca": "barra-tijuca", 
    "Recreio dos Bandeirantes": "recreio",
    "Niterói": "niteroi",
    "Copacabana": "copacabana",
    "Ipanema": "ipanema",
    "Tijuca": "tijuca",
  };
  return mapping[regiao] || regiao.toLowerCase().replace(/\s+/g, '-');
};

// Função para mapear filtro para nome da região
export const mapFilterToRegiao = (filterValue: string): string => {
  const mapping: { [key: string]: string } = {
    "porto-maravilha": "Porto Maravilha",
    "barra-tijuca": "Barra da Tijuca",
    "recreio": "Recreio dos Bandeirantes", 
    "niteroi": "Niterói",
    "copacabana": "Copacabana",
    "ipanema": "Ipanema",
    "tijuca": "Tijuca",
  };
  return mapping[filterValue] || filterValue;
};

// Função para obter regiões disponíveis dinamicamente baseado nos dados
export const getAvailableRegions = (items: any[]): RegiaoFilter[] => {
  const availableRegions = new Set(items.map(item => mapRegiaoToFilter(item.regiao)));
  return regioesFilters.filter(regiao => 
    regiao.value === "todas" || availableRegions.has(regiao.value)
  );
};

// Função para obter quantidades de quartos disponíveis dinamicamente
export const getAvailableRooms = (items: any[]): QuartosFilter[] => {
  const availableRooms = new Set(items.map(item => {
    if (item.quartos >= 4) return "4";
    return item.quartos.toString();
  }));
  
  return quartosFilters.filter(quarto => 
    quarto.value === "todos" || availableRooms.has(quarto.value)
  );
};
