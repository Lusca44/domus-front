import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import {
  imovelApi,
  regiaoApi,
  tipologiaApi,
  finalidadeApi,
  imagemApi,
} from "@/utils/apiConfig";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trash2,
  Edit,
  Plus,
  Home,
  MapPin,
  ExternalLink,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Imovel } from "@/cards/imoveis";
import { resolveImageUrl } from "@/utils/imageConfig";
import {
  updateAlugueisFromAPI,
  updateImoveisUsadosFromAPI,
} from "@/cards/imoveis/imoveis";

interface ImovelAdmin {
  id: string;
  titulo: string;
  descricaoImovel?: string;
  endereco?: string;
  valor?: number;
  areaQuadrada?: string;
  quantidadeQuartos?: number;
  quantidadeBanheiros?: number;
  quantidadeVagas?: number;
  urlFotoCard?: string;
  urlsFotos?: string[];
  urlLocalizacaoMaps?: string;
  diferenciais?: string[];
  finalidadeId?: string[];
  regiaoId?: string;
  tipologiaId?: string[];
  valorCondominio?: number;
  valorIptu?: number;
  quantidadeSuites?: number;
  createdAt: string;
  updatedAt: string;
}

interface Regiao {
  id: string;
  nomeRegiao: string;
}

interface Tipologia {
  id: string;
  nome: string;
}

interface Finalidade {
  id: string;
  nome: string;
}

export default function ImoveisAdminPage() {
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imoveis, setImoveis] = useState<ImovelAdmin[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [selectedImovel, setSelectedImovel] = useState<ImovelAdmin | null>(
    null
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("todos");
  const [formData, setFormData] = useState({
    titulo: "",
    descricaoImovel: "",
    endereco: "",
    valor: "",
    areaQuadrada: "",
    quantidadeQuartos: "",
    quantidadeBanheiros: "",
    quantidadeVagas: "",
    valorCondominio: "",
    valorIptu: "",
    quantidadeSuites: "",
    urlFotoCard: "",
    urlsFotos: [] as string[],
    urlLocalizacaoMaps: "",
    diferenciais: "",
    finalidadeId: [] as string[],
    regiaoId: "",
    tipologiaId: [] as string[],
  });

  const [removedCardImage, setRemovedCardImage] = useState(false);
  const [removedGalleryImages, setRemovedGalleryImages] = useState<string[]>(
    []
  );

  // Função para remover imagem do card
  const handleRemoveCardImage = () => {
    if (!formData.urlFotoCard) return;

    setRemovedCardImage(true);
    setFormData({ ...formData, urlFotoCard: "" });
  };

  // Função para remover imagem da galeria
  const handleRemoveGalleryImage = (url: string) => {
    const newUrls = formData.urlsFotos.filter((u) => u !== url);
    setRemovedGalleryImages([...removedGalleryImages, url]);
    setFormData({ ...formData, urlsFotos: newUrls });
  };

  const { toast } = useToast();
  const { execute: fetchImoveis, loading: loadingImoveis } = useApi();
  const { execute: fetchRegioes } = useApi();
  const { execute: fetchTipologias } = useApi();
  const { execute: fetchFinalidades } = useApi();
  const { execute: createImovel, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: "Imóvel criado com sucesso!",
  });
  const { execute: updateImovel, loading: loadingUpdate } = useApi({
    showSuccessToast: true,
    successMessage: "Imóvel atualizado com sucesso!",
  });
  const { execute: deleteImovel, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: "Imóvel excluído com sucesso!",
  });

  // Componente de preview de imagem
  const ImagePreview = ({
    file,
    className,
  }: {
    file: File;
    className?: string;
  }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      return () => {
        // Limpeza
      };
    }, [file]);

    return preview ? (
      <img
        src={preview}
        alt="Preview"
        className={`w-full h-32 object-contain rounded border ${className}`}
      />
    ) : (
      <div className="flex items-center justify-center h-32 bg-gray-100 rounded border">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  };

  const handleCheckboxChange = (
    field: "finalidadeId" | "tipologiaId", // Especifica os campos válidos
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const currentValues = [...prev[field]];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter((v) => v !== value) };
      }
    });
  };
  // Upload de imagem
  const uploadImage = useCallback(
    async (file: File): Promise<string | null> => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const imageUrl = await imagemApi.salvarImagem(formData);
        return imageUrl;
      } catch (error) {
        console.error("Erro no upload da imagem:", error);
        toast({
          title: "Erro",
          description: "Falha ao fazer upload da imagem",
          variant: "destructive",
        });
        return null;
      }
    },
    [toast]
  );

  // Upload de múltiplas imagens
  const uploadMultipleImages = useCallback(
    async (files: File[]): Promise<string[]> => {
      try {
        return await imagemApi.salvarMultiplasImagens(files);
      } catch (error) {
        console.error("Erro no upload de múltiplas imagens:", error);
        toast({
          title: "Erro",
          description: "Falha ao fazer upload das imagens",
          variant: "destructive",
        });
        return [];
      }
    },
    [toast]
  );

  /**
   * Carrega todos os imóveis do backend
   */
  const loadImoveis = useCallback(async () => {
    try {
      const data = await fetchImoveis(() => imovelApi.obterTodosImoveis());
      setImoveis(data || []);
    } catch (error) {
      console.error("Erro ao carregar imóveis:", error);
    }
  }, [fetchImoveis]);

  /**
   * Carrega dados auxiliares (regiões, tipologias e finalidades)
   */
  const loadAuxiliaryData = useCallback(async () => {
    try {
      const finalidadesData = await finalidadeApi.obterTodasFinalidades();
      const regioesData = await regiaoApi.obterTodasRegioes();
      const tipologiasData = await tipologiaApi.obterTodasTipologias();

      // const [regioesData, tipologiasData, finalidadesData] = await Promise.all([
      //   fetchTipologias(() => tipologiaApi.obterTodasTipologias()),
      //   fetchRegioes(() => regiaoApi.obterTodasRegioes()),
      //   fetchFinalidades(() => finalidadeApi.obterTodasFinalidades()),
      // ]);

      setRegioes(regioesData || []);
      setTipologias(tipologiasData || []);
      setFinalidades(finalidadesData || []);
    } catch (error) {
      console.error("Erro ao carregar dados auxiliares:", error);
    }
  }, [fetchRegioes, fetchTipologias, fetchFinalidades]);

  /**
   * Inicializa os dados da página
   */
  useEffect(() => {
    loadImoveis();
    loadAuxiliaryData();
  }, [loadImoveis, loadAuxiliaryData]);

  const regiaoMap = useMemo(() => {
    const map = new Map<string, string>();
    regioes.forEach((regiao) => map.set(regiao.id, regiao.nomeRegiao));
    return map;
  }, [regioes]);

  const finalidadeMap = useMemo(() => {
    const mapFin = new Map<string, string>();
    finalidades.forEach((finalidade) =>
      mapFin.set(finalidade.id, finalidade.nome)
    );
    return mapFin;
  }, [finalidades]);

  /**
   * Filtra imóveis por finalidade
   */
  const filteredImoveis = useMemo(() => {
    if (activeTab === "todos") return imoveis;

    return imoveis.filter((imovel) => {
      if (!imovel.finalidadeId || imovel.finalidadeId.length === 0)
        return false;

      const finalidadesDoImovel = imovel.finalidadeId
        .map((id) => finalidadeMap.get(id)?.toLowerCase())
        .filter(Boolean);

      if (activeTab === "aluguel")
        return finalidadesDoImovel.includes("aluguel");

      if (activeTab === "venda") return finalidadesDoImovel.includes("venda");

      return true;
    });
  }, [imoveis, activeTab, finalidadeMap]);

  // Paginação para galeria de fotos
  const GALLERY_PAGE_SIZE = 6;
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1);

  const paginatedGalleryFiles = useMemo(() => {
    const startIndex = (currentGalleryPage - 1) * GALLERY_PAGE_SIZE;
    return galleryFiles.slice(startIndex, startIndex + GALLERY_PAGE_SIZE);
  }, [galleryFiles, currentGalleryPage]);

  const totalGalleryPages = Math.ceil(galleryFiles.length / GALLERY_PAGE_SIZE);

  /**
   * Manipula o envio do formulário de criação
   */
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    if (!formData.titulo.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    try {
      // Upload das imagens
      const uploadPromises: Promise<any>[] = [];
      let cardUrl = formData.urlFotoCard;
      let galleryUrls = formData.urlsFotos;

      if (cardImageFile) {
        uploadPromises.push(
          uploadImage(cardImageFile).then((url) => {
            if (url) cardUrl = url;
          })
        );
      }

      if (galleryFiles.length > 0) {
        uploadPromises.push(
          uploadMultipleImages(galleryFiles).then((urls) => {
            if (urls && urls.length > 0) galleryUrls = urls;
          })
        );
      }

      await Promise.all(uploadPromises);

      // Preparar dados para envio
      const dataToSend = {
        titulo: formData.titulo,
        descricaoImovel: formData.descricaoImovel,
        endereco: formData.endereco,
        valor: formData.valor ? parseFloat(formData.valor) : undefined,
        areaQuadrada: formData.areaQuadrada,
        quantidadeQuartos: formData.quantidadeQuartos,
        quantidadeBanheiros: formData.quantidadeBanheiros,
        quantidadeVagas: formData.quantidadeVagas,
        valorCondominio: formData.valorCondominio
          ? parseFloat(formData.valorCondominio)
          : undefined,
        valorIptu: formData.valorIptu
          ? parseFloat(formData.valorIptu)
          : undefined,
        quantidadeSuites: formData.quantidadeSuites
          ? parseInt(formData.quantidadeSuites)
          : undefined,
        urlFotoCard: cardUrl || "",
        urlsFotos: galleryUrls,
        urlLocalizacaoMaps: formData.urlLocalizacaoMaps,
        diferenciais: formData.diferenciais
          ? formData.diferenciais.split(",").map((d) => d.trim())
          : [],
        finalidadeId: formData.finalidadeId,
        regiaoId: formData.regiaoId,
        tipologiaId: formData.tipologiaId,
      };

      await createImovel(() => imovelApi.create(dataToSend));
      resetForm();
      setIsCreateDialogOpen(false);
      loadImoveis();
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      toast({
        title: "Erro",
        description: "Falha ao criar imóvel",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setCardImageFile(null);
      setGalleryFiles([]);
    }
  };

  /**
   * Manipula o envio do formulário de edição
   */
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImovel) return;

    setUploading(true);

    try {
      // Processar remoções de imagens antes dos uploads
      const deletePromises: Promise<any>[] = [];

      // Remover imagem do card se marcada
      if (removedCardImage && selectedImovel.urlFotoCard) {
        const urlImageDTO = {
          urlImagem: selectedImovel.urlFotoCard,
          itemId: selectedImovel.id,
          isLancamento: false,
        };
        deletePromises.push(imagemApi.deletarImagem(urlImageDTO));
      }

      // Remover imagens da galeria marcadas
      removedGalleryImages.forEach((url) => {
        const urlImageDTO = {
          urlImagem: url,
          itemId: selectedImovel.id,
          isLancamento: false,
        };
        deletePromises.push(imagemApi.deletarImagem(urlImageDTO));
      });

      // Executar todas as remoções
      await Promise.all(deletePromises);
      // Upload das imagens
      const uploadPromises: Promise<any>[] = [];
      let cardUrl = formData.urlFotoCard;
      let galleryUrls = formData.urlsFotos;

      if (cardImageFile) {
        uploadPromises.push(
          uploadImage(cardImageFile).then((url) => {
            if (url) cardUrl = url;
          })
        );
      }

      if (galleryFiles.length > 0) {
        uploadPromises.push(
          uploadMultipleImages(galleryFiles).then((urls) => {
            if (urls && urls.length > 0)
              galleryUrls = [...galleryUrls, ...urls];
          })
        );
      }

      await Promise.all(uploadPromises);

      // Preparar dados para envio
      const dataToSend = {
        titulo: formData.titulo,
        urlFotoCard: cardUrl || "",
        urlsFotos: galleryUrls,
        finalidadeId: formData.finalidadeId,
        tipologiaId: formData.tipologiaId,
        regiaoId: formData.regiaoId,
        endereco: formData.endereco,
        quantidadeQuartos: formData.quantidadeQuartos || "",
        quantidadeBanheiros: formData.quantidadeBanheiros || "",
        quantidadeVagas: formData.quantidadeVagas || "",
        quantidadeSuites: formData.quantidadeSuites || "",
        areaQuadrada: formData.areaQuadrada || "",
        descricaoImovel: formData.descricaoImovel,
        valor: formData.valor || "",
        valorCondominio: formData.valorCondominio || "",
        valorIptu: formData.valorIptu || "",
        urlLocalizacaoMaps: formData.urlLocalizacaoMaps || "",
      };

      await updateImovel(() => imovelApi.update(selectedImovel.id, dataToSend));
      resetForm();
      setIsEditDialogOpen(false);
      loadImoveis();
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar imóvel",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setCardImageFile(null);
      setGalleryFiles([]);
    }
  };

  /**
   * Manipula a exclusão de um imóvel
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteImovel(() => imovelApi.delete?.(id));
      loadImoveis();
    } catch (error) {
      console.error("Erro ao excluir imóvel:", error);
    }
  };

  /**
   * Reseta o formulário
   */
  const resetForm = () => {
    setFormData({
      titulo: "",
      descricaoImovel: "",
      endereco: "",
      valor: "",
      areaQuadrada: "",
      quantidadeQuartos: "",
      quantidadeBanheiros: "",
      quantidadeVagas: "",
      urlFotoCard: "",
      urlsFotos: [],
      urlLocalizacaoMaps: "",
      diferenciais: "",
      finalidadeId: [],
      regiaoId: "",
      tipologiaId: [],
      valorCondominio: "",
      valorIptu: "",
      quantidadeSuites: "",
    });
    setCardImageFile(null);
  setGalleryFiles([]);
  setRemovedCardImage(false);
  setRemovedGalleryImages([]);
  setCurrentGalleryPage(1);
  setSelectedImovel(null);
  };

  /**
   * Preenche o formulário para edição
   */
  const handleEditClick = (imovel: ImovelAdmin) => {
    setSelectedImovel(imovel);
    setFormData({
      titulo: imovel.titulo,
      descricaoImovel: imovel.descricaoImovel || "",
      endereco: imovel.endereco || "",
      valor: imovel.valor ? imovel.valor.toString() : "",
      areaQuadrada: imovel.areaQuadrada || "",
      quantidadeQuartos: imovel.quantidadeQuartos?.toString() || "",
      quantidadeBanheiros: imovel.quantidadeBanheiros?.toString() || "",
      quantidadeVagas: imovel.quantidadeVagas?.toString() || "",
      urlFotoCard: imovel.urlFotoCard || "",
      urlsFotos: imovel.urlsFotos || [],
      urlLocalizacaoMaps: imovel.urlLocalizacaoMaps || "",
      diferenciais: imovel.diferenciais?.join(", ") || "",
      finalidadeId: imovel.finalidadeId,
      regiaoId: imovel.regiaoId || "",
      tipologiaId: imovel.tipologiaId,
      valorCondominio: imovel.valorCondominio?.toString() || "",
      valorIptu: imovel.valorIptu?.toString() || "",
      quantidadeSuites: imovel.quantidadeSuites?.toString() || "",
    });

    setCardImageFile(null);
    setGalleryFiles([]);
    setRemovedCardImage(false);
    setRemovedGalleryImages([]);
    setIsEditDialogOpen(true);
  };

  /**
   * Gera URL da landing page para o imóvel
   */
  const getLandingPageUrl = (imovel: ImovelAdmin) => {
    return `/imovel/${imovel.id}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Cabeçalho da página */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Imóveis</h1>
            <p className="text-muted-foreground">
              Gerencie os imóveis e suas landing pages
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={loadImoveis}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sincronizar
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Imóvel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Novo Imóvel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-6">
                  {/* Seção: Informações Básicas */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Informações Básicas
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome *</Label>
                        <Input
                          id="nome"
                          value={formData.titulo}
                          onChange={(e) =>
                            setFormData({ ...formData, titulo: e.target.value })
                          }
                          placeholder="Nome do imóvel"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area">Área</Label>
                        <Input
                          id="area"
                          value={formData.areaQuadrada}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              areaQuadrada: e.target.value,
                            })
                          }
                          placeholder="Ex: 80m²"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="descricao">Descrição</Label>
                      <Textarea
                        id="descricao"
                        value={formData.descricaoImovel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            descricaoImovel: e.target.value,
                          })
                        }
                        placeholder="Descrição detalhada do imóvel"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Seção: Detalhes do Imóvel */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Detalhes do Imóvel
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endereco: e.target.value,
                            })
                          }
                          placeholder="Endereço completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preco">Preço (R$)</Label>
                        <Input
                          id="preco"
                          type="number"
                          step="0.01"
                          value={formData.valor}
                          onChange={(e) =>
                            setFormData({ ...formData, valor: e.target.value })
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="quartos">Quartos</Label>
                        <Input
                          id="quartos"
                          type="number"
                          value={formData.quantidadeQuartos}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantidadeQuartos: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="banheiros">Banheiros</Label>
                        <Input
                          id="banheiros"
                          type="number"
                          value={formData.quantidadeBanheiros}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantidadeBanheiros: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vagas">Vagas</Label>
                        <Input
                          id="vagas"
                          type="number"
                          value={formData.quantidadeVagas}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantidadeVagas: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="suites">Suítes</Label>
                        <Input
                          id="suites"
                          type="number"
                          value={formData.quantidadeSuites}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantidadeSuites: e.target.value,
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="valorCondominio">
                          Valor Condomínio (R$)
                        </Label>
                        <Input
                          id="valorCondominio"
                          type="number"
                          step="0.01"
                          value={formData.valorCondominio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              valorCondominio: e.target.value,
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="valorIptu">Valor IPTU (R$)</Label>
                        <Input
                          id="valorIptu"
                          type="number"
                          step="0.01"
                          value={formData.valorIptu}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              valorIptu: e.target.value,
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seção: Classificação */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Classificação
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="regiaoId">Região</Label>
                        <Select
                          value={formData.regiaoId}
                          onValueChange={(value) =>
                            setFormData({ ...formData, regiaoId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a região" />
                          </SelectTrigger>
                          <SelectContent>
                            {regioes.map((regiao) => (
                              <SelectItem key={regiao.id} value={regiao.id}>
                                {regiao.nomeRegiao}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Finalidades</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {finalidades.map((finalidade) => (
                            <div
                              key={finalidade.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`finalidade-${finalidade.id}`}
                                checked={formData.finalidadeId.includes(
                                  finalidade.id
                                )}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    "finalidadeId",
                                    finalidade.id,
                                    e.target.checked
                                  )
                                }
                                disabled={uploading}
                              />
                              <Label htmlFor={`finalidade-${finalidade.id}`}>
                                {finalidade.nome}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Tipologias</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {tipologias.map((tipologia) => (
                          <div
                            key={tipologia.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={`tipologia-${tipologia.id}`}
                              checked={formData.tipologiaId.includes(
                                tipologia.id
                              )}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  "tipologiaId",
                                  tipologia.id,
                                  e.target.checked
                                )
                              }
                              disabled={uploading}
                            />
                            <Label htmlFor={`tipologia-${tipologia.id}`}>
                              {tipologia.nome}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Seção: Imagens */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Imagens</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Imagem Principal (Card)</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setCardImageFile(e.target.files?.[0] || null)
                          }
                          disabled={uploading}
                        />
                        {cardImageFile && (
                          <ImagePreview file={cardImageFile} className="mt-2" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Fotos da Galeria</Label>
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            const newFiles = Array.from(e.target.files || []);
                            setGalleryFiles((prev) => [...prev, ...newFiles]);
                          }}
                          disabled={uploading}
                        />

                        <div className="mt-2">
                          {/* Fotos existentes */}
                          {formData.urlsFotos.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm text-muted-foreground mb-2">
                                Fotos existentes:
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                {formData.urlsFotos.map((url, index) => (
                                  <div key={index} className="relative">
                                    <img
                                      src={resolveImageUrl(url)}
                                      alt={`Foto existente ${index}`}
                                      className="w-full h-24 object-cover rounded"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Novas fotos */}
                          {galleryFiles.length > 0 && (
                            <>
                              <div className="flex justify-between items-center mt-4 mb-2">
                                <p className="text-sm text-muted-foreground">
                                  {galleryFiles.length} nova(s) foto(s)
                                  selecionada(s)
                                </p>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setGalleryFiles([]);
                                  }}
                                  disabled={uploading}
                                >
                                  Limpar Todas
                                </Button>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                {paginatedGalleryFiles.map((file, index) => {
                                  const globalIndex =
                                    (currentGalleryPage - 1) *
                                      GALLERY_PAGE_SIZE +
                                    index;
                                  return (
                                    <div key={globalIndex} className="relative">
                                      <ImagePreview
                                        file={file}
                                        className="w-full h-24 object-cover rounded"
                                      />
                                      <Button
                                        type="button" // Adicione isso para evitar submit acidental
                                        size="icon"
                                        variant="destructive"
                                        className="absolute top-1 right-1 w-6 h-6"
                                        onMouseDown={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          const newFiles = [...galleryFiles];
                                          newFiles.splice(globalIndex, 1);
                                          setGalleryFiles(newFiles);
                                          if (
                                            newFiles.length <=
                                            (currentGalleryPage - 1) *
                                              GALLERY_PAGE_SIZE
                                          ) {
                                            setCurrentGalleryPage(
                                              Math.max(
                                                1,
                                                currentGalleryPage - 1
                                              )
                                            );
                                          }
                                        }}
                                        disabled={uploading}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  );
                                })}
                              </div>

                              {totalGalleryPages > 1 && (
                                <div className="flex justify-center mt-4 space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                      currentGalleryPage === 1 || uploading
                                    }
                                    onClick={() =>
                                      setCurrentGalleryPage((prev) =>
                                        Math.max(1, prev - 1)
                                      )
                                    }
                                  >
                                    Anterior
                                  </Button>
                                  <span className="flex items-center px-3">
                                    Página {currentGalleryPage} de{" "}
                                    {totalGalleryPages}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={
                                      currentGalleryPage ===
                                        totalGalleryPages || uploading
                                    }
                                    onClick={() =>
                                      setCurrentGalleryPage((prev) =>
                                        Math.min(totalGalleryPages, prev + 1)
                                      )
                                    }
                                  >
                                    Próxima
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Seção: Localização e Diferenciais */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Localização e Diferenciais
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="mapUrl">URL do Mapa</Label>
                      <Input
                        id="mapUrl"
                        value={formData.urlLocalizacaoMaps}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            urlLocalizacaoMaps: e.target.value,
                          })
                        }
                        placeholder="URL do Google Maps embed"
                      />
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="diferenciais">Diferenciais</Label>
                      <Textarea
                        id="diferenciais"
                        value={formData.diferenciais}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            diferenciais: e.target.value,
                          })
                        }
                        placeholder="Piscina, Academia, Salão de festas (separados por vírgula)"
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      disabled={uploading}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={uploading || loadingCreate}>
                      {uploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando imagens...
                        </>
                      ) : loadingCreate ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Criando...
                        </>
                      ) : (
                        "Criar"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Modal de Edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Editar Imóvel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                    placeholder="Nome do imóvel"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Área</Label>
                  <Input
                    id="area"
                    value={formData.areaQuadrada}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        areaQuadrada: e.target.value,
                      })
                    }
                    placeholder="Ex: 80m²"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricaoImovel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      descricaoImovel: e.target.value,
                    })
                  }
                  placeholder="Descrição detalhada do imóvel"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endereco">Endereço</Label>
                  <Input
                    id="endereco"
                    value={formData.endereco}
                    onChange={(e) =>
                      setFormData({ ...formData, endereco: e.target.value })
                    }
                    placeholder="Endereço completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preco">Preço (R$)</Label>
                  <Input
                    id="preco"
                    type="number"
                    step="0.01"
                    value={formData.valor}
                    onChange={(e) =>
                      setFormData({ ...formData, valor: e.target.value })
                    }
                    placeholder="0.00"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valorCondominio">
                      Valor Condomínio (R$)
                    </Label>
                    <Input
                      id="valorCondominio"
                      type="number"
                      step="0.01"
                      value={formData.valorCondominio}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          valorCondominio: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valorIptu">Valor IPTU (R$)</Label>
                    <Input
                      id="valorIptu"
                      type="number"
                      step="0.01"
                      value={formData.valorIptu}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          valorIptu: e.target.value,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantidadeSuites">Suítes</Label>
                    <Input
                      id="quantidadeSuites"
                      type="number"
                      value={formData.quantidadeSuites}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quantidadeSuites: e.target.value,
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quartos">Quartos</Label>
                  <Input
                    id="quartos"
                    type="number"
                    value={formData.quantidadeQuartos}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantidadeQuartos: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="banheiros">Banheiros</Label>
                  <Input
                    id="banheiros"
                    type="number"
                    value={formData.quantidadeBanheiros}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantidadeBanheiros: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vagas">Vagas</Label>
                  <Input
                    id="vagas"
                    type="number"
                    value={formData.quantidadeVagas}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantidadeVagas: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Finalidades</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {finalidades.map((finalidade) => (
                      <div
                        key={finalidade.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`finalidade-${finalidade.id}`}
                          checked={formData.finalidadeId.includes(
                            finalidade.id
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(
                              "finalidadeId",
                              finalidade.id,
                              e.target.checked
                            )
                          }
                          disabled={uploading}
                        />
                        <Label htmlFor={`finalidade-${finalidade.id}`}>
                          {finalidade.nome}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="regiaoId">Região</Label>
                  <Select
                    value={formData.regiaoId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, regiaoId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a região" />
                    </SelectTrigger>
                    <SelectContent>
                      {regioes.map((regiao) => (
                        <SelectItem key={regiao.id} value={regiao.id}>
                          {regiao.nomeRegiao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipologias</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {tipologias.map((tipologia) => (
                      <div
                        key={tipologia.id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`tipologia-${tipologia.id}`}
                          checked={formData.tipologiaId.includes(tipologia.id)}
                          onChange={(e) =>
                            handleCheckboxChange(
                              "tipologiaId",
                              tipologia.id,
                              e.target.checked
                            )
                          }
                          disabled={uploading}
                        />
                        <Label htmlFor={`tipologia-${tipologia.id}`}>
                          {tipologia.nome}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Imagem Principal (Card)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCardImageFile(e.target.files?.[0] || null)
                  }
                  disabled={uploading}
                />
                {cardImageFile && (
                  <ImagePreview file={cardImageFile} className="mt-2" />
                )}
                {formData.urlFotoCard &&
                  !cardImageFile &&
                  !removedCardImage && (
                    <div className="mt-2 relative">
                      <p className="text-sm text-muted-foreground">
                        Imagem atual:
                      </p>
                      <img
                        src={resolveImageUrl(formData.urlFotoCard)}
                        alt="Card atual"
                        className="w-full h-32 object-contain rounded border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-6 right-2"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveCardImage();
                        }}
                        disabled={uploading}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remover
                      </Button>
                    </div>
                  )}
              </div>
              {/* ... código anterior ... */}

              <div className="space-y-2">
                <Label>Fotos da Galeria</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);
                    setGalleryFiles((prev) => [...prev, ...newFiles]);
                  }}
                  disabled={uploading}
                />

                <div className="mt-2">
                  {/* Seção para fotos existentes */}
                  {formData.urlsFotos.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Fotos existentes:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {formData.urlsFotos
                          .filter((url) => !removedGalleryImages.includes(url))
                          .map((url) => (
                            <div key={url} className="relative">
                              <img
                                src={resolveImageUrl(url)}
                                alt={`Foto existente ${url}`}
                                className="w-full h-24 object-cover rounded"
                              />
                              <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-1 right-1 w-6 h-6"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleRemoveGalleryImage(url);
                                }}
                                disabled={uploading}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Seção para novas fotos */}
                  {galleryFiles.length > 0 && (
                    <>
                      <div className="flex justify-between items-center mt-4 mb-2">
                        <p className="text-sm text-muted-foreground">
                          {galleryFiles.length} nova(s) foto(s) selecionada(s)
                        </p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setGalleryFiles([]);
                          }}
                          disabled={uploading}
                        >
                          Limpar Todas
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {paginatedGalleryFiles.map((file, index) => {
                          const globalIndex =
                            (currentGalleryPage - 1) * GALLERY_PAGE_SIZE +
                            index;
                          return (
                            <div key={globalIndex} className="relative">
                              <ImagePreview
                                file={file}
                                className="w-full h-24 object-cover rounded"
                              />
                              <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-1 right-1 w-6 h-6"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const newFiles = [...galleryFiles];
                                  newFiles.splice(globalIndex, 1);
                                  setGalleryFiles(newFiles);
                                  if (
                                    newFiles.length <=
                                    (currentGalleryPage - 1) * GALLERY_PAGE_SIZE
                                  ) {
                                    setCurrentGalleryPage(
                                      Math.max(1, currentGalleryPage - 1)
                                    );
                                  }
                                }}
                                disabled={uploading}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                      {totalGalleryPages > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={currentGalleryPage === 1 || uploading}
                            onClick={() =>
                              setCurrentGalleryPage((prev) =>
                                Math.max(1, prev - 1)
                              )
                            }
                          >
                            Anterior
                          </Button>
                          <span className="flex items-center px-3">
                            Página {currentGalleryPage} de {totalGalleryPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={
                              currentGalleryPage === totalGalleryPages ||
                              uploading
                            }
                            onClick={() =>
                              setCurrentGalleryPage((prev) =>
                                Math.min(totalGalleryPages, prev + 1)
                              )
                            }
                          >
                            Próxima
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapUrl">URL do Mapa</Label>
                <Input
                  id="mapUrl"
                  value={formData.urlLocalizacaoMaps}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      urlLocalizacaoMaps: e.target.value,
                    })
                  }
                  placeholder="URL do Google Maps embed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diferenciais">Diferenciais</Label>
                <Textarea
                  id="diferenciais"
                  value={formData.diferenciais}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      diferenciais: e.target.value,
                    })
                  }
                  placeholder="Piscina, Academia, Salão de festas (separados por vírgula)"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={uploading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={uploading || loadingUpdate}>
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando imagens...
                    </>
                  ) : loadingUpdate ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Atualizando...
                    </>
                  ) : (
                    "Atualizar"
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Abas para filtrar por finalidade */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="aluguel">Aluguel</TabsTrigger>
            <TabsTrigger value="venda">Venda</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {/* Lista de imóveis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Imóveis Cadastrados
                </CardTitle>
                <CardDescription>
                  {filteredImoveis.length} imóvel(s) encontrado(s)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loadingImoveis ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                  </div>
                ) : filteredImoveis.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum imóvel cadastrado
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Região</TableHead>
                        <TableHead>Finalidade</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>Área</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredImoveis.map((imovel) => (
                        <TableRow key={imovel.id}>
                          <TableCell className="font-medium">
                            {imovel.titulo}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              {imovel.regiaoId
                                ? regiaoMap.get(imovel.regiaoId) || "-"
                                : "-"}
                            </div>
                          </TableCell>
                          <TableCell>
                            {imovel.finalidadeId
                              ?.map((id) => finalidadeMap.get(id) || "N/A")
                              .join(", ") || "-"}
                          </TableCell>
                          <TableCell>
                            {imovel.valor
                              ? `R$ ${imovel.valor.toLocaleString("pt-BR")}`
                              : "-"}
                          </TableCell>
                          <TableCell>{imovel.areaQuadrada || "-"} m²</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={getLandingPageUrl(imovel)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(imovel)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Confirmar exclusão
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja excluir o imóvel "
                                      {imovel.titulo}"? Esta ação não pode ser
                                      desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(imovel.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      {loadingDelete
                                        ? "Excluindo..."
                                        : "Excluir"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
