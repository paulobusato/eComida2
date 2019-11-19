import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/cliente/cliente.type';
import { AdministrativoService } from '../administrativo.service';

interface PedidoLista {
  nomeCliente: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  status: string;
}

const PEDIDOS: PedidoLista[] = [
  {
    nomeCliente: 'Paulo',
    logradouro: 'Av Francisco',
    numero: 3,
    bairro: 'Boa',
    cidade: 'Cachoeiro',
    status: 'Pendente'
  },
  {
    nomeCliente: 'Henrique',
    logradouro: 'Av Mardegan',
    numero: 51,
    bairro: 'Vista',
    cidade: 'Itapemirim',
    status: 'Produzindo'
  },
];

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit {
  colunaNomes: string[] = ['nomeCliente', 'logradouro', 'numero', 'bairro', 'cidade', 'status'];
  fonteDados: MatTableDataSource<PedidoLista>;
  pedidos$: Observable<Pedido[]>;

  @ViewChild(MatPaginator, {static: true}) paginador: MatPaginator;
  @ViewChild(MatSort, {static: true}) ordenacao: MatSort;

  constructor(
    private administrativoService: AdministrativoService,
  ) {
    this.fonteDados = new MatTableDataSource(PEDIDOS);
  }

  ngOnInit() {
    this.fonteDados.paginator = this.paginador;
    this.fonteDados.sort = this.ordenacao;

    this.administrativoService.obterPedidos(1).subscribe(
      next => console.log(next),
      error => console.log(error)
    );
  }

  aplicarFiltro(valor: string) {
    this.fonteDados.filter = valor.trim().toLowerCase();

    if (this.fonteDados.paginator) {
      this.fonteDados.paginator.firstPage();
    }
  }

}
