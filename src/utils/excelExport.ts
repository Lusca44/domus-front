
interface Lead {
  id: string;
  nomeLancamento: string;
  nomeCliente: string;
  telefoneCliente: string;
  usuarioOpcionista: string;
}

export const exportLeadsToExcel = (leads: Lead[]) => {
  // Criar o cabeçalho CSV sem ID e Corretor Opcionista
  const headers = ['Interesse', 'Nome', 'Telefone'];
  
  // Converter dados para CSV sem ID e Corretor Opcionista
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      `"${lead.nomeLancamento}"`,
      `"${lead.nomeCliente}"`,
      `"${lead.telefoneCliente}"`
    ].join(','))
  ].join('\n');

  // Criar e baixar o arquivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
