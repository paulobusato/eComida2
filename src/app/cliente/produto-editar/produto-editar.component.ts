import { Component, OnInit } from '@angular/core';
import { Produto } from '../cliente.type';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  produto: any = {
    imgUrl: 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg',
    titulo: 'Marmitex churrasco 500g, coca cola 1',
    descricao: 'Caixa p + 1 acompanhamento + 1 molho',
    valor: 39.10,
    componentes: [
      {
        descricao: 'Escolha sua carne',
        quantidade: 2,
        items: [
          'Lombo de porco',
          'Linguiça de churrasco',
          'Carne de Boi',
        ]
      },
      {
        descricao: 'Escolha sua carne',
        quantidade: 2,
        items: [
          'Lombo de porco',
          'Linguiça de churrasco',
          'Carne de Boi',
        ]
      },
    ],
  };
  quantidade = 1;

  constructor() { }

  ngOnInit() {}

  onAdd(): void {
    this.quantidade++;
  }

  onRemove(): void {
    this.quantidade--;
  }

}
