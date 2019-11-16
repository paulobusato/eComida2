import { Component, OnInit } from '@angular/core';
import { Pedido } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sacola',
  templateUrl: './sacola.component.html',
  styleUrls: ['./sacola.component.scss']
})
export class SacolaComponent implements OnInit {
  pedido: Pedido;

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) { }

  ngOnInit() {
    this.pedido = this.clienteService.pedido;
    console.log(this.pedido.produtos[0]);
  }

  onCancelar(): void {
    this.clienteService.pedido = {produtos: []};
    this.location.back();
  }

}
