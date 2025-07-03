
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LandingPageData } from "@/pages/admin/AdminLandingPages";
import { X, Upload, Plus } from "lucide-react";

interface LandingPageCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<LandingPageData, 'id' | 'data_criacao' | 'data_modificacao'>) => void;
}

export const LandingPageCreateModal: React.FC<LandingPageCreateModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("basicas");
  const [formData, setFormData] = useState({
    nome_projeto: "",
    slogan: "",
    descricao: "",
    regiao: "",
    endereco: "",
    previsao_entrega: "",
    preco: "",
    url_pagina: "",
    tipos_apartamento: "",
    vagas: "",
    area: "",
    diferenciais: [] as string[],
    imagem_background: "",
    fotos_galeria: [] as string[],
    videos_urls: [] as string[],
    imagem_card: "",
    url_maps: "",
    telefone: "",
    responsavel_lead: "",
    ativo: true,
  });

  const [diferencialInput, setDiferencialInput] = useState("");
  const [videoUrlInput, setVideoUrlInput] = useState("");

  const regioes = [
    "Porto Maravilha",
    "Niterói", 
    "Barra da Tijuca",
    "Recreio dos Bandeirantes",
    "Copacabana",
    "Ipanema",
    "Tijuca"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Gerar URL automaticamente baseada no nome do projeto
    if (field === 'nome_projeto' && typeof value === 'string') {
      const urlSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      const regiaoSlug = formData.regiao
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      if (regiaoSlug && urlSlug) {
        setFormData(prev => ({
          ...prev,
          url_pagina: `/${regiaoSlug}/lancamento/${urlSlug}`
        }));
      }
    }
  };

  const addDiferencial = () => {
    if (diferencialInput.trim()) {
      setFormData(prev => ({
        ...prev,
        diferenciais: [...prev.diferenciais, diferencialInput.trim()]
      }));
      setDiferencialInput("");
    }
  };

  const removeDiferencial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      diferenciais: prev.diferenciais.filter((_, i) => i !== index)
    }));
  };

  const addVideoUrl = () => {
    if (videoUrlInput.trim()) {
      setFormData(prev => ({
        ...prev,
        videos_urls: [...prev.videos_urls, videoUrlInput.trim()]
      }));
      setVideoUrlInput("");
    }
  };

  const removeVideoUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos_urls: prev.videos_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.nome_projeto || !formData.regiao || !formData.url_pagina) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome do projeto, região e URL da página.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.imagem_card) {
      toast({
        title: "Imagem obrigatória",
        description: "É necessário fazer upload da imagem do card.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);
  };

  const handleFileUpload = (field: string, file: File) => {
    // Simulação de upload - em produção seria uma chamada real
    const fakeUrl = `/uploads/${file.name}`;
    
    if (field === 'fotos_galeria') {
      setFormData(prev => ({
        ...prev,
        fotos_galeria: [...prev.fotos_galeria, fakeUrl]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: fakeUrl
      }));
    }

    toast({
      title: "Upload realizado",
      description: `${file.name} foi enviado com sucesso.`
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotos_galeria: prev.fotos_galeria.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Landing Page</DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basicas">Básicas</TabsTrigger>
            <TabsTrigger value="caracteristicas">Características</TabsTrigger>
            <TabsTrigger value="midia">Mídia</TabsTrigger>
            <TabsTrigger value="contato">Mapa & Contato</TabsTrigger>
          </TabsList>

          <TabsContent value="basicas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome_projeto">Nome do Projeto *</Label>
                    <Input
                      id="nome_projeto"
                      value={formData.nome_projeto}
                      onChange={(e) => handleInputChange('nome_projeto', e.target.value)}
                      placeholder="Ex: Residencial Pixinguinha"
                    />
                  </div>
                  <div>
                    <Label htmlFor="regiao">Região *</Label>
                    <Select
                      value={formData.regiao}
                      onValueChange={(value) => handleInputChange('regiao', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a região..." />
                      </SelectTrigger>
                      <SelectContent>
                        {regioes.map((regiao) => (
                          <SelectItem key={regiao} value={regiao}>
                            {regiao}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="slogan">Slogan</Label>
                  <Input
                    id="slogan"
                    value={formData.slogan}
                    onChange={(e) => handleInputChange('slogan', e.target.value)}
                    placeholder="Ex: A junção do passado e o presente moldando o futuro"
                  />
                </div>

                <div>
                  <Label htmlFor="descricao">Descrição Completa</Label>
                  <Textarea
                    id="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    placeholder="Descreva o empreendimento detalhadamente..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="endereco">Endereço Completo</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="previsao_entrega">Previsão de Entrega</Label>
                    <Input
                      id="previsao_entrega"
                      value={formData.previsao_entrega}
                      onChange={(e) => handleInputChange('previsao_entrega', e.target.value)}
                      placeholder="Ex: Maio/2027"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="preco">Preço</Label>
                    <Input
                      id="preco"
                      value={formData.preco}
                      onChange={(e) => handleInputChange('preco', e.target.value)}
                      placeholder="Ex: A partir de R$ 294.900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="url_pagina">URL da Página *</Label>
                    <Input
                      id="url_pagina"
                      value={formData.url_pagina}
                      onChange={(e) => handleInputChange('url_pagina', e.target.value)}
                      placeholder="Ex: /niteroi/lancamento/projeto-nome"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="caracteristicas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Características e Diferenciais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tipos_apartamento">Tipos de Apartamento</Label>
                    <Input
                      id="tipos_apartamento"
                      value={formData.tipos_apartamento}
                      onChange={(e) => handleInputChange('tipos_apartamento', e.target.value)}
                      placeholder="Ex: 1 a 3 quartos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vagas">Vagas</Label>
                    <Input
                      id="vagas"
                      value={formData.vagas}
                      onChange={(e) => handleInputChange('vagas', e.target.value)}
                      placeholder="Ex: Opcionais"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Área</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      placeholder="Ex: 45m² a 85m²"
                    />
                  </div>
                </div>

                <div>
                  <Label>Diferenciais do Empreendimento</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={diferencialInput}
                      onChange={(e) => setDiferencialInput(e.target.value)}
                      placeholder="Digite um diferencial..."
                      onKeyPress={(e) => e.key === 'Enter' && addDiferencial()}
                    />
                    <Button type="button" onClick={addDiferencial}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.diferenciais.map((diferencial, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-2">
                        {diferencial}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => removeDiferencial(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="midia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mídia e Imagens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Imagem de Background (Hero Section)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('imagem_background', file);
                      }}
                      className="hidden"
                      id="background-upload"
                    />
                    <label htmlFor="background-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Clique para fazer upload da imagem de fundo</p>
                      {formData.imagem_background && (
                        <p className="text-green-600 mt-2">✓ Imagem carregada</p>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Imagem do Card (Home Page) *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('imagem_card', file);
                      }}
                      className="hidden"
                      id="card-upload"
                    />
                    <label htmlFor="card-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Clique para fazer upload da imagem do card</p>
                      {formData.imagem_card && (
                        <p className="text-green-600 mt-2">✓ Imagem carregada</p>
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <Label>Galeria de Fotos</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        files.forEach(file => handleFileUpload('fotos_galeria', file));
                      }}
                      className="hidden"
                      id="gallery-upload"
                    />
                    <label htmlFor="gallery-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p>Clique para fazer upload de múltiplas fotos</p>
                    </label>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {formData.fotos_galeria.map((foto, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded border flex items-center justify-center">
                          <span className="text-xs text-gray-500">Foto {index + 1}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>URLs de Vídeos</Label>
                  <div className="flex gap-2">
                    <Input
                      value={videoUrlInput}
                      onChange={(e) => setVideoUrlInput(e.target.value)}
                      placeholder="Cole a URL do vídeo (YouTube ou arquivo local)..."
                    />
                    <Button type="button" onClick={addVideoUrl}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 mt-3">
                    {formData.videos_urls.map((url, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={url} readOnly className="flex-1" />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeVideoUrl(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contato" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Mapa e Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="url_maps">URL do Google Maps (Embed)</Label>
                  <Textarea
                    id="url_maps"
                    value={formData.url_maps}
                    onChange={(e) => handleInputChange('url_maps', e.target.value)}
                    placeholder="Cole aqui o código embed do Google Maps..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">Telefone de Contato</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(21) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="responsavel_lead">Responsável pelos Leads</Label>
                    <Input
                      id="responsavel_lead"
                      value={formData.responsavel_lead}
                      onChange={(e) => handleInputChange('responsavel_lead', e.target.value)}
                      placeholder="Nome do responsável"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <div className="flex gap-2">
            {currentTab !== "basicas" && (
              <Button 
                variant="outline" 
                onClick={() => {
                  const tabs = ["basicas", "caracteristicas", "midia", "contato"];
                  const currentIndex = tabs.indexOf(currentTab);
                  setCurrentTab(tabs[currentIndex - 1]);
                }}
              >
                Anterior
              </Button>
            )}
            {currentTab !== "contato" ? (
              <Button 
                onClick={() => {
                  const tabs = ["basicas", "caracteristicas", "midia", "contato"];
                  const currentIndex = tabs.indexOf(currentTab);
                  setCurrentTab(tabs[currentIndex + 1]);
                }}
              >
                Próximo
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Criar Landing Page
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
