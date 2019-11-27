import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Produto } from 'src/app/cliente/cliente.type';
import { AdministrativoService } from '../administrativo.service';

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

  constructor(
    private administrativoService: AdministrativoService,
  ) { }

  ngOnInit() {
    this.administrativoService.obterProdutos().subscribe(
      (produtos: Produto[]) => {
        this.fonteDados = new MatTableDataSource(produtos);
        this.fonteDados.paginator = this.paginator;
        this.fonteDados.sort = this.sort;
      },
      error => console.log(error),
    );
  }

  aplicarFiltro(valor: string): void {
    this.fonteDados.filter = valor.trim().toLowerCase();

    if (this.fonteDados.paginator) {
      this.fonteDados.paginator.firstPage();
    }
  }

}
