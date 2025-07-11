import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { imovelAnuncioApi } from "@/utils/apiConfig";

const AnunciePage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    finalidade: "",
    tipo: "",
    endereco: "",
    bairro: "",
    cidade: "",
    cep: "",
    quartos: "",
    banheiros: "",
    vagas: "",
    area: "",
    valor: "",
    descricao: "",
    observacoes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.telefone || !formData.email || !formData.finalidade || !formData.tipo) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios marcados com *",
        variant: "destructive",
      });
      return;
    }

    // Simular envio do formulário
    toast({
      title: "Formulário enviado com sucesso!",
      description: "Entraremos em contato em breve para avaliar seu imóvel.",
    });

    console.log(formData);

    imovelAnuncioApi.enviarEmailAnuncio(formData);
    //QUERO ENVIAR ESSE FORM DATA PRO EMAIL

    // Resetar formulário
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      finalidade: "",
      tipo: "",
      endereco: "",
      bairro: "",
      cidade: "",
      cep: "",
      quartos: "",
      banheiros: "",
      vagas: "",
      area: "",
      valor: "",
      descricao: "",
      observacoes: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      
      <div className="pt-6 sm:pt-8 pb-12 sm:pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Anuncie seu Imóvel conosco!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-8 px-4">
              Seu imóvel na vitrine certa! Anuncie conosco e tenha acesso a fotografia profissional, 
              presença nas redes sociais e uma equipe dedicada com 12 anos de experiência.
            </p>
            
            {/* Benefícios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8 sm:mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fotografia Profissional</h3>
                <p className="text-sm text-gray-600">Fotos que valorizam cada detalhe do seu imóvel</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Presença Digital</h3>
                <p className="text-sm text-gray-600">Anúncios nas redes sociais e portais parceiros</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">12 Anos de Experiência</h3>
                <p className="text-sm text-gray-600">Equipe especializada em resultados rápidos</p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Dados do seu Imóvel
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Seus Dados</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        value={formData.nome}
                        onChange={(e) => handleInputChange("nome", e.target.value)}
                        placeholder="Seu nome completo"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <Input
                        value={formData.telefone}
                        onChange={(e) => handleInputChange("telefone", e.target.value)}
                        placeholder="(21) 99999-9999"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-mail *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Dados do Imóvel */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados do Imóvel</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Finalidade *
                      </label>
                      <Select value={formData.finalidade} onValueChange={(value) => handleInputChange("finalidade", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a finalidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="venda">Venda</SelectItem>
                          <SelectItem value="locacao">Locação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo do Imóvel *
                      </label>
                      <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartamento">Apartamento</SelectItem>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="casa-condominio">Casa em Condomínio</SelectItem>
                          <SelectItem value="cobertura">Cobertura</SelectItem>
                          <SelectItem value="flat">Flat</SelectItem>
                          <SelectItem value="loja">Loja</SelectItem>
                          <SelectItem value="sala">Sala</SelectItem>
                          <SelectItem value="terreno">Terreno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Endereço
                      </label>
                      <Input
                        value={formData.endereco}
                        onChange={(e) => handleInputChange("endereco", e.target.value)}
                        placeholder="Rua, número"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bairro
                      </label>
                      <Input
                        value={formData.bairro}
                        onChange={(e) => handleInputChange("bairro", e.target.value)}
                        placeholder="Nome do bairro"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cidade
                      </label>
                      <Input
                        value={formData.cidade}
                        onChange={(e) => handleInputChange("cidade", e.target.value)}
                        placeholder="Rio de Janeiro"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CEP
                      </label>
                      <Input
                        value={formData.cep}
                        onChange={(e) => handleInputChange("cep", e.target.value)}
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>

                {/* Características */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Características</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quartos
                      </label>
                      <Input
                        type="number"
                        value={formData.quartos}
                        onChange={(e) => handleInputChange("quartos", e.target.value)}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Banheiros
                      </label>
                      <Input
                        type="number"
                        value={formData.banheiros}
                        onChange={(e) => handleInputChange("banheiros", e.target.value)}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vagas
                      </label>
                      <Input
                        type="number"
                        value={formData.vagas}
                        onChange={(e) => handleInputChange("vagas", e.target.value)}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Área (m²)
                      </label>
                      <Input
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        placeholder="Ex: 80"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Desejado (R$)
                      </label>
                      <Input
                        value={formData.valor}
                        onChange={(e) => handleInputChange("valor", e.target.value)}
                        placeholder="Ex: 500.000"
                      />
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Descrição</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição do Imóvel
                    </label>
                    <Textarea
                      value={formData.descricao}
                      onChange={(e) => handleInputChange("descricao", e.target.value)}
                      placeholder="Descreva as principais características e diferenciais do seu imóvel..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Observações Adicionais
                    </label>
                    <Textarea
                      value={formData.observacoes}
                      onChange={(e) => handleInputChange("observacoes", e.target.value)}
                      placeholder="Informações adicionais que considera importantes..."
                      rows={3}
                    />
                  </div>

                  {/* Upload de Fotos */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fotos do Imóvel
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Clique para fazer upload ou arraste as fotos aqui
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG ou JPEG até 10MB cada
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botão de Envio */}
                <div className="text-center pt-6">
                  <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 min-w-48">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Formulário
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    * Campos obrigatórios
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer isHomePage={false} />
    </div>
  );
};

export default AnunciePage;