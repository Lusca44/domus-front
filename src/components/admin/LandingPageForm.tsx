
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { LandingPageData, LandingPageFormData } from '@/types/landingPage';

const landingPageSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  regiao: z.string().min(1, 'Região é obrigatória'),
  status: z.enum(['ativo', 'inativo', 'rascunho']),
  titulo: z.string().min(1, 'Título é obrigatório'),
  slogan: z.string().min(1, 'Slogan é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  entrega: z.string().min(1, 'Entrega é obrigatória'),
  caracteristicas: z.array(z.object({
    titulo: z.string(),
    valor: z.string(),
    icone: z.string(),
  })),
  diferenciais: z.array(z.string()),
  sobreEmpreendimento: z.object({
    titulo: z.string(),
    descricao: z.string(),
  }),
  localizacao: z.object({
    titulo: z.string(),
    descricao: z.string(),
    facilidades: z.array(z.string()),
    mapaSrc: z.string(),
  }),
  ctaFinal: z.object({
    titulo: z.string(),
    descricao: z.string(),
    condicoes: z.array(z.string()),
  }),
});

interface LandingPageFormProps {
  initialData?: LandingPageData;
  onSubmit: (data: LandingPageFormData) => Promise<void>;
  loading?: boolean;
  submitText?: string;
}

export function LandingPageForm({ initialData, onSubmit, loading = false, submitText = 'Salvar' }: LandingPageFormProps) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LandingPageFormData>({
    resolver: zodResolver(landingPageSchema),
    defaultValues: initialData || {
      nome: '',
      slug: '',
      regiao: '',
      status: 'rascunho',
      titulo: '',
      slogan: '',
      descricao: '',
      endereco: '',
      entrega: '',
      caracteristicas: [{ titulo: '', valor: '', icone: '' }],
      diferenciais: [''],
      sobreEmpreendimento: { titulo: '', descricao: '' },
      localizacao: { titulo: '', descricao: '', facilidades: [''], mapaSrc: '' },
      ctaFinal: { titulo: '', descricao: '', condicoes: [''] },
    },
  });

  const handleFormSubmit = async (data: LandingPageFormData) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Informações Básicas */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome da Landing Page</Label>
              <Input
                id="nome"
                {...register('nome')}
                placeholder="Ex: Porto Carioca"
              />
              {errors.nome && (
                <p className="text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="Ex: porto-carioca"
              />
              {errors.slug && (
                <p className="text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="regiao">Região</Label>
              <Input
                id="regiao"
                {...register('regiao')}
                placeholder="Ex: Porto Maravilha"
              />
              {errors.regiao && (
                <p className="text-sm text-red-600">{errors.regiao.message}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch('status')}
                onValueChange={(value: 'ativo' | 'inativo' | 'rascunho') => setValue('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo Principal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="titulo">Título Principal</Label>
            <Input
              id="titulo"
              {...register('titulo')}
              placeholder="Título que aparecerá no topo da página"
            />
            {errors.titulo && (
              <p className="text-sm text-red-600">{errors.titulo.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="slogan">Slogan</Label>
            <Input
              id="slogan"
              {...register('slogan')}
              placeholder="Slogan do empreendimento"
            />
            {errors.slogan && (
              <p className="text-sm text-red-600">{errors.slogan.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              {...register('descricao')}
              placeholder="Descrição detalhada do empreendimento"
              rows={4}
            />
            {errors.descricao && (
              <p className="text-sm text-red-600">{errors.descricao.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                {...register('endereco')}
                placeholder="Endereço completo"
              />
            </div>
            
            <div>
              <Label htmlFor="entrega">Previsão de Entrega</Label>
              <Input
                id="entrega"
                {...register('entrega')}
                placeholder="Ex: Dezembro 2025"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão de Submit */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : submitText}
        </Button>
      </div>
    </form>
  );
}
