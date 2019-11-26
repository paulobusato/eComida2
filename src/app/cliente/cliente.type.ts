export interface Recomendacoes {
  nome: string;
  imgUrl: string;
}

export interface Categoria {
  descricao: string;
  imagemUrl: string;
}

export interface Estabelecimento {
  idEstabelecimento?: number;
  produtos: Produto[];
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
  idComponenteItem?: number;
  descricao: string;
  valor: number;
  selecionado?: boolean;
}

export interface Componente {
  idComponente?: number;
  descricao: string;
  quantidade: number;
  obrigatorio: boolean;
  componenteItems?: ComponenteItem[];
  selecionado?: boolean;
}

export interface Pedido {
  idPedido?: number;
  estabelecimento: Estabelecimento;
  cliente: Cliente;
  data: Date;
  pedidoItens: PedidoItem[];
  valor: number;
  status?: string;
}

export interface PedidoItem {
  idPedidoItem?: number;
  produto: Produto;
  quantidade: number;
  valor: number;
}

export interface Cliente {
  idCliente?: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface Produto {
  idProduto?: number;
  estabelecimento: Estabelecimento;
  titulo: string;
  descricao: string;
  valor: number;
  imgUrl?: string;
  componentes: Componente[];
}
