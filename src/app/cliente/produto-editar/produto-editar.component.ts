import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produto, Componente, ComponenteItem } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { MatCheckboxChange } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  produto: Produto;
  quantidade = 1;
  novoProduto: Produto;

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) { }

  ngOnInit() {
    this.produto = this.clienteService.produtoAtivado;
    this.novoProduto = {
      ...this.produto,
      componentes: []
    };
  }

  onAdd(): void {
    this.quantidade++;
  }

  onRemove(): void {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }

  onSubmit(): void {
    this.clienteService.pedido = {
      produtos: [
        ...this.clienteService.pedido.produtos,
        this.novoProduto,
      ],
    };
    this.location.back();
  }

  onChangeCheckbox(checkboxChange: MatCheckboxChange, componente: Componente, componenteItem: ComponenteItem): void {
    if (checkboxChange.checked) {
      const componenteExiste = this.novoProduto.componentes
        .findIndex(e => e.idComponente === componente.idComponente) === -1 ? false : true;

      if (componenteExiste) {
        this.novoProduto.componentes
          .find(e => e.idComponente === componente.idComponente)
          .componenteItems
          .push(componenteItem);
      } else {
        this.novoProduto.componentes.push({
          ...componente,
          componenteItems: [componenteItem],
        });
      }
    } else {
      const componenteEncontrado = this.novoProduto.componentes
        .find(e => e.idComponente === componente.idComponente);

      componenteEncontrado.componenteItems = componenteEncontrado.componenteItems
        .filter(e => e.idComponenteItem !== componenteItem.idComponenteItem);

      if (componenteEncontrado.componenteItems.length === 0) {
        this.novoProduto.componentes = this.novoProduto.componentes
          .filter(e => e.idComponente !== componenteEncontrado.idComponente);
      }
    }
  }
}
