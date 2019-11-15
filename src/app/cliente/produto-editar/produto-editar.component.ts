import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produto, Componente, ComponenteItem } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { MatCheckboxChange } from '@angular/material';

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
    this.quantidade--;
  }

  onSubmit(): void {
    this.clienteService.pedido = {
      produtos: [
        ...this.clienteService.pedido.produtos,
        this.novoProduto,
      ],
    };
    
    console.log(this.clienteService.pedido);
  }

  onChangeCheckbox(checkboxChange: MatCheckboxChange, _componente: Componente, _componenteItem: ComponenteItem): void {
    if (checkboxChange.checked) {
      const componenteExiste = this.novoProduto.componentes.findIndex(e => e.idComponente == _componente.idComponente) == -1 ? false : true;

      if (componenteExiste) {
        this.novoProduto.componentes
          .find(e => e.idComponente == _componente.idComponente)
          .componenteItems
          .push(_componenteItem);
      } else {
        this.novoProduto.componentes.push({
          ..._componente,
          componenteItems: [_componenteItem],
        });
      }
    } else {
      const componente = this.novoProduto.componentes
      .find(e => e.idComponente == _componente.idComponente);

      componente.componenteItems = componente.componenteItems
        .filter(e => e.idComponenteItem != _componenteItem.idComponenteItem);

      if (!componente.componenteItems.length) {
        this.novoProduto.componentes = this.novoProduto.componentes
          .filter(e => e.idComponente != _componente.idComponente);
      }
    }
  }
}
