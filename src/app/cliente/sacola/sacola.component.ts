import { Component, OnInit } from '@angular/core';
import { Pedido, Produto } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.scss']
})
export class SacolaComponent implements OnInit {
  pedido: Pedido;

  constructor(
    private clienteService: ClienteService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pedido = this.clienteService.pedido;
  }

  onExcluirPedido(produto: Produto): void {
    this.clienteService.pedido.produtos = this.clienteService.pedido.produtos
      .filter(e => e.idProduto !== produto.idProduto);
  }

  onEditarPedido(produto: Produto): void {
    this.clienteService.produtoAtivado = produto;
    this.router.navigate(['/cliente/produto-editar']);
  }

  onCancelar(): void {
    this.clienteService.pedido = {produtos: []};
    this.location.back();
  }

}
