export interface Estabelecimento {
  idEstabelecimento: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: number;
  status: string;
  email: string;
  senha?: string;
  telefone: number;
  cep: number;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
}
