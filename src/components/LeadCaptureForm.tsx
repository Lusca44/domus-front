
import React, { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Send } from 'lucide-react';
import { leadsApi } from '@/utils/apiConfig';
import { useApi } from '@/hooks/useApi';

interface LeadCaptureFormProps {
  nomeLancamento: string;
  redirectTo?: string;
  title?: string;
  description?: string;
}

interface FormData {
  nomeCliente: string;
  emailCliente: string;
  telefoneCliente: string;
}

const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  nomeLancamento,
  redirectTo = '/obrigado',
  title = 'Tenho Interesse',
  description = 'Preencha seus dados e nossa equipe entrará em contato'
}) => {
  const navigate = useNavigate();
  const uniqueId = useId();

  const [formData, setFormData] = useState<FormData>({
    nomeCliente: '',
    emailCliente: '',
    telefoneCliente: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const { loading: isLoading, execute: executeSaveLead } = useApi({
    showSuccessToast: true,
    successMessage: 'Lead cadastrada com sucesso! Nossa equipe entrará em contato.',
    showErrorToast: true,
    errorMessage: 'Erro ao cadastrar lead. Tente novamente.'
  });

  const validarFormulario = (): boolean => {
    const novosErros: Partial<FormData> = {};

    // Validação do nome
    if (!formData.nomeCliente.trim()) {
      novosErros.nomeCliente = 'Nome é obrigatório';
    } else if (formData.nomeCliente.trim().length < 2) {
      novosErros.nomeCliente = 'Nome deve ter pelo menos 2 caracteres';
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailCliente.trim()) {
      novosErros.emailCliente = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.emailCliente)) {
      novosErros.emailCliente = 'Email deve ter formato válido';
    }

    // Validação do telefone
    const telefoneRegex = /^[\d\s\-\(\)]+$/;
    if (!formData.telefoneCliente.trim()) {
      novosErros.telefoneCliente = 'Telefone é obrigatório';
    } else if (!telefoneRegex.test(formData.telefoneCliente) || formData.telefoneCliente.replace(/\D/g, '').length < 10) {
      novosErros.telefoneCliente = 'Telefone deve ter formato válido';
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const formatarTelefone = (value: string): string => {
    const apenasNumeros = value.replace(/\D/g, '');

    if (apenasNumeros.length <= 10) {
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
  };

  const handleInputChange = (campo: keyof FormData, valor: string) => {
    let valorFormatado = valor;

    if (campo === 'telefoneCliente') {
      valorFormatado = formatarTelefone(valor);
    }

    setFormData(prev => ({
      ...prev,
      [campo]: valorFormatado
    }));

    if (errors[campo]) {
      setErrors(prev => ({
        ...prev,
        [campo]: undefined
      }));
    }
  };

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

    try {
      const dadosParaEnvio = {
        nomeCliente: formData.nomeCliente.trim(),
        emailCliente: formData.emailCliente.trim(),
        telefoneCliente: formData.telefoneCliente.replace(/\D/g, ''),
        nomeLancamento: nomeLancamento,
      };

      console.log('📝 Enviando lead para o backend:', dadosParaEnvio);

      await executeSaveLead(() => leadsApi.create(dadosParaEnvio));
      
      setTimeout(() => {
        const dadosAgradecimento = {
          nomeCliente: dadosParaEnvio.nomeCliente.trim(),
          nomeLancamento: dadosParaEnvio.nomeLancamento,
        };

        navigate(
          `${redirectTo}?${new URLSearchParams(dadosAgradecimento).toString()}`
        );
      }, 2000);
      
    } catch (error) {
      console.error('❌ Erro ao salvar lead:', error);
    }
    finally{
      setFormData({
        nomeCliente: "",
        emailCliente: "",
        telefoneCliente: "",
      });
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
            <Label htmlFor={`${uniqueId}-nome`}>
              Nome completo
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id={`${uniqueId}-nome`}
              value={formData.nomeCliente}
              onChange={(e) => handleInputChange("nomeCliente", e.target.value)}
              placeholder="Digite seu nome completo"
              className={errors.nomeCliente ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.nomeCliente && (
              <p className="text-sm text-red-500">{errors.nomeCliente}</p>
            )}
          </div>

          {/* Campo de Email */}
          <div className="space-y-2">
            <Label htmlFor={`${uniqueId}-email`}>
              Email
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id={`${uniqueId}-email`}
              type="email"
              value={formData.emailCliente}
              onChange={(e) => handleInputChange("emailCliente", e.target.value)}
              placeholder="seu.email@exemplo.com"
              className={errors.emailCliente ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.emailCliente && (
              <p className="text-sm text-red-500">{errors.emailCliente}</p>
            )}
          </div>

          {/* Campo de Telefone */}
          <div className="space-y-2">
            <Label htmlFor={`${uniqueId}-telefone`}>
              Telefone
              <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id={`${uniqueId}-telefone`}
              value={formData.telefoneCliente}
              onChange={(e) =>
                handleInputChange("telefoneCliente", e.target.value)
              }
              placeholder="(XX) XXXXX-XXXX"
              className={errors.telefoneCliente ? "border-red-500" : ""}
              disabled={isLoading}
            />
            {errors.telefoneCliente && (
              <p className="text-sm text-red-500">{errors.telefoneCliente}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
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

          <p className="text-xs text-gray-500 text-center mt-4">
            Ao enviar este formulário, você estará concordando com em ser
            contactado via ligação, whastapp ou email.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default LeadCaptureForm;
