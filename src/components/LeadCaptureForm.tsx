
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Send } from 'lucide-react';

/**
 * Componente de Formulário de Captação de Leads
 * 
 * Este componente é responsável por capturar informações de leads interessados
 * nos lançamentos de apartamentos. É reutilizável em diferentes páginas.
 * 
 * Props:
 * - source: string que identifica a origem do lead (ex: "portal-principal", "vista-baia")
 * - redirectTo: URL para redirecionamento após envio bem-sucedido
 * - title: título personalizado do formulário (opcional)
 * - description: descrição personalizada do formulário (opcional)
 */

interface LeadCaptureFormProps {
  source: string;
  redirectTo?: string;
  title?: string;
  description?: string;
}

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  interesse?: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  source,
  redirectTo = '/obrigado',
  title = 'Tenho Interesse',
  description = 'Preencha seus dados e nossa equipe entrará em contato'
}) => {
  const navigate = useNavigate();
  
  // Estados do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    email: '',
    interesse: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  /**
   * Função para validar os campos do formulário
   * Retorna true se todos os campos obrigatórios estão preenchidos corretamente
   */
  const validarFormulario = (): boolean => {
    const novosErros: Partial<FormData> = {};

    // Validação do nome
    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      novosErros.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validação do telefone
    const telefoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.telefone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
    } else if (!telefoneRegex.test(formData.telefone) || formData.telefone.replace(/\D/g, '').length < 10) {
      novosErros.telefone = 'Telefone deve ter formato válido';
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      novosErros.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      novosErros.email = 'Email deve ter formato válido';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  /**
   * Função para formatar telefone automaticamente
   * Aplica máscara (XX) XXXXX-XXXX conforme o usuário digita
   */
  const formatarTelefone = (value: string): string => {
    const apenasNumeros = value.replace(/\D/g, '');
    
    if (apenasNumeros.length <= 10) {
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  /**
   * Manipulador de mudanças nos campos do formulário
   */
  const handleInputChange = (campo: keyof FormData, valor: string) => {
    let valorFormatado = valor;
    
    // Aplicar formatação específica para telefone
    if (campo === 'telefone') {
      valorFormatado = formatarTelefone(valor);
    }
    
    setFormData(prev => ({
      ...prev,
      [campo]: valorFormatado
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[campo]) {
      setErrors(prev => ({
        ...prev,
        [campo]: undefined
      }));
    }
  };

  /**
   * Função principal para envio do formulário
   * 
   * IMPORTANTE: CONFIGURAÇÃO DO BACKEND
   * 
   * Para conectar com seu backend, altere a URL abaixo para o endpoint correto:
   * - URL_DO_BACKEND: substitua por sua URL real (ex: https://seuservidor.com/api/leads)
   * - Adicione headers de autenticação se necessário
   * - Modifique o formato dos dados se seu backend esperar estrutura diferente
   */
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, corrija os campos destacados',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      // CONFIGURAÇÃO DO BACKEND - ALTERE AQUI
      const URL_DO_BACKEND = 'https://seuservidor.com/api/cadastrar-lead';
      
      // Dados que serão enviados para o backend
      const dadosParaEnvio = {
        nome: formData.nome.trim(),
        telefone: formData.telefone.replace(/\D/g, ''), // Remove formatação do telefone
        email: formData.email.trim().toLowerCase(),
        interesse: formData.interesse || '',
        source: source, // Identifica de onde veio o lead
        timestamp: new Date().toISOString(), // Timestamp do cadastro
        // Adicione outros campos conforme necessário para seu backend
      };

      console.log('Enviando dados para o backend:', dadosParaEnvio);

      // Requisição POST para o backend
      const response = await fetch(URL_DO_BACKEND, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // ADICIONE AQUI OUTROS HEADERS SE NECESSÁRIO:
          // 'Authorization': 'Bearer ' + token,
          // 'X-API-Key': 'sua-api-key',
        },
        body: JSON.stringify(dadosParaEnvio)
      });

      // Verificar se a resposta foi bem-sucedida
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const resultado = await response.json();
      console.log('Resposta do backend:', resultado);

      // Mostrar mensagem de sucesso
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Nossa equipe entrará em contato em breve.',
      });

      // Limpar o formulário
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        interesse: ''
      });

      // Redirecionar para página de agradecimento
      setTimeout(() => {
        navigate(redirectTo);
      }, 2000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      
      // TRATAMENTO DE ERRO - MODO DESENVOLVIMENTO
      // Em desenvolvimento, você pode querer simular o sucesso:
      if (process.env.NODE_ENV === 'development') {
        console.log('MODO DESENVOLVIMENTO: Simulando envio bem-sucedido');
        toast({
          title: 'Formulário enviado (modo desenvolvimento)',
          description: 'Em produção, isso seria enviado para o backend real.',
        });
        
        setTimeout(() => {
          navigate(redirectTo);
        }, 2000);
      }
      // Em produção, mostraria uma mensagem de erro:
      else {
        toast({
          title: 'Erro ao enviar formulário',
          description: 'Por favor, tente novamente mais tarde.',
          variant: 'destructive'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={enviarFormulario} className="space-y-4">
          {/* Campo de Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome">
              Nome completo
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Digite seu nome completo"
              className={errors.nome ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome}</p>
            )}
          </div>

          {/* Campo de Telefone */}
          <div className="space-y-2">
            <Label htmlFor="telefone">
              Telefone
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              className={errors.telefone ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.telefone && (
              <p className="text-sm text-red-500">{errors.telefone}</p>
            )}
          </div>

          {/* Campo de Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              E-mail
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="seuemail@exemplo.com"
              className={errors.email ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Campo de Interesse (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="interesse">
              Interesse específico (opcional)
            </Label>
            <Input
              id="interesse"
              value={formData.interesse}
              onChange={(e) => handleInputChange('interesse', e.target.value)}
              placeholder="Ex: Quero saber mais sobre apartamentos de 2 quartos"
              disabled={isLoading}
            />
          </div>

          {/* Botão de Envio */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Receber informações
              </>
            )}
          </Button>

          {/* Política de Privacidade */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Ao enviar este formulário, você concorda com nossa{' '}
            <a href="/politica-privacidade" className="underline hover:text-gray-800">
              Política de Privacidade
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;
