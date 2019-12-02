import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/cliente/cliente.type';

@Component({
  selector: 'app-pedido-detalhe',
  templateUrl: './pedido-detalhe.component.html',
  styleUrls: ['./pedido-detalhe.component.scss']
})
export class PedidoDetalheComponent implements OnInit {
  @Input() pedido: Pedido;

  constructor() { }

  ngOnInit() {
    console.log(this.pedido);
  }

}
