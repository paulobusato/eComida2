import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto, Componente, Estabelecimento, ComponenteItem } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ProdutoEditarComponent } from '../produto-editar/produto-editar.component';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.scss']
})
export class ProdutoListaComponent implements OnInit {
  produtos$: Observable<Produto[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    const idEstabelecimento = +this.route.snapshot.paramMap.get('idEstabelecimento');

    this.produtos$ = this.clienteService.obterProdutos(idEstabelecimento);
    this.clienteService.obterCliente().subscribe(
      response => this.clienteService.clienteAtivo = response,
    );
    this.clienteService.obterEstabelecimentos(idEstabelecimento).subscribe(
      (estabelecimento: Estabelecimento) => this.clienteService.estabelecimentoAtivo = estabelecimento,
      error => console.log(error),
    );
  }

  onClickProduto(produto: Produto): void {
    const componentes: Componente[] = produto.componentes
      .map((componente: Componente) => {
        return {
          ...componente,
          componenteItems: componente.componenteItems
            .map((componenteItem: ComponenteItem) => {
              return {
                ...componenteItem,
                selecionado: false,
              };
            }),
            selecionado: false,
        };
      });

    this.clienteService.produtoAtivado = {
      ...produto,
      componentes
    };

    const dialogRef = this.dialog.open(ProdutoEditarComponent, {
      width: '500px',
      height: '500px',
    });
    // this.router.navigate(['/cliente/produto-editar']);
  }
}
