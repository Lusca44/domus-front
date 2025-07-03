import { LandingPageData } from "@/pages/admin/AdminLandingPages";

export class LandingPageGenerator {
  private landingPageData: LandingPageData;

  constructor(data: LandingPageData) {
    this.landingPageData = data;
  }

  // Gera o slug da URL baseado no nome do projeto
  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Gera o nome do componente baseado no nome do projeto
  private generateComponentName(): string {
    return this.landingPageData.nome_projeto
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  // Gera a estrutura de pastas
  public generateFolderStructure(): string {
    const regiaoSlug = this.generateSlug(this.landingPageData.regiao);
    const projetoSlug = this.generateSlug(this.landingPageData.nome_projeto);
    
    return `src/pages/regioes/${regiaoSlug}/${projetoSlug}`;
  }

  // Gera o arquivo fotos.tsx
  public generateFotosFile(): string {
    const fotosImports = this.landingPageData.fotos_galeria
      .map((foto, index) => {
        const fileName = `foto${index + 1}`;
        return `import ${fileName} from './img/${fileName}.webp'`;
      })
      .join('\n');

    const fotosArray = this.landingPageData.fotos_galeria
      .map((foto, index) => {
        return `  {
    url: foto${index + 1},
    titulo: "Foto ${index + 1} - ${this.landingPageData.nome_projeto}"
  }`;
      })
      .join(',\n');

    return `${fotosImports}

export interface Foto {
  url: string;
  titulo: string;
}

const fotos: Foto[] = [
${fotosArray}
];

export default fotos;
`;
  }

  // Gera o arquivo videos.tsx
  public generateVideosFile(): string {
    const videosArray = this.landingPageData.videos_urls
      .map((url, index) => {
        return `  {
    url: "${url}",
    titulo: "Vídeo ${index + 1} - ${this.landingPageData.nome_projeto}"
  }`;
      })
      .join(',\n');

    return `export interface Video {
  url: string;
  titulo: string;
}

const videos: Video[] = [
${videosArray}
];

export default videos;
`;
  }

  // Gera o componente da landing page
  public generateLandingPageComponent(): string {
    const componentName = `Landing${this.generateComponentName()}`;
    const diferenciais = this.landingPageData.diferenciais
      .map(diferencial => `"${diferencial}"`)
      .join(',\n      ');

    return `import React from 'react';
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import PhotoCarousel from "@/components/PhotoCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import fotos from './assets/fotos';
import videos from './assets/videos';
import { ArrowDown, MapPin, Calendar, DollarSign, Home, Car, Maximize } from 'lucide-react';

const ${componentName} = () => {
  const empreendimento = {
    nome: "${this.landingPageData.nome_projeto}",
    slogan: "${this.landingPageData.slogan}",
    descricao: "${this.landingPageData.descricao}",
    regiao: "${this.landingPageData.regiao}",
    endereco: "${this.landingPageData.endereco}",
    previsaoEntrega: "${this.landingPageData.previsao_entrega}",
    preco: "${this.landingPageData.preco}",
    tiposApartamento: "${this.landingPageData.tipos_apartamento}",
    vagas: "${this.landingPageData.vagas}",
    area: "${this.landingPageData.area}",
    telefone: "${this.landingPageData.telefone}",
    responsavelLead: "${this.landingPageData.responsavel_lead}"
  };

  const diferenciais = [
    ${diferenciais}
  ];

  const scrollToForm = () => {
    const formElement = document.getElementById('lead-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: \`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${this.landingPageData.imagem_background}')\`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {empreendimento.nome}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {empreendimento.slogan}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={scrollToForm}>
              Quero Saber Mais
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <MapPin className="w-4 h-4 mr-2" />
              Ver Localização
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6" />
        </div>
      </section>

      {/* Seção Sobre o Empreendimento */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Sobre o Empreendimento</h2>
            <p className="text-lg text-gray-700 mb-12">
              {empreendimento.descricao}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Home className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Apartamentos</h3>
                  <p className="text-gray-600">{empreendimento.tiposApartamento}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Maximize className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Área</h3>
                  <p className="text-gray-600">{empreendimento.area}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Car className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Vagas</h3>
                  <p className="text-gray-600">{empreendimento.vagas}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold mb-2">Entrega</h3>
                  <p className="text-gray-600">{empreendimento.previsaoEntrega}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      {fotos.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Galeria de Fotos</h2>
            <PhotoCarousel photos={fotos} />
          </div>
        </section>
      )}

      {/* Seção de Vídeos */}
      {videos.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Conheça o Projeto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {videos.map((video, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      {video.url.includes('youtube') ? (
                        <iframe
                          src={video.url.replace('watch?v=', 'embed/')}
                          className="w-full h-full rounded-lg"
                          allowFullScreen
                        />
                      ) : (
                        <video controls className="w-full h-full rounded-lg">
                          <source src={video.url} type="video/mp4" />
                        </video>
                      )}
                    </div>
                    <h3 className="font-semibold text-center">{video.titulo}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Diferenciais */}
      {diferenciais.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Diferenciais</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {diferenciais.map((diferencial, index) => (
                <Badge key={index} variant="secondary" className="px-4 py-2 text-base">
                  {diferencial}
                </Badge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulário de Captação */}
      <section id="lead-form" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-8">
              Garante já o seu apartamento
            </h2>
            <p className="text-xl text-center text-blue-100 mb-12">
              {empreendimento.preco}
            </p>
            <LeadCaptureForm 
              projeto={empreendimento.nome}
              regiao={empreendimento.regiao}
            />
          </div>
        </div>
      </section>

      {/* Mapa */}
      ${this.landingPageData.url_maps ? `
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Localização</h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src="${this.landingPageData.url_maps}"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">
                <MapPin className="w-4 h-4 inline mr-2" />
                {empreendimento.endereco}
              </p>
            </div>
          </div>
        </div>
      </section>` : ''}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">{empreendimento.nome}</h3>
          <p className="text-gray-400 mb-6">{empreendimento.regiao}</p>
          <p className="text-gray-400">
            Para mais informações: {empreendimento.telefone}
          </p>
          <p className="text-gray-400 mt-2">
            Responsável: {empreendimento.responsavelLead}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ${componentName};
`;
  }

  // Gera a entrada para o arquivo de cards
  public generateCardEntry(): string {
    const id = Date.now().toString();
    const cardSlug = this.generateSlug(this.landingPageData.nome_projeto);
    
    return `  {
    id: "${id}",
    titulo: "${this.landingPageData.nome_projeto}",
    descricao: "${this.landingPageData.descricao}",
    preco: "${this.landingPageData.preco}",
    imagem: "${this.landingPageData.imagem_card}",
    regiao: "${this.landingPageData.regiao}",
    quartos: ${this.extractQuartos()},
    area: "${this.landingPageData.area}",
    url: "${this.landingPageData.url_pagina}",
    destaque: true,
    tipo: "lancamento",
  }`;
  }

  // Extrai o número de quartos do campo tipos_apartamento
  private extractQuartos(): number {
    const match = this.landingPageData.tipos_apartamento.match(/(\d+)/);
    return match ? parseInt(match[1]) : 2;
  }

  // Gera a rota para o App.tsx
  public generateRoute(): string {
    const componentName = `Landing${this.generateComponentName()}`;
    const importPath = this.generateFolderStructure().replace('src/', './') + `/${componentName}`;
    
    return {
      import: `import ${componentName} from "${importPath}";`,
      route: `          <Route
            path="${this.landingPageData.url_pagina}"
            element={<${componentName} />}
          />`
    };
  }

  // Método principal que orquestra a geração de todos os arquivos
  public generateAllFiles(): {
    folderStructure: string;
    fotosFile: string;
    videosFile: string;
    landingPageComponent: string;
    cardEntry: string;
    route: { import: string; route: string };
  } {
    return {
      folderStructure: this.generateFolderStructure(),
      fotosFile: this.generateFotosFile(),
      videosFile: this.generateVideosFile(),
      landingPageComponent: this.generateLandingPageComponent(),
      cardEntry: this.generateCardEntry(),
      route: this.generateRoute()
    };
  }
}
