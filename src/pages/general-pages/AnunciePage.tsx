import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Send, CheckCircle } from 'lucide-react';

const AnunciePage = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipoImovel: '',
    endereco: '',
    valor: '',
    descricao: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    setTimeout(() => {
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Entraremos em contato em breve para avaliar seu imóvel.",
      });
      setIsSubmitting(false);
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        tipoImovel: '',
        endereco: '',
        valor: '',
        descricao: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Anuncie seu imóvel conosco
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Seu imóvel, na vitrine certa! Conte com nossa experiência de anos no mercado imobiliário do Rio de Janeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Cadastre seu imóvel</CardTitle>
              <CardDescription>
                Preencha os dados abaixo e nossa equipe entrará em contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(21) 99999-9999"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipoImovel">Tipo do imóvel *</Label>
                    <Select value={formData.tipoImovel} onValueChange={(value) => handleInputChange('tipoImovel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="cobertura">Cobertura</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço do imóvel *</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) => handleInputChange('endereco', e.target.value)}
                    placeholder="Rua, número, bairro, cidade"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor pretendido</Label>
                  <Input
                    id="valor"
                    value={formData.valor}
                    onChange={(e) => handleInputChange('valor', e.target.value)}
                    placeholder="R$ 500.000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição do imóvel</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva as características do seu imóvel..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Anunciar Imóvel
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Vantagens */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Por que anunciar conosco?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">📸 Fotos profissionais</h4>
                  <p className="text-sm text-gray-600">
                    Fotógrafo especializado em arquitetura valoriza cada detalhe do seu imóvel
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">🌐 Presença digital completa</h4>
                  <p className="text-sm text-gray-600">
                    Site moderno, redes sociais e portais parceiros para máximo alcance
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">⚡ Resultados rápidos</h4>
                  <p className="text-sm text-gray-600">
                    Anos de experiência no mercado carioca para vender seu imóvel mais rápido
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">🏆 Equipe especializada</h4>
                  <p className="text-sm text-gray-600">
                    Atendimento personalizado e acompanhamento em todo o processo
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    Avaliação Gratuita
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Nossa equipe fará uma avaliação gratuita do seu imóvel para definir o melhor preço de mercado
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AnunciePage;