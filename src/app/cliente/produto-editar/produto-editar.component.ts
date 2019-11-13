import { Component, OnInit } from '@angular/core';
import { Produto } from '../cliente.type';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  produto: Produto;
  quantidade = 1;

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.produto = this.clienteService.produtoAtivado;
    // this.clienteService.addPedido().subscribe(
    //   (next) => console.log(next)
    // );
  }

  onAdd(): void {
    this.quantidade++;
  }

  onRemove(): void {
    this.quantidade--;
  }

}
