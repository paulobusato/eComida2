import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/cliente/cliente.type';
import { AdministrativoService } from '../administrativo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-editar',
  templateUrl: './pedido-editar.component.html',
  styleUrls: ['./pedido-editar.component.scss']
})
export class PedidoEditarComponent implements OnInit {
  pedido: Pedido;

  constructor(
    private administrativoService: AdministrativoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const idPedido = +this.route.snapshot.paramMap.get('idPedido');

    this.administrativoService.obterPedidos(idPedido).subscribe(
      response => console.log(response),
    );
  }

}
