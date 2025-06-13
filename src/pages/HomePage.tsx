
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Building2, Phone, Mail, ArrowRight, Star } from "lucide-react";
import ImgPortoRegion from "../assets/images/imagem-regiao-portuaria-MAM-praca-flutuante.jpg";

/**
 * Página Inicial - Hubs de Regiões
 * 
 * Esta página apresenta todos os hubs de lançamentos organizados por região,
 * permitindo que os usuários naveguem facilmente para os empreendimentos
 * de seu interesse em diferentes áreas do Rio de Janeiro.
 */
const HomePage = () => {
  // Dados dos hubs de regiões disponíveis
  const regioesHubs = [
    {
      id: "porto-maravilha",
      nome: "Porto Maravilha",
      descricao: "Zona portuária revitalizada com vista para a Baía de Guanabara",
      caracteristicas: [
        "Região em constante valorização",
        "Próximo a museus e pontos turísticos", 
        "Excelente infraestrutura de transporte",
        "Vista privilegiada da Baía de Guanabara"
      ],
      lancamentosAtivos: 1,
      precoPartir: "A partir de R$ 350.000",
      imagem: ImgPortoRegion,
      url: "/porto-maravilha",
      status: "Disponível",
      destaque: true
    },
    {
      id: "barra-tijuca",
      nome: "Barra da Tijuca",
      descricao: "Região moderna com praias e centros comerciais",
      caracteristicas: [
        "Praias de classe mundial",
        "Shopping centers e entretenimento",
        "Condomínios de alto padrão",
        "Fácil acesso à Zona Oeste"
      ],
      lancamentosAtivos: 0,
      precoPartir: "Em breve",
      imagem: "https://images.unsplash.com/photo-1544989164-19c0c8d9d1b8?w=800&h=600&fit=crop",
      url: "/barra-tijuca",
      status: "Em Breve",
      destaque: false
    },
    {
      id: "recreio",
      nome: "Recreio dos Bandeirantes",
      descricao: "Tranquilidade à beira-mar com natureza preservada",
      caracteristicas: [
        "Praias extensas e preservadas",
        "Ambiente familiar e seguro",
        "Próximo à natureza exuberante",
        "Qualidade de vida diferenciada"
      ],
      lancamentosAtivos: 0,
      precoPartir: "Em breve",
      imagem: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      url: "/recreio",
      status: "Em Breve",
      destaque: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Feitozza Imóveis
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Lançamentos Imobiliários no Rio de Janeiro
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>(21) 2222-3333</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>contato@feitozza.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Encontre Seu Novo
              <span className="text-blue-600 block sm:inline sm:ml-3">
                Lar no Rio
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed px-4">
              Descubra lançamentos exclusivos nas melhores regiões do Rio de Janeiro. 
              Qualidade, localização privilegiada e o melhor custo-benefício.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">3</div>
                <div className="text-sm sm:text-base text-gray-600">Regiões Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">1</div>
                <div className="text-sm sm:text-base text-gray-600">Lançamento Ativo</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">24h</div>
                <div className="text-sm sm:text-base text-gray-600">Atendimento</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regiões */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Escolha Sua Região Ideal
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Explore nossos empreendimentos organizados por região e encontre 
              a localização perfeita para seu novo lar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {regioesHubs.map((regiao) => (
              <Card 
                key={regiao.id} 
                className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  regiao.destaque ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {regiao.destaque && (
                  <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 z-10">
                    <Star className="w-3 h-3" />
                    Destaque
                  </div>
                )}
                
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={regiao.imagem}
                    alt={regiao.nome}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      regiao.status === 'Disponível' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {regiao.status}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl sm:text-2xl mb-2">
                        {regiao.nome}
                      </CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {regiao.descricao}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {regiao.caracteristicas.slice(0, 3).map((caracteristica, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                        <span>{caracteristica}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-500">
                        {regiao.lancamentosAtivos} lançamento{regiao.lancamentosAtivos !== 1 ? 's' : ''} ativo{regiao.lancamentosAtivos !== 1 ? 's' : ''}
                      </p>
                      <p className="font-semibold text-blue-600 text-sm sm:text-base">
                        {regiao.precoPartir}
                      </p>
                    </div>
                    
                    <Button 
                      asChild 
                      className={`w-full sm:w-auto ${
                        regiao.status === 'Disponível' 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      disabled={regiao.status !== 'Disponível'}
                    >
                      <Link to={regiao.status === 'Disponível' ? regiao.url : '#'}>
                        <span className="flex items-center gap-2">
                          {regiao.status === 'Disponível' ? 'Ver Lançamentos' : 'Em Breve'}
                          {regiao.status === 'Disponível' && <ArrowRight className="w-4 h-4" />}
                        </span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Não Encontrou Sua Região Ideal?
            </h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
              Entre em contato conosco e descubra outras oportunidades 
              de investimento no Rio de Janeiro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <a href="tel:+552122223333">
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <a href="mailto:contato@feitozza.com.br">
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Feitozza Imóveis</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Especializada em lançamentos imobiliários de alto padrão 
                no Rio de Janeiro.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Regiões</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/porto-maravilha" className="text-gray-400 hover:text-white transition-colors">
                    Porto Maravilha
                  </Link>
                </li>
                <li className="text-gray-500">Barra da Tijuca (Em breve)</li>
                <li className="text-gray-500">Recreio (Em breve)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>(21) 2222-3333</p>
                <p>contato@feitozza.com.br</p>
                <p>Rio de Janeiro - RJ</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Informações</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                    Área Administrativa
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Feitozza Imóveis. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
