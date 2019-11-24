import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto, Componente, Estabelecimento } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';

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
    const componenteItens: Componente[] = [...produto.componentes]
      .map(e => {
        return {
          ...e,
          componenteItems: e.componenteItems
            .map(e => { return { ...e, selecionado: false } }),
          selecionado: false,
        };
      });
    
    this.clienteService.produtoAtivado = {
      ...produto,
      componentes: componenteItens
    };
    this.router.navigate(['/cliente/produto-editar']);
  }
}
