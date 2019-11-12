import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Produto } from '../cliente.type';
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
  }

  onClickProduto(produto: Produto): void {
    this.clienteService.produtoAtivado = produto;
    this.router.navigate(['/cliente/produto-editar']);
  }
}
