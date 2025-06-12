import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Send } from 'lucide-react';

/**
 * IMPORTAÇÕES PARA A NOVA CONFIGURAÇÃO DE API
 * 
 * Agora o formulário usa a configuração centralizada de API!
 */
import { leadsApi } from '@/utils/apiConfig';  // API específica para leads
import { useApi } from '@/hooks/useApi';       // Hook customizado

/**
 * Componente de Formulário de Captação de Leads
 * 
 * AGORA INTEGRADO COM A CONFIGURAÇÃO CENTRALIZADA DE API!
 * 
 * Este componente agora usa:
 * - leadsApi.create() para salvar leads
 * - useApi() hook para gerenciar estados
 * - Configuração automática de URL do apiConfig.ts
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
  
  const [errors, setErrors] = useState<Partial<FormData>>({});

  /**
   * USANDO O HOOK useApi PARA GERENCIAR A REQUISIÇÃO
   * 
   * O hook já gerencia:
   * - Estado de loading automaticamente
   * - Tratamento de erros com toast
   * - Mensagem de sucesso
   */
  const { loading: isLoading, execute: executeSaveLead } = useApi({
    showSuccessToast: true,
    successMessage: 'Lead cadastrada com sucesso! Nossa equipe entrará em contato.',
    showErrorToast: true,
    errorMessage: 'Erro ao cadastrar lead. Tente novamente.'
  });

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
   * NOVA FUNÇÃO DE ENVIO DO FORMULÁRIO
   * 
   * AGORA USANDO A CONFIGURAÇÃO CENTRALIZADA DE API!
   * 
   * ✅ Não precisa mais configurar URL manualmente
   * ✅ Usa leadsApi.create() automaticamente
   * ✅ Tratamento de erro automático via useApi
   * ✅ Loading state automático
   * ✅ Toast notifications automáticas
   * 
   * PARA CONFIGURAR SUA API:
   * 1. Vá no arquivo src/utils/apiConfig.ts
   * 2. Altere a baseUrl para sua URL do backend
   * 3. Se necessário, altere o path '/leads' na leadsApi
   * 
   * Exemplo de dados enviados para o backend:
   * {
   *   nome: "João Silva",
   *   telefone: "11999999999",
   *   email: "joao@email.com",
   *   interesse: "Apartamento 2 quartos",
   *   source: "portal-principal",
   *   timestamp: "2024-01-15T10:30:00.000Z"
   * }
   */
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário
    if (!validarFormulario()) {
      toast({
        title: 'Erro no formulário',
        description: 'Por favor, corrija os campos destacados',
        variant: 'destructive'
      });
      return;
    }

    try {
      /**
       * DADOS QUE SERÃO ENVIADOS PARA O BACKEND
       * 
       * Estrutura padrão de lead. Modifique conforme sua API:
       */
      const dadosParaEnvio = {
        nome: formData.nome.trim(),
        telefone: formData.telefone.replace(/\D/g, ''), // Remove formatação
        email: formData.email.trim().toLowerCase(),
        interesse: formData.interesse || '',
        source: source, // Identifica origem do lead
        timestamp: new Date().toISOString(), // Data de cadastro
        // Adicione outros campos conforme necessário:
        // status: 'novo',
        // canal: 'website',
        // etc...
      };

      console.log('📝 Enviando lead para o backend:', dadosParaEnvio);

      /**
       * EXECUTAR REQUISIÇÃO USANDO A API CENTRALIZADA
       * 
       * Esta linha faz:
       * 1. POST para {baseUrl}/leads com os dados
       * 2. Adiciona automaticamente headers de autenticação (se houver token)
       * 3. Mostra loading automático
       * 4. Trata erros com toast
       * 5. Mostra sucesso com toast
       */
      await executeSaveLead(() => leadsApi.create(dadosParaEnvio));

      // Limpar formulário após sucesso
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
      // Erro já tratado pelo useApi hook com toast
      console.error('❌ Erro ao salvar lead:', error);
      
      // Aqui você pode adicionar tratamento adicional se necessário
      // Por exemplo, analytics, log específico, etc.
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

          {/* Botão agora usa isLoading do hook useApi */}
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
