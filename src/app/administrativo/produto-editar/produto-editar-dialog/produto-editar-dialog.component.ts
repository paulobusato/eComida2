import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Componente, ComponenteItem } from 'src/app/cliente/cliente.type';

@Component({
  selector: 'app-produto-editar-dialog',
  templateUrl: './produto-editar-dialog.component.html',
  styleUrls: ['./produto-editar-dialog.component.scss']
})
export class ProdutoEditarDialogComponent implements OnInit {
  componenteForm: FormGroup;
  componenteItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      idxComponente: number,
      componente?: Componente,
      idxComponenteItem?: number,
      componenteItem?: ComponenteItem
    },
  ) { }

  ngOnInit() {
    this.componenteForm = this.fb.group({
      descricao: [''],
      quantidade: [''],
      obrigatorio: [''],
    });

    this.componenteItemForm = this.fb.group({
      descricao: [''],
      valor: [''],
    });

    if (this.data.idxComponente !== undefined) {
      if (this.data.idxComponenteItem === undefined) {
        this.componenteForm.patchValue({
          descricao: this.data.componente.descricao,
          quantidade: this.data.componente.quantidade,
          obrigatorio: this.data.componente.obrigatorio,
        });
      } else {
        this.componenteItemForm.patchValue({
          descricao: this.data.componenteItem.descricao,
          valor: this.data.componenteItem.valor,
        });
      }
    }

  }

}
