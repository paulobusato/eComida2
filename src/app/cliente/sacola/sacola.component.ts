import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pedido, Produto, PedidoItem } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.scss']
})
export class SacolaComponent implements OnInit, OnDestroy {
  pedido: Pedido;

  constructor(
    private clienteService: ClienteService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pedido = cloneDeep(this.clienteService.pedido);
  }

  onExcluirPedidoItem(index: number): void {
    this.pedido = {
      ...cloneDeep(this.pedido),
      pedidoItens: cloneDeep(this.pedido).pedidoItens
      .filter((pedidoItem: PedidoItem, idx: number) => idx !== index),
    };
  }

  onEditarPedidoItem(index: number): void {
    this.router.navigate(['/cliente/produto-editar'], {queryParams: {idxPedidoItem: index}});
  }

  onCancelar(): void {
    this.clienteService.pedido = null;
    this.location.back();
  }

  onSubmit(): void {
    this.clienteService.addPedido().subscribe(
      () => {
        this.pedido = null;
      },
      error => console.log(error),
    );
  }

  ngOnDestroy() {
    this.clienteService.pedido = cloneDeep(this.pedido);
  }
}
