import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/cliente/cliente.type';
import { AdministrativoService } from '../administrativo.service';

@Component({
  selector: 'app-pedido-lista',
  templateUrl: './pedido-lista.component.html',
  styleUrls: ['./pedido-lista.component.scss']
})
export class PedidoListaComponent implements OnInit {
  colunaNomes: string[] = ['nomeCliente', 'logradouro', 'numero', 'bairro', 'cidade', 'status', 'acoes'];
  fonteDados: MatTableDataSource<Pedido>;
  pedidos$: Observable<Pedido[]>;

  @ViewChild(MatPaginator, {static: true}) paginador: MatPaginator;
  @ViewChild(MatSort, {static: true}) ordenacao: MatSort;

  constructor(
    private administrativoService: AdministrativoService,
  ) { }

  ngOnInit() {
    this.administrativoService.obterPedidos().subscribe(
      (pedidos: Pedido[]) => {
        this.fonteDados = new MatTableDataSource(pedidos);
        this.fonteDados.paginator = this.paginador;
        this.fonteDados.sort = this.ordenacao;
      },
      error => console.log(error),
    );
  }

  aplicarFiltro(valor: string) {
    this.fonteDados.filter = valor.trim().toLowerCase();

    if (this.fonteDados.paginator) {
      this.fonteDados.paginator.firstPage();
    }
  }

  onSelectionChange(idPedido: number, selectionChange: MatSelectChange): void {
    this.administrativoService
      .alterarStatusPedido(idPedido, selectionChange.value).subscribe();
  }

}
