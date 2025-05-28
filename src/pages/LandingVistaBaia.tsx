
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BedDouble, Bath, ArrowSquareOut, CheckCircle, MapPin, ArrowLeft } from 'lucide-react';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

/**
 * Landing Page - Vista Baía Residencial
 * 
 * Esta página apresenta informações detalhadas sobre o empreendimento
 * Vista Baía Residencial e captura leads interessados neste lançamento específico.
 * 
 * Características:
 * - Apresentação do empreendimento com imagens e vídeos
 * - Detalhes do projeto (plantas, acabamentos, localização)
 * - Formulário de captação de leads
 * - Elementos de confiança (depoimentos, parceiros)
 */
const LandingVistaBaia = () => {
  // Estado para galeria de imagens
  const [imagemAtual, setImagemAtual] = useState(0);
  
  /**
   * Dados do empreendimento
   * Em um ambiente de produção, esses dados poderiam vir de uma API
   * 
   * IMPORTANTE: Substitua todas as URLs de imagens por suas imagens reais
   */
  const empreendimento = {
    nome: 'Vista Baía Residencial',
    slogan: 'Sua vista privilegiada para a Baía de Guanabara',
    descricao: 'O Vista Baía Residencial oferece apartamentos com 2 e 3 quartos com acabamento de alto padrão, lazer completo e uma vista deslumbrante da Baía de Guanabara. Localizado no coração do Porto Maravilha, próximo a museus, restaurantes e todo o dinamismo da região portuária renovada.',
    precoInicial: 'A partir de R$ 850.000',
    entrega: 'Previsão de entrega: Dezembro/2025',
    caracteristicas: [
      { titulo: 'Quartos', valor: '2 e 3' },
      { titulo: 'Banheiros', valor: '2 e 3' },
      { titulo: 'Metragem', valor: '68 a 110 m²' },
      { titulo: 'Vagas', valor: '1 a 2' }
    ],
    diferenciais: [
      'Vista para a Baía de Guanabara',
      'Varandas em todos os apartamentos',
      'Cozinha integrada',
      'Espaço gourmet',
      'Academia equipada',
      'Piscina com raia de 25m',
      'Segurança 24h',
      'Próximo aos principais pontos turísticos'
    ],
    endereco: 'Rua da Gamboa, 123 - Gamboa, Rio de Janeiro - RJ',
    // IMAGENS: Substitua estas URLs pelas suas imagens reais 
    imagens: [
      'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=1200',
      'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=1200',
      'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200'
    ],
    // VÍDEO: Substitua esta URL pelo seu vídeo real
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    // URL do mapa: Substitua pelo link no Google Maps
    mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.371247893542!2d-43.1992!3d-22.8996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f07e1b6b49d%3A0x85bd8fe1a45fe9b2!2sPorto%20Maravilha%2C%20Rio%20de%20Janeiro%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1716053186148!5m2!1spt-BR!2sbr'
  };

  /**
   * Depoimentos de clientes
   * Em um ambiente de produção, esses dados poderiam vir de uma API
   */
  const depoimentos = [
    {
      nome: 'Roberto Silva',
      texto: 'Comprar um apartamento na planta no Porto Maravilha foi a melhor decisão que tomei. A valorização da região é impressionante!',
      cargo: 'Engenheiro Civil'
    },
    {
      nome: 'Ana Luiza',
      texto: 'O processo de compra foi transparente e a construtora muito atenciosa em todos os momentos. Estou ansiosa para me mudar para o Vista Baía.',
      cargo: 'Arquiteta'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Cabeçalho */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para todos os lançamentos
          </Link>
          <Button variant="ghost" asChild>
            <a href="tel:+552122223333">
              Contato: (21) 2222-3333
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Coluna de Conteúdo */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {empreendimento.nome}
              </h1>
              <p className="text-xl md:text-2xl font-light">
                {empreendimento.slogan}
              </p>
              <div className="flex items-center text-blue-200">
                <MapPin className="w-5 h-5 mr-2" />
                <p>{empreendimento.endereco}</p>
              </div>
              <p className="text-2xl font-semibold text-blue-100">
                {empreendimento.precoInicial}
              </p>
              <p className="text-lg">
                {empreendimento.entrega}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {empreendimento.caracteristicas.map((item, index) => (
                  <div key={index} className="bg-blue-800 bg-opacity-50 rounded-lg p-3 text-center">
                    <p className="text-sm text-blue-200">{item.titulo}</p>
                    <p className="font-semibold text-lg">{item.valor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna do Formulário */}
            <div>
              <LeadCaptureForm 
                source="vista-baia-hero" 
                redirectTo="/obrigado"
                title="Garanta sua unidade no lançamento!"
                description="Preencha o formulário e nossa equipe entrará em contato com condições especiais"
              />
            </div>
          </div>
        </div>
        
        {/* Decoração de fundo - substitua a URL pela imagem desejada */}
        <div 
          className="absolute inset-0 opacity-10 bg-center bg-cover" 
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=1500)' }}
        ></div>
      </section>

      {/* Seção de Galeria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Conheça o Vista Baía Residencial
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Imagem Principal */}
            <div className="md:col-span-2 rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={empreendimento.imagens[imagemAtual]} 
                  alt={`Vista do empreendimento ${empreendimento.nome} - imagem ${imagemAtual + 1}`} 
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
            
            {/* Thumbnails */}
            <div className="space-y-4">
              {/* IMPORTANTE: Substitua estas imagens por suas imagens reais */}
              {empreendimento.imagens.map((img, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden cursor-pointer transition-all hover:opacity-90 shadow-sm ${imagemAtual === index ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setImagemAtual(index)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
              ))}
              
              {/* Botão para ver o vídeo */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <ArrowSquareOut className="w-4 h-4 mr-2" />
                    Assistir ao Vídeo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <div className="aspect-video">
                    {/* VÍDEO: Substitua o src abaixo pelo link do seu vídeo */}
                    <iframe
                      width="100%"
                      height="100%"
                      src={empreendimento.video}
                      title={`Vídeo do empreendimento ${empreendimento.nome}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded"
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Descrição */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Sobre o Empreendimento</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {empreendimento.descricao}
              </p>
              <p className="text-gray-700">
                Projeto arquitetônico moderno com fachada imponente, o Vista Baía Residencial foi elaborado para proporcionar o máximo de conforto e bem-estar aos moradores. Com áreas comuns amplas e bem equipadas, o empreendimento é ideal para quem busca qualidade de vida em uma das áreas mais promissoras do Rio de Janeiro.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Diferenciais</h3>
              <ul className="space-y-3">
                {empreendimento.diferenciais.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Plantas e Tipologias */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Plantas e Tipologias
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Planta 1 */}
            <Card className="overflow-hidden">
              <div className="bg-gray-200 h-64">
                {/* IMAGEM: Substitua esta URL pela imagem da planta */}
                <img 
                  src="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=500&fit=crop" 
                  alt="Planta de 2 quartos" 
                  className="object-contain w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Apartamento 2 Quartos</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <BedDouble className="w-5 h-5 text-blue-600 mr-2" />
                    <span>2 Quartos (1 suíte)</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 text-blue-600 mr-2" />
                    <span>2 Banheiros</span>
                  </div>
                  <div>
                    <span className="font-semibold">68 m²</span>
                  </div>
                  <div>
                    <span className="font-semibold">1 Vaga</span>
                  </div>
                </div>
                <Button className="w-full">Ver Detalhes da Planta</Button>
              </CardContent>
            </Card>
            
            {/* Planta 2 */}
            <Card className="overflow-hidden">
              <div className="bg-gray-200 h-64">
                {/* IMAGEM: Substitua esta URL pela imagem da planta */}
                <img 
                  src="https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=500&fit=crop" 
                  alt="Planta de 3 quartos" 
                  className="object-contain w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Apartamento 3 Quartos</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <BedDouble className="w-5 h-5 text-blue-600 mr-2" />
                    <span>3 Quartos (1 suíte)</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 text-blue-600 mr-2" />
                    <span>3 Banheiros</span>
                  </div>
                  <div>
                    <span className="font-semibold">110 m²</span>
                  </div>
                  <div>
                    <span className="font-semibold">2 Vagas</span>
                  </div>
                </div>
                <Button className="w-full">Ver Detalhes da Planta</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Localização */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Localização Privilegiada
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 text-lg">
                O Vista Baía Residencial está estrategicamente localizado no coração do Porto Maravilha, área que vem se valorizando constantemente nos últimos anos devido aos investimentos em infraestrutura e cultura.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">5 min do Museu do Amanhã e MAR</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">10 min do Centro da cidade</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">15 min da Zona Sul</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Próximo às principais vias de acesso</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Fácil acesso a transporte público (VLT e metrô)</span>
                </li>
              </ul>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              {/* MAPA: Substitua o src pelo link correto do Google Maps */}
              <iframe 
                src={empreendimento.mapa} 
                width="100%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Vista Baía Residencial"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">
            O Que Nossos Clientes Dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {depoimentos.map((item, index) => (
              <Card key={index} className="bg-white shadow-md">
                <CardContent className="p-6">
                  <div className="text-xl font-semibold mb-3">"{item.texto}"</div>
                  <div className="mt-4">
                    <p className="font-bold">{item.nome}</p>
                    <p className="text-gray-600 text-sm">{item.cargo}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Final */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Não Perca Esta Oportunidade!
            </h2>
            <p className="text-lg md:text-xl mb-8">
              Garanta já sua unidade no Vista Baía Residencial com condições especiais de lançamento.
            </p>
            
            <div className="max-w-md mx-auto">
              <LeadCaptureForm 
                source="vista-baia-footer" 
                redirectTo="/obrigado"
                title="Quero garantir minha unidade"
                description="Preencha seus dados para receber mais informações"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Vista Baía Residencial</h3>
              <p className="text-gray-400">
                {empreendimento.endereco}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-400">Central de Vendas: (21) 2222-3333</p>
              <p className="text-gray-400">Email: contato@portolancamentos.com.br</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white">
                    Todos os Lançamentos
                  </Link>
                </li>
                <li>
                  <Link to="/politica-privacidade" className="hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Porto Maravilha Lançamentos. Todos os direitos reservados.</p>
            <p className="mt-2">
              As imagens são meramente ilustrativas. A construtora reserva-se o direito de alterar o projeto.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingVistaBaia;
