import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Pedido } from '../cliente.type';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit {
  pedidos: Pedido[];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.clienteService.obterPedidos().subscribe(
      (pedidos: Pedido[]) => {
        this.pedidos = pedidos;
      },
    );
  }

}
