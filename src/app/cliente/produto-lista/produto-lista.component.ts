import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto, Componente } from '../cliente.type';
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
    this.clienteService.obterEstabelecimentos(idEstabelecimento).subscribe(
      next => this.clienteService.estabelecimentoAtivo = next[0],
      error => console.log(error),
    );
    this.clienteService.clienteAtivo = {
      nome: 'Paulo Henrique',
      cpf: '321512312321',
      email: 'paulo@paulo.com',
      senha: '123',
      telefone: '31242341',
      cep: '32141213',
      logradouro: 'Logradouro Paulo',
      numero: 2,
      bairro: 'Bairro Cidade',
      cidade: 'Cidade Paulo',
      uf: 'MG',
    };
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
