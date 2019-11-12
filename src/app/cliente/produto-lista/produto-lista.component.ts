import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../cliente.type';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {
  produtos: any = [
    {
      imgUrl: 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg',
      titulo: 'Combo p - indicamos para 1 a 2 pessoas',
      descricao: 'Caixa p + 1 acompanhamento + 1 molho',
      valor: 27.99,
    },
    {
      imgUrl: 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg',
      titulo: 'Combo p - indicamos para 1 a 2 pessoas',
      descricao: 'Caixa p + 1 acompanhamento + 1 molho',
      valor: 27.99,
    },
    {
      imgUrl: 'https://static-images.ifood.com.br/image/upload/f_auto,t_high/pratos/af7f7d95-85ad-4e08-a2bb-edbb3555fab1/201806062016_40603626.jpg',
      titulo: 'Combo p - indicamos para 1 a 2 pessoas',
      descricao: 'Caixa p + 1 acompanhamento + 1 molho',
      valor: 27.99,
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClickProduto(): void {
    this.router.navigate(['/cliente/produto-editar']);
  }
}
