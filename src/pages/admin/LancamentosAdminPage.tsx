import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useApi } from "@/hooks/useApi";
import {
  lancamentoApi,
  regiaoApi,
  tipologiaApi,
  finalidadeApi,
  imagemApi
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
import {
  Trash2,
  Edit,
  Plus,
  Building2,
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
import { updateLancamentosFromAPI } from "@/cards/lancamentos/lancamentos";

interface Lancamento {
  id: string;
  nomeLancamento: string;
  urlFotoBackGround?: string;
  urlsFotos?: string[];
  slogan?: string;
  regiaoId?: string;
  endereco?: string;
  sobreLancamento?: {
    titulo: string;
    texto: string;
    cardsSobreLancamento?: Array<{
      icone: string;
      titulo: string;
      texto: string;
    }>;
  };
  diferenciaisLancamento?: string[];
  proximidadesDaLocalizacao?: string[];
  localizacaoMapsSource?: string;
  cardLancamentoInfo?: {
    valor: string;
    quartosDisponiveis: string[];
    isCardDestaque: boolean;
    areasDisponiveis: string[];
    finalidadeId: string;
    tipologiaId: string[];
    urlImagemCard: string;
    statusObra: "Lançamento" | "Em obras" | "Pronto";
  };
  regiao?: any;
  tipologia?: any;
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

export default function LancamentosAdminPage() {
  // Adicionar estado para armazenar ID da finalidade "Lançamento"
  const [lancamentoFinalidadeId, setLancamentoFinalidadeId] = useState<string>("");
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [tipologias, setTipologias] = useState<Tipologia[]>([]);
  const [finalidades, setFinalidades] = useState<Finalidade[]>([]);
  const [selectedLancamento, setSelectedLancamento] = useState<Lancamento | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Estado para o modal de edição
  const [editModal, setEditModal] = useState({
    isOpen: false,
    lancamento: null as Lancamento | null,
  });
  
  const [formData, setFormData] = useState({
    nomeLancamento: "",
    urlFotoBackGround: "",
    urlsFotos: "",
    slogan: "",
    regiaoId: "",
    endereco: "",
    sobreLancamentoTitulo: "",
    sobreLancamentoTexto: "",
    diferenciaisLancamento: "",
    proximidadesDaLocalizacao: "",
    localizacaoMapsSource: "",
    valor: "",
    quartosDisponiveis: "",
    isCardDestaque: false,
    areasDisponiveis: "",
    finalidadeId: "",
    tipologiaId: [] as string[],
    urlImagemCard: "",
    statusObra: "Lançamento" as const,
  });

  const { toast } = useToast();
  const { execute: fetchLancamentos, loading: loadingLancamentos } = useApi();
  const { execute: fetchRegioes } = useApi();
  const { execute: fetchTipologias } = useApi();
  const { execute: fetchFinalidades } = useApi();
  const { execute: createLancamento, loading: loadingCreate } = useApi({
    showSuccessToast: true,
    successMessage: "Lançamento criado com sucesso!",
  });
  const { execute: updateLancamento, loading: loadingUpdate } = useApi({
    showSuccessToast: true,
    successMessage: "Lançamento atualizado com sucesso!",
  });
  const { execute: deleteLancamento, loading: loadingDelete } = useApi({
    showSuccessToast: true,
    successMessage: "Lançamento excluído com sucesso!",
  });

  // Efeito para setar a finalidade "Lançamento"
  useEffect(() => {
    if (finalidades.length > 0) {
      const lancamentoFinalidade = finalidades.find(
        (f) => f.nome.toLowerCase() === "lançamento"
      );
      if (lancamentoFinalidade) {
        setLancamentoFinalidadeId(lancamentoFinalidade.id);
        setFormData((prev) => ({
          ...prev,
          finalidadeId: lancamentoFinalidade.id,
        }));
      } else {
        toast({
          title: "Atenção",
          description: "Finalidade 'Lançamento' não encontrada. Por favor, crie uma finalidade com esse nome.",
          variant: "destructive",
        });
      }
    }
  }, [finalidades, toast]);

  // Componente de preview de imagem otimizado
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
        // Limpeza: não é necessária para data URLs
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

  const regiaoMap = useMemo(() => {
    const map = new Map<string, string>();
    regioes.forEach((regiao) => map.set(regiao.id, regiao.nomeRegiao));
    return map;
  }, [regioes]);

  // Upload de imagem otimizado
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

  // Upload de múltiplas imagens com limitação de concorrência
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

  // Carregar dados
  const loadLancamentos = useCallback(async () => {
    try {
      const data = await fetchLancamentos(() =>
        lancamentoApi.obterTodosLancamentos()
      );
      setLancamentos(data || []);
      if (data?.length > 0) {
        await syncLancamentosToCards(data);
      }
    } catch (error) {
      console.error("Erro ao carregar lançamentos:", error);
    }
  }, [fetchLancamentos]);

  const syncLancamentosToCards = useCallback(
    async (lancamentosData: Lancamento[]) => {
      try {
        const lancamentosForCards: Imovel[] = lancamentosData
          .filter((l) => l.cardLancamentoInfo)
          .map((l, index) => ({
            id: l.id || String(index + 2),
            titulo: l.nomeLancamento,
            descricao: l.sobreLancamento?.texto || l.slogan || "",
            preco: `A partir de R$ ${l.cardLancamentoInfo?.valor || ""}`,
            imagem: l.cardLancamentoInfo?.urlImagemCard || "/placeholder.svg",
            regiao:
              regioes.find((r) => r.id === l.regiaoId)?.nomeRegiao ||
              "Região não informada",
            quartos: parseInt(
              l.cardLancamentoInfo?.quartosDisponiveis[0] || "1"
            ),
            quartosDisponiveis:
              l.cardLancamentoInfo?.quartosDisponiveis.map((q) =>
                parseInt(q)
              ) || [],
            area: l.cardLancamentoInfo?.areasDisponiveis[0]
              ? `${l.cardLancamentoInfo.areasDisponiveis[0]}m²`
              : "0m²",
            areasDisponiveis:
              l.cardLancamentoInfo?.areasDisponiveis.map((a) => `${a}m²`) || [],
            url: `/lancamento/${l.id}`,
            destaque: l.cardLancamentoInfo?.isCardDestaque || false,
            tipo: "lancamento" as const,
            statusObra: l.cardLancamentoInfo?.statusObra || "Lançamento",
            regiaoDestaque: l.cardLancamentoInfo?.isCardDestaque || false,
          }));

        updateLancamentosFromAPI(lancamentosForCards);
        toast({
          title: "Sucesso",
          description: `${lancamentosForCards.length} lançamento(s) sincronizado(s)`,
        });
      } catch (error) {
        console.error("Erro ao sincronizar lançamentos:", error);
        toast({
          title: "Aviso",
          description: "Erro ao sincronizar lançamentos",
          variant: "destructive",
        });
      }
    },
    [regioes, toast]
  );

  const loadAuxiliaryData = useCallback(async () => {
    try {
      const [regioesData, tipologiasData, finalidadesData] = await Promise.all([
        fetchRegioes(() => regiaoApi.obterTodasRegioes()),
        fetchTipologias(() => tipologiaApi.obterTodasTipologias()),
        fetchFinalidades(() => finalidadeApi.obterTodasFinalidades()),
      ]);
      setRegioes(regioesData || []);
      setTipologias(tipologiasData || []);
      setFinalidades(finalidadesData || []);
    } catch (error) {
      console.error("Erro ao carregar dados auxiliares:", error);
    }
  }, [fetchRegioes, fetchTipologias, fetchFinalidades]);

  useEffect(() => {
    loadLancamentos();
    loadAuxiliaryData();
  }, [loadLancamentos, loadAuxiliaryData]);

  // Manipulador de envio otimizado
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setUploading(true);

      try {
        const [backgroundUrl, cardUrl, galleryUrlsResult] = await Promise.all([
          backgroundImageFile
            ? uploadImage(backgroundImageFile)
            : Promise.resolve(formData.urlFotoBackGround),
          cardImageFile
            ? uploadImage(cardImageFile)
            : Promise.resolve(formData.urlImagemCard),
          galleryFiles.length > 0
            ? uploadMultipleImages(galleryFiles)
            : Promise.resolve(
                formData.urlsFotos.split(",").filter((url) => url.trim())
              ),
        ]);

        // Verificar se o upload do background foi bem-sucedido
        if (backgroundImageFile && !backgroundUrl) {
          throw new Error("Falha no upload da imagem de fundo");
        }

        // Preparar dados para envio
        const dataToSend = {
          nomeLancamento: formData.nomeLancamento,
          urlFotoBackGround: backgroundUrl || formData.urlFotoBackGround || "",
          urlsFotos: Array.isArray(galleryUrlsResult)
            ? galleryUrlsResult
            : galleryUrlsResult,
          slogan: formData.slogan,
          regiaoId: formData.regiaoId,
          endereco: formData.endereco,
          sobreLancamento: {
            titulo: formData.sobreLancamentoTitulo,
            texto: formData.sobreLancamentoTexto,
            cardsSobreLancamento: [],
          },
          diferenciaisLancamento: formData.diferenciaisLancamento
            ? formData.diferenciaisLancamento.split(",").map((d) => d.trim())
            : [],
          proximidadesDaLocalizacao: formData.proximidadesDaLocalizacao
            ? formData.proximidadesDaLocalizacao.split(",").map((p) => p.trim())
            : [],
          localizacaoMapsSource: formData.localizacaoMapsSource,
          cardLancamentoInfo: {
            valor: formData.valor,
            quartosDisponiveis: formData.quartosDisponiveis
              ? formData.quartosDisponiveis.split(",").map((q) => q.trim())
              : [],
            isCardDestaque: formData.isCardDestaque,
            areasDisponiveis: formData.areasDisponiveis
              ? formData.areasDisponiveis.split(",").map((a) => a.trim())
              : [],
            finalidadeId: formData.finalidadeId,
            tipologiaId: formData.tipologiaId,
            urlImagemCard: cardUrl || "",
            statusObra: formData.statusObra,
          },
        };

        await createLancamento(() => lancamentoApi.create(dataToSend));
        resetForm();
        setIsDialogOpen(false);
        loadLancamentos();
      } catch (error) {
        console.error("Erro ao criar lançamento:", error);
        toast({
          title: "Erro",
          description: "Falha ao criar lançamento",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
        setBackgroundImageFile(null);
        setCardImageFile(null);
        setGalleryFiles([]);
      }
    },
    [
      backgroundImageFile,
      cardImageFile,
      galleryFiles,
      formData,
      uploadImage,
      uploadMultipleImages,
      createLancamento,
      loadLancamentos,
      toast,
    ]
  );

  // Função para abrir o modal de edição
  const openEditModal = useCallback((lancamento: Lancamento) => {
    setEditModal({
      isOpen: true,
      lancamento,
    });
    
    // Preencher o formulário com os dados do lançamento
    setFormData({
      nomeLancamento: lancamento.nomeLancamento,
      urlFotoBackGround: lancamento.urlFotoBackGround || "",
      urlsFotos: lancamento.urlsFotos?.join(", ") || "",
      slogan: lancamento.slogan || "",
      regiaoId: lancamento.regiaoId || "",
      endereco: lancamento.endereco || "",
      sobreLancamentoTitulo: lancamento.sobreLancamento?.titulo || "",
      sobreLancamentoTexto: lancamento.sobreLancamento?.texto || "",
      diferenciaisLancamento: lancamento.diferenciaisLancamento?.join(", ") || "",
      proximidadesDaLocalizacao: lancamento.proximidadesDaLocalizacao?.join(", ") || "",
      localizacaoMapsSource: lancamento.localizacaoMapsSource || "",
      valor: lancamento.cardLancamentoInfo?.valor || "",
      quartosDisponiveis: lancamento.cardLancamentoInfo?.quartosDisponiveis?.join(", ") || "",
      isCardDestaque: lancamento.cardLancamentoInfo?.isCardDestaque || false,
      areasDisponiveis: lancamento.cardLancamentoInfo?.areasDisponiveis?.join(", ") || "",
      finalidadeId: lancamento.cardLancamentoInfo?.finalidadeId || lancamentoFinalidadeId,
      tipologiaId: lancamento.cardLancamentoInfo?.tipologiaId || [],
      urlImagemCard: lancamento.cardLancamentoInfo?.urlImagemCard || "",
      statusObra: "Lançamento",
    });
  }, [lancamentoFinalidadeId]);

  // Função para fechar o modal de edição
  const closeEditModal = useCallback(() => {
    setEditModal({ isOpen: false, lancamento: null });
    resetForm();
  }, []);

  // Função para atualizar um lançamento
  const handleUpdate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editModal.lancamento) return;

      setUploading(true);

      try {
        const [backgroundUrl, cardUrl, galleryUrlsResult] = await Promise.all([
          backgroundImageFile
            ? uploadImage(backgroundImageFile)
            : Promise.resolve(formData.urlFotoBackGround),
          cardImageFile
            ? uploadImage(cardImageFile)
            : Promise.resolve(formData.urlImagemCard),
          galleryFiles.length > 0
            ? uploadMultipleImages(galleryFiles)
            : Promise.resolve(
                formData.urlsFotos.split(",").filter((url) => url.trim())
              ),
        ]);

        // Preparar dados para envio
        const dataToSend = {
          nomeLancamento: formData.nomeLancamento,
          urlFotoBackGround: backgroundUrl || formData.urlFotoBackGround || "",
          urlsFotos: Array.isArray(galleryUrlsResult)
            ? galleryUrlsResult
            : galleryUrlsResult,
          slogan: formData.slogan,
          regiaoId: formData.regiaoId,
          endereco: formData.endereco,
          sobreLancamento: {
            titulo: formData.sobreLancamentoTitulo,
            texto: formData.sobreLancamentoTexto,
            cardsSobreLancamento: [],
          },
          diferenciaisLancamento: formData.diferenciaisLancamento
            ? formData.diferenciaisLancamento.split(",").map((d) => d.trim())
            : [],
          proximidadesDaLocalizacao: formData.proximidadesDaLocalizacao
            ? formData.proximidadesDaLocalizacao.split(",").map((p) => p.trim())
            : [],
          localizacaoMapsSource: formData.localizacaoMapsSource,
          cardLancamentoInfo: {
            valor: formData.valor,
            quartosDisponiveis: formData.quartosDisponiveis
              ? formData.quartosDisponiveis.split(",").map((q) => q.trim())
              : [],
            isCardDestaque: formData.isCardDestaque,
            areasDisponiveis: formData.areasDisponiveis
              ? formData.areasDisponiveis.split(",").map((a) => a.trim())
              : [],
            finalidadeId: formData.finalidadeId,
            tipologiaId: formData.tipologiaId,
            urlImagemCard: cardUrl || "",
            statusObra: formData.statusObra,
          },
        };

        await updateLancamento(() => 
          lancamentoApi.update(editModal.lancamento!.id, dataToSend)
        );
        closeEditModal();
        loadLancamentos();
      } catch (error) {
        console.error("Erro ao atualizar lançamento:", error);
        toast({
          title: "Erro",
          description: "Falha ao atualizar lançamento",
          variant: "destructive",
        });
      } finally {
        setUploading(false);
        setBackgroundImageFile(null);
        setCardImageFile(null);
        setGalleryFiles([]);
      }
    },
    [
      editModal.lancamento,
      backgroundImageFile,
      cardImageFile,
      galleryFiles,
      formData,
      uploadImage,
      uploadMultipleImages,
      updateLancamento,
      loadLancamentos,
      toast,
      closeEditModal
    ]
  );

  // Otimização: Paginação para galeria de fotos
  const GALLERY_PAGE_SIZE = 6;
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1);

  const paginatedGalleryFiles = useMemo(() => {
    const startIndex = (currentGalleryPage - 1) * GALLERY_PAGE_SIZE;
    return galleryFiles.slice(startIndex, startIndex + GALLERY_PAGE_SIZE);
  }, [galleryFiles, currentGalleryPage]);

  const totalGalleryPages = Math.ceil(galleryFiles.length / GALLERY_PAGE_SIZE);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteLancamento(() => lancamentoApi.delete?.(id));
        loadLancamentos();
      } catch (error) {
        console.error("Erro ao excluir lançamento:", error);
      }
    },
    [deleteLancamento, loadLancamentos]
  );

  const resetForm = useCallback(() => {
    setFormData({
      nomeLancamento: "",
      urlFotoBackGround: "",
      urlsFotos: "",
      slogan: "",
      regiaoId: "",
      endereco: "",
      sobreLancamentoTitulo: "",
      sobreLancamentoTexto: "",
      diferenciaisLancamento: "",
      proximidadesDaLocalizacao: "",
      localizacaoMapsSource: "",
      valor: "",
      quartosDisponiveis: "",
      isCardDestaque: false,
      areasDisponiveis: "",
      finalidadeId: "",
      tipologiaId: [],
      urlImagemCard: "",
      statusObra: "Lançamento",
    });
    setSelectedLancamento(null);
    setCurrentGalleryPage(1);
  }, []);

  const getLandingPageUrl = useCallback((lancamento: Lancamento) => {
    return `/lancamento/${lancamento.id}`;
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lançamentos</h1>
            <p className="text-muted-foreground">
              Gerencie os lançamentos imobiliários e suas landing pages
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={loadLancamentos}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sincronizar
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Lançamento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Novo Lançamento</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeLancamento">
                        Nome do Lançamento *
                      </Label>
                      <Input
                        id="nomeLancamento"
                        value={formData.nomeLancamento}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nomeLancamento: e.target.value,
                          })
                        }
                        placeholder="Nome do lançamento"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slogan">Slogan</Label>
                      <Input
                        id="slogan"
                        value={formData.slogan}
                        onChange={(e) =>
                          setFormData({ ...formData, slogan: e.target.value })
                        }
                        placeholder="Slogan do lançamento"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Imagem de Fundo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setBackgroundImageFile(e.target.files?.[0] || null)
                      }
                      disabled={uploading}
                    />
                    {backgroundImageFile && (
                      <ImagePreview file={backgroundImageFile} />
                    )}
                    {formData.urlFotoBackGround && !backgroundImageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          Imagem atual:
                        </p>
                        <img
                          src={formData.urlFotoBackGround}
                          alt="Background atual"
                          className="w-full h-32 object-contain rounded border"
                        />
                      </div>
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
                      {galleryFiles.length > 0 && (
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-muted-foreground">
                            {galleryFiles.length} foto(s) selecionada(s)
                          </p>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setGalleryFiles([])}
                            disabled={uploading}
                          >
                            Limpar Todas
                          </Button>
                        </div>
                      )}

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
                                onClick={() => {
                                  const newFiles = [...galleryFiles];
                                  newFiles.splice(globalIndex, 1);
                                  setGalleryFiles(newFiles);

                                  // Ajustar a página se necessário
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

                      {formData.urlsFotos && galleryFiles.length === 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-muted-foreground">
                            Fotos atuais:
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {formData.urlsFotos
                              .split(",")
                              .map(
                                (url, index) =>
                                  url.trim() && (
                                    <img
                                      key={index}
                                      src={url.trim()}
                                      alt={`Foto ${index}`}
                                      className="w-full h-24 object-cover rounded"
                                    />
                                  )
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Imagem do Card (Home)</Label>
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
                    {formData.urlImagemCard && !cardImageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground">
                          Imagem atual do card:
                        </p>
                        <img
                          src={formData.urlImagemCard}
                          alt="Card atual"
                          className="w-full h-32 object-contain rounded border"
                        />
                      </div>
                    )}
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diferenciaisLancamento">Diferenciais</Label>
                    <Textarea
                      id="diferenciaisLancamento"
                      value={formData.diferenciaisLancamento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          diferenciaisLancamento: e.target.value,
                        })
                      }
                      placeholder="Piscina, Academia, Salão de festas (separados por vírgula)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proximidadesDaLocalizacao">
                      Proximidades
                    </Label>
                    <Textarea
                      id="proximidadesDaLocalizacao"
                      value={formData.proximidadesDaLocalizacao}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          proximidadesDaLocalizacao: e.target.value,
                        })
                      }
                      placeholder="Shopping, Metro, Escola (separados por vírgula)"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="localizacaoMapsSource">URL do Mapa</Label>
                    <Input
                      id="localizacaoMapsSource"
                      value={formData.localizacaoMapsSource}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          localizacaoMapsSource: e.target.value,
                        })
                      }
                      placeholder="URL do Google Maps embed"
                    />
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Informações do Card
                    </h3>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input
                          id="valor"
                          value={formData.valor}
                          onChange={(e) =>
                            setFormData({ ...formData, valor: e.target.value })
                          }
                          placeholder="310000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quartosDisponiveis">
                          Quartos Disponíveis
                        </Label>
                        <Input
                          id="quartosDisponiveis"
                          value={formData.quartosDisponiveis}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quartosDisponiveis: e.target.value,
                            })
                          }
                          placeholder="1, 2, 3 (separados por vírgula)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="areasDisponiveis">
                          Áreas Disponíveis
                        </Label>
                        <Input
                          id="areasDisponiveis"
                          value={formData.areasDisponiveis}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              areasDisponiveis: e.target.value,
                            })
                          }
                          placeholder="43, 50, 65 (separados por vírgula)"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="statusObra">Status da Obra</Label>
                        <Select
                          value={formData.statusObra}
                          onValueChange={(value: any) =>
                            setFormData({ ...formData, statusObra: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lançamento">
                              Lançamento
                            </SelectItem>
                            <SelectItem value="Em obras">Em obras</SelectItem>
                            <SelectItem value="Pronto">Pronto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Campo de Finalidade (fixo) */}
                      <div className="space-y-2">
                        <Label>Finalidade</Label>
                        <div className="flex items-center gap-2 p-2 border rounded bg-gray-50 text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>Lançamento</span>
                          {!lancamentoFinalidadeId && (
                            <Badge variant="destructive" className="ml-2">
                              Configurar Finalidades
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Finalidade fixa para lançamentos
                        </p>
                      </div>
                      
                      {/* Campo de Tipologias (múltiplas) */}
                      <div className="space-y-2">
                        <Label>Tipologias *</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {tipologias.map((tipologia) => (
                            <div key={tipologia.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`tipologia-${tipologia.id}`}
                                checked={formData.tipologiaId.includes(tipologia.id)}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setFormData((prev) => {
                                    if (checked) {
                                      return {
                                        ...prev,
                                        tipologiaId: [...prev.tipologiaId, tipologia.id],
                                      };
                                    } else {
                                      return {
                                        ...prev,
                                        tipologiaId: prev.tipologiaId.filter(
                                          (id) => id !== tipologia.id
                                        ),
                                      };
                                    }
                                  });
                                }}
                                className="rounded"
                              />
                              <Label htmlFor={`tipologia-${tipologia.id}`} className="text-sm">
                                {tipologia.nome}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2 flex items-end">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isCardDestaque"
                            checked={formData.isCardDestaque}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                isCardDestaque: e.target.checked,
                              })
                            }
                            className="rounded"
                          />
                          <Label htmlFor="isCardDestaque">
                            Card em Destaque
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Lançamentos Cadastrados
            </CardTitle>
            <CardDescription>
              {lancamentos.length} lançamento(s) encontrado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingLancamentos ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
              </div>
            ) : lancamentos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum lançamento cadastrado
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Região</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Destaque</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lancamentos.map((lancamento) => (
                      <TableRow key={lancamento.id}>
                        <TableCell className="font-medium">
                          {lancamento.nomeLancamento}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {lancamento.regiaoId
                              ? regiaoMap.get(lancamento.regiaoId) || "-"
                              : "-"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              lancamento.cardLancamentoInfo?.statusObra ===
                              "Pronto"
                                ? "default"
                                : lancamento.cardLancamentoInfo?.statusObra ===
                                  "Em obras"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {lancamento.cardLancamentoInfo?.statusObra || "-"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {lancamento.cardLancamentoInfo?.valor
                            ? `R$ ${lancamento.cardLancamentoInfo.valor}`
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {lancamento.cardLancamentoInfo?.isCardDestaque
                            ? "Sim"
                            : "Não"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={getLandingPageUrl(lancamento)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openEditModal(lancamento)}
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
                                    Tem certeza que deseja excluir o lançamento
                                    "{lancamento.nomeLancamento}"? Esta ação não
                                    pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(lancamento.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    {loadingDelete ? "Excluindo..." : "Excluir"}
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
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de Edição */}
      <Dialog open={editModal.isOpen} onOpenChange={closeEditModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>
              Editar Lançamento: {editModal.lancamento?.nomeLancamento}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nomeLancamento">
                  Nome do Lançamento *
                </Label>
                <Input
                  id="edit-nomeLancamento"
                  value={formData.nomeLancamento}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nomeLancamento: e.target.value,
                    })
                  }
                  placeholder="Nome do lançamento"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slogan">Slogan</Label>
                <Input
                  id="edit-slogan"
                  value={formData.slogan}
                  onChange={(e) =>
                    setFormData({ ...formData, slogan: e.target.value })
                  }
                  placeholder="Slogan do lançamento"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagem de Fundo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setBackgroundImageFile(e.target.files?.[0] || null)
                }
                disabled={uploading}
              />
              {backgroundImageFile && (
                <ImagePreview file={backgroundImageFile} />
              )}
              {formData.urlFotoBackGround && !backgroundImageFile && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Imagem atual:
                  </p>
                  <img
                    src={formData.urlFotoBackGround}
                    alt="Background atual"
                    className="w-full h-32 object-contain rounded border"
                  />
                </div>
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
                {galleryFiles.length > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">
                      {galleryFiles.length} foto(s) selecionada(s)
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setGalleryFiles([])}
                      disabled={uploading}
                    >
                      Limpar Todas
                    </Button>
                  </div>
                )}

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
                          onClick={() => {
                            const newFiles = [...galleryFiles];
                            newFiles.splice(globalIndex, 1);
                            setGalleryFiles(newFiles);

                            // Ajustar a página se necessário
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

                {formData.urlsFotos && galleryFiles.length === 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Fotos atuais:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.urlsFotos
                        .split(",")
                        .map(
                          (url, index) =>
                            url.trim() && (
                              <img
                                key={index}
                                src={url.trim()}
                                alt={`Foto ${index}`}
                                className="w-full h-24 object-cover rounded"
                              />
                            )
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Imagem do Card (Home)</Label>
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
              {formData.urlImagemCard && !cardImageFile && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Imagem atual do card:
                  </p>
                  <img
                    src={formData.urlImagemCard}
                    alt="Card atual"
                    className="w-full h-32 object-contain rounded border"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-endereco">Endereço</Label>
                <Input
                  id="edit-endereco"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData({ ...formData, endereco: e.target.value })
                  }
                  placeholder="Endereço completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-regiaoId">Região</Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-diferenciaisLancamento">Diferenciais</Label>
              <Textarea
                id="edit-diferenciaisLancamento"
                value={formData.diferenciaisLancamento}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    diferenciaisLancamento: e.target.value,
                  })
                }
                placeholder="Piscina, Academia, Salão de festas (separados por vírgula)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-proximidadesDaLocalizacao">
                Proximidades
              </Label>
              <Textarea
                id="edit-proximidadesDaLocalizacao"
                value={formData.proximidadesDaLocalizacao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    proximidadesDaLocalizacao: e.target.value,
                  })
                }
                placeholder="Shopping, Metro, Escola (separados por vírgula)"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-localizacaoMapsSource">URL do Mapa</Label>
              <Input
                id="edit-localizacaoMapsSource"
                value={formData.localizacaoMapsSource}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    localizacaoMapsSource: e.target.value,
                  })
                }
                placeholder="URL do Google Maps embed"
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">
                Informações do Card
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-valor">Valor (R$)</Label>
                  <Input
                    id="edit-valor"
                    value={formData.valor}
                    onChange={(e) =>
                      setFormData({ ...formData, valor: e.target.value })
                    }
                    placeholder="310000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-quartosDisponiveis">
                    Quartos Disponíveis
                  </Label>
                  <Input
                    id="edit-quartosDisponiveis"
                    value={formData.quartosDisponiveis}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quartosDisponiveis: e.target.value,
                      })
                    }
                    placeholder="1, 2, 3 (separados por vírgula)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-areasDisponiveis">
                    Áreas Disponíveis
                  </Label>
                  <Input
                    id="edit-areasDisponiveis"
                    value={formData.areasDisponiveis}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        areasDisponiveis: e.target.value,
                      })
                    }
                    placeholder="43, 50, 65 (separados por vírgula)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-statusObra">Status da Obra</Label>
                  <Select
                    value={formData.statusObra}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, statusObra: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lançamento">
                        Lançamento
                      </SelectItem>
                      <SelectItem value="Em obras">Em obras</SelectItem>
                      <SelectItem value="Pronto">Pronto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Campo de Finalidade (fixo) */}
                <div className="space-y-2">
                  <Label>Finalidade</Label>
                  <div className="flex items-center gap-2 p-2 border rounded bg-gray-50 text-muted-foreground">
                    <Building2 className="w-4 h-4" />
                    <span>Lançamento</span>
                    {!lancamentoFinalidadeId && (
                      <Badge variant="destructive" className="ml-2">
                        Configurar Finalidades
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Finalidade fixa para lançamentos
                  </p>
                </div>
                
                {/* Campo de Tipologias (múltiplas) */}
                <div className="space-y-2">
                  <Label>Tipologias *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {tipologias.map((tipologia) => (
                      <div key={tipologia.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`edit-tipologia-${tipologia.id}`}
                          checked={formData.tipologiaId.includes(tipologia.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData((prev) => {
                              if (checked) {
                                return {
                                  ...prev,
                                  tipologiaId: [...prev.tipologiaId, tipologia.id],
                                };
                              } else {
                                return {
                                  ...prev,
                                  tipologiaId: prev.tipologiaId.filter(
                                    (id) => id !== tipologia.id
                                  ),
                                };
                              }
                            });
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={`edit-tipologia-${tipologia.id}`} className="text-sm">
                          {tipologia.nome}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="edit-isCardDestaque"
                      checked={formData.isCardDestaque}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isCardDestaque: e.target.checked,
                        })
                      }
                      className="rounded"
                    />
                    <Label htmlFor="edit-isCardDestaque">
                      Card em Destaque
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeEditModal}
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
    </AdminLayout>
  );
}