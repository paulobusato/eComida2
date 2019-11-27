import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { Produto } from 'src/app/cliente/cliente.type';
import { AdministrativoService } from '../administrativo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {
  colunaNomes: string[] = ['idProduto', 'titulo', 'descricao', 'valor', 'acoes'];
  fonteDados: MatTableDataSource<Produto>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) matTable: MatTable<Produto>;

  constructor(
    private administrativoService: AdministrativoService,
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  aplicarFiltro(valor: string): void {
    this.fonteDados.filter = valor.trim().toLowerCase();

    if (this.fonteDados.paginator) {
      this.fonteDados.paginator.firstPage();
    }
  }

  onExcluirProduto(idProduto: number): void {
    this.administrativoService.excluirProduto(idProduto).subscribe(
      () => this.fetchData(),
    );
  }

  private fetchData() {
    const administrativoSubs: Subscription = this.administrativoService.obterProdutos().subscribe(
      (produtos: Produto[]) => {
        this.fonteDados = new MatTableDataSource(produtos);
        this.fonteDados.paginator = this.paginator;
        this.fonteDados.sort = this.sort;
        administrativoSubs.unsubscribe();
      },
      error => console.log(error),
    );
  }
}
