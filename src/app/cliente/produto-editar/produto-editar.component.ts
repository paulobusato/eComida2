import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produto, Componente, ComponenteItem, PedidoItem } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { MatCheckboxChange } from '@angular/material';
import { Location } from '@angular/common';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit, OnDestroy {
  pedidoItem: PedidoItem;

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) { }

  ngOnInit() {
    if (this.clienteService.pedido && this.clienteService.pedido.pedidoItens) {
      this.pedidoItem = {
        produto: { ...this.clienteService.produtoAtivado },
        quantidade: 1,
        valor: this.clienteService.produtoAtivado.valor,
      };
    } else {
      this.pedidoItem = {
        produto: { ...this.clienteService.produtoAtivado },
        quantidade: 1,
        valor: this.clienteService.produtoAtivado.valor,
      };
    }
  }

  onAdd(): void {
    this.pedidoItem = {
      ...this.pedidoItem,
      quantidade: +this.pedidoItem.quantidade + 1,
    };
  }

  onRemove(): void {
    if (this.pedidoItem.quantidade > 1) {
      this.pedidoItem = {
        ...this.pedidoItem,
        quantidade: +this.pedidoItem.quantidade - 1,
      };
    }
  }

  onSubmit(): void {
    this.clienteService.pedido = {
      estabelecimento: cloneDeep(this.clienteService.estabelecimentoAtivo),
      cliente: cloneDeep(this.clienteService.clienteAtivo),
      data: new Date(),
      pedidoItens: [cloneDeep(this.pedidoItem)],
      valor: 100,
    };
    
    // if (!this.clienteService.pedido) {
    //   this.clienteService.pedido = {
    //     estabelecimento: cloneDeep(this.clienteService.estabelecimentoAtivo),
    //     cliente: cloneDeep(this.clienteService.clienteAtivo),
    //     data: new Date(),
    //     pedidoItens: [ { ...cloneDeep(this.pedidoItem) } ],
    //     valor: 1000,
    //   };
    // } else {
    //   const modoEdicao = !!this.clienteService.pedido.pedidoItens
    //     .filter(e => e.idPedidoItem === this.pedidoItem.idPedidoItem);

    //   if (modoEdicao) {
    //     this.clienteService.pedido = {
    //       ...this.clienteService.pedido,
    //       pedidoItens: [
    //         ...this.clienteService.pedido.pedidoItens
    //             .filter(e => e.idPedidoItem !== this.pedidoItem.idPedidoItem),
    //         { ...this.pedidoItem },
    //       ],
    //     };
    //   } else {
    //     this.clienteService.pedido = {
    //       ...this.clienteService.pedido,
    //       pedidoItens: [
    //         ...this.clienteService.pedido.pedidoItens,
    //         { ... this.pedidoItem },
    //       ],
    //     };
    //   }
    // }

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

  ngOnDestroy() {
    this.clienteService.estabelecimentoAtivo = null;
  }
}
