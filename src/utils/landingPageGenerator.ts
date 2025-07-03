
import { LandingPageData } from '@/pages/admin/AdminLandingPages';

export const generateLandingPageFiles = (data: LandingPageData) => {
  // Generate component file
  const componentContent = generateComponentContent(data);
  
  // Generate assets files
  const fotosContent = generateFotosFile(data.fotos_galeria);
  const videosContent = generateVideosFile(data.videos_urls);
  
  return {
    componentContent,
    fotosContent,
    videosContent,
    folderPath: `src/pages/regioes/${data.regiao.toLowerCase().replace(/\s+/g, '-')}/${data.nome_projeto.toLowerCase().replace(/\s+/g, '-')}`,
  };
};

const generateComponentContent = (data: LandingPageData): string => {
  const componentName = `Landing${data.nome_projeto.replace(/\s+/g, '')}`; 
  const folderName = data.nome_projeto.toLowerCase().replace(/\s+/g, '-');
  
  return `import React from 'react';
import LeadCaptureForm from "@/components/LeadCaptureForm";
import PhotoCarousel from "@/components/PhotoCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import fotos from './assets/fotos';
import videos from './assets/videos';
import { ArrowDown, MapPin, Calendar, DollarSign, Home, Car, Maximize } from 'lucide-react';

const ${componentName} = () => {
  const empreendimento = {
    nome: "${data.nome_projeto}",
    slogan: "${data.slogan}",
    descricao: "${data.descricao}",
    regiao: "${data.regiao}",
    endereco: "${data.endereco}",
    previsaoEntrega: "${data.previsao_entrega}",
    preco: "${data.preco}",
    tiposApartamento: "${data.tipos_apartamento}",
    vagas: "${data.vagas}",
    area: "${data.area}",
    telefone: "${data.telefone}",
    responsavelLead: "${data.responsavel_lead}"
  };

  const diferenciais = ${JSON.stringify(data.diferenciais)};

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
          backgroundImage: \`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${data.imagem_background}')\`,
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Galeria de Fotos</h2>
          <PhotoCarousel photos={fotos} />
        </div>
      </section>

      {/* Seção de Vídeos */}
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

      {/* Diferenciais */}
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

      {/* Mapa */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Localização Privilegiada</h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="${data.url_maps}"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Captação */}
      <section id="lead-form" className="py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-8">
              Garanta já o seu apartamento
            </h2>
            <p className="text-xl text-center text-blue-100 mb-12">
              {empreendimento.preco}
            </p>
            <LeadCaptureForm 
              nomeLancamento={empreendimento.nome}
            />
          </div>
        </div>
      </section>

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

export default ${componentName};`;
};

const generateFotosFile = (fotos: string[]): string => {
  const fotosArray = fotos.map((foto, index) => `  {
    id: ${index + 1},
    src: "${foto}",
    alt: "Foto do empreendimento ${index + 1}"
  }`).join(',\n');

  return `const fotos = [
${fotosArray}
];

export default fotos;`;
};

const generateVideosFile = (videos: string[]): string => {
  const videosArray = videos.map((video, index) => `  {
    id: ${index + 1},
    titulo: "Vídeo ${index + 1}",
    url: "${video}"
  }`).join(',\n');

  return `const videos = [
${videosArray}
];

export default videos;`;
};

export const updateRoutesFile = (routeData: { path: string; componentName: string; importPath: string }) => {
  console.log('Adicionando rota:', routeData);
  // Esta funcionalidade seria implementada para modificar o App.tsx automaticamente
};

export const updateCardsFile = (cardData: {
  id: string;
  titulo: string;
  descricao: string;
  preco: string;
  imagem: string;
  regiao: string;
  quartos: number;
  area: string;
  url: string;
}) => {
  console.log('Adicionando card:', cardData);
  // Esta funcionalidade seria implementada para modificar o lancamentos.ts automaticamente
};
