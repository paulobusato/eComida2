import { Component, OnInit } from '@angular/core';
import { Pedido, Produto, PedidoItem } from '../cliente.type';
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

  onExcluirPedido(pedidoItem: PedidoItem): void {
    this.clienteService.pedido.pedidoItens = this.clienteService.pedido.pedidoItens
      .filter(e => e.idPedidoItem !== pedidoItem.idPedidoItem);
  }

  onEditarPedido(pedidoItem: PedidoItem): void {
    this.clienteService.produtoAtivado = pedidoItem.produto;
    this.router.navigate(['/cliente/produto-editar']);
  }

  onCancelar(): void {
    this.clienteService.pedido = null;
    this.location.back();
  }

  onSubmit(): void {
    this.clienteService.addPedido().subscribe(
      next => console.log(next),
      error => console.log(error),
    );
  }
}
