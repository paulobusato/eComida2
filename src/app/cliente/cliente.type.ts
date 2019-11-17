export interface Recomendacoes {
  nome: string;
  imgUrl: string;
}

export interface Categoria {
  descricao: string;
  imagemUrl: string;
}

export interface Estabelecimento {
  idEstabelecimento: number;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: number;
  status: string;
  rating: number;
  imgUrl: string;
  email: string;
  senha: string;
  telefone: string;
  cep: number;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface ComponenteItem {
  idComponenteItem: number;
  descricao: string;
  valor: number;
  selecionado?: boolean;
}

export interface Componente {
  idComponente: number;
  descricao: string;
  quantidade: number;
  obrigatorio: boolean;
  componenteItems: ComponenteItem[];
  selecionado?: boolean;
}

export interface Pedido {
  produtos: Produto[];
}

export interface Produto {
  idProduto: number;
  estabelecimento: Estabelecimento;
  titulo: string;
  descricao: string;
  valor: number;
  quantidade: number;
  imgUrl?: string;
  componentes: Componente[];
}
