import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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

  @ViewChild(MatPaginator, {static: true}) paginador: MatPaginator;
  @ViewChild(MatSort, {static: true}) ordenacao: MatSort;

  constructor() {
    this.fonteDados = new MatTableDataSource(PEDIDOS);
  }

  ngOnInit() {
    this.fonteDados.paginator = this.paginador;
    this.fonteDados.sort = this.ordenacao;
  }

  aplicarFiltro(valor: string) {
    this.fonteDados.filter = valor.trim().toLowerCase();

    if (this.fonteDados.paginator) {
      this.fonteDados.paginator.firstPage();
    }
  }

}
