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
  nomeLancamento: string;
  redirectTo?: string;
  title?: string;
  description?: string;
}

interface FormData {
  nomeCliente: string;
  telefoneCliente: string;
  emailCliente: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  nomeLancamento,
  redirectTo = '/obrigado',
  title = 'Tenho Interesse',
  description = 'Preencha seus dados e nossa equipe entrará em contato'
}) => {
  const navigate = useNavigate();

  // Estados do formulário
  const [formData, setFormData] = useState<FormData>({
    nomeCliente: '',
    telefoneCliente: '',
    emailCliente: ''
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
    if (!formData.nomeCliente.trim()) {
      novosErros.nomeCliente = 'Nome é obrigatório';
    } else if (formData.nomeCliente.trim().length < 2) {
      novosErros.nomeCliente = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validação do telefone
    const telefoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.telefoneCliente.trim()) {
      novosErros.telefoneCliente = 'Telefone é obrigatório';
    } else if (!telefoneRegex.test(formData.telefoneCliente) || formData.telefoneCliente.replace(/\D/g, '').length < 10) {
      novosErros.telefoneCliente = 'Telefone deve ter formato válido';
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailCliente.trim()) {
      novosErros.emailCliente = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.emailCliente)) {
      novosErros.emailCliente = 'Email deve ter formato válido';
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
    if (campo === 'telefoneCliente') {
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
   *   nomeCliente: "João Silva",
   *   telefoneCliente: "11999999999",
   *   emailCliente: "joao@email.com",
   *   nomeLancamento: "portal-principal"
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
        nomeCliente: formData.nomeCliente.trim(),
        telefoneCliente: formData.telefoneCliente.replace(/\D/g, ''), // Remove formatação
        email: formData.emailCliente.trim().toLowerCase(),
        nomeLancamento: nomeLancamento, // Identifica origem do lead
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
        nomeCliente: '',
        telefoneCliente: '',
        emailCliente: ''
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
              value={formData.nomeCliente}
              onChange={(e) => handleInputChange('nomeCliente', e.target.value)}
              placeholder="Digite seu nome completo"
              className={errors.nomeCliente ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.nomeCliente && (
              <p className="text-sm text-red-500">{errors.nomeCliente}</p>
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
              value={formData.telefoneCliente}
              onChange={(e) => handleInputChange('telefoneCliente', e.target.value)}
              placeholder="(XX) XXXXX-XXXX"
              className={errors.telefoneCliente ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.telefoneCliente && (
              <p className="text-sm text-red-500">{errors.telefoneCliente}</p>
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
              value={formData.emailCliente}
              onChange={(e) => handleInputChange('emailCliente', e.target.value)}
              placeholder="seuemail@exemplo.com"
              className={errors.emailCliente ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.emailCliente && (
              <p className="text-sm text-red-500">{errors.emailCliente}</p>
            )}
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
