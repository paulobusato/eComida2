export interface Produto {
  imgUrl?: string;
  titulo: string;
  descricao: string;
  valor: number;
  componentes?: Componente[];
}

export interface Categoria {
  descricao: string;
  imgUrl: string;
}

export interface Recomendacoes {
  nome: string;
  imgUrl: string;
}

export interface Estabelecimento {
  nome: string;
  distancia: number;
  bairro: string;
  tempoEspera: number;
  rating: number;
  imgUrl: string;
}

export interface Componente {
  descricao: string;
  quantidade: number;
  items: string[];
}
