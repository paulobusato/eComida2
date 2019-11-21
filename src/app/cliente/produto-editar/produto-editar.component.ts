import { Component, OnInit, OnDestroy } from '@angular/core';
import { Produto, Componente, ComponenteItem, PedidoItem, Pedido } from '../cliente.type';
import { ClienteService } from '../cliente.service';
import { MatCheckboxChange } from '@angular/material';
import { Location } from '@angular/common';
import * as cloneDeep from 'lodash.clonedeep';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit, OnDestroy {
  pedidoItem: PedidoItem;
  idxPedidoItem: string;

  constructor(
    private clienteService: ClienteService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idxPedidoItem = this.route.snapshot.queryParamMap.get('idxPedidoItem');

    if (this.idxPedidoItem) {
      const pedidoItem: PedidoItem = this.clienteService.pedido.pedidoItens
        .find((value: PedidoItem, idx: number) => idx === +this.idxPedidoItem);

      this.pedidoItem = cloneDeep(pedidoItem);
    } else {
      const produto: Produto = cloneDeep(this.clienteService.produtoAtivado);
      this.pedidoItem = {
        produto: { ...produto },
        quantidade: 1,
        valor: produto.valor,
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
    if (this.idxPedidoItem) {
      const pedido: Pedido = cloneDeep(this.clienteService.pedido);
      const pedidoItem: PedidoItem = cloneDeep(this.pedidoItem);

      this.clienteService.pedido = {
        ...pedido,
        pedidoItens: pedido.pedidoItens.map((value: PedidoItem, idx: number) => {
          return idx === +this.idxPedidoItem ? pedidoItem : value;
        }),
      };
    } else if (this.clienteService.pedido) {
      const pedido: Pedido = cloneDeep(this.clienteService.pedido);
      const pedidoItem: PedidoItem = cloneDeep(this.pedidoItem);

      this.clienteService.pedido = {
        ...pedido,
        pedidoItens: [
          ...pedido.pedidoItens,
          pedidoItem,
        ],
      };
    } else {
      this.clienteService.pedido = {
        estabelecimento: cloneDeep(this.clienteService.estabelecimentoAtivo),
        cliente: cloneDeep(this.clienteService.clienteAtivo),
        data: new Date(),
        pedidoItens: [cloneDeep(this.pedidoItem)],
        valor: 100,
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

  ngOnDestroy() {
    this.clienteService.estabelecimentoAtivo = null;
  }
}
