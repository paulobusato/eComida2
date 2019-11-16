import { Component, OnInit } from '@angular/core';
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

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) { }

  ngOnInit() {
    this.produto = {...this.clienteService.produtoAtivado};
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
    const produtoEmEdicao = this.clienteService.pedido.produtos
      .find(e => e.idProduto === this.produto.idProduto);

    if (produtoEmEdicao) {
      produtoEmEdicao.componentes = [
        ...this.produto.componentes
      ];
    } else {
      this.clienteService.pedido = {
        produtos: [
          ...this.clienteService.pedido.produtos,
          {...this.produto},
        ],
      };
    }
    
    this.location.back();
  }

  onChangeCheckbox(checkboxChange: MatCheckboxChange, componente: Componente, componenteItem: ComponenteItem): void {
    if (checkboxChange.checked) {
      componente.selecionado = true;
      componenteItem.selecionado = true;
    } else {
      const componenteItensSelecionados = componente.componenteItems
        .filter(e => e.selecionado === true).length;

      if (componenteItensSelecionados === 1) {
        componente.selecionado = false;  
      }
      
      componenteItem.selecionado = false;
    }
  }
}
