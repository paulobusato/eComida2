import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProdutoEditarDialogComponent } from './produto-editar-dialog/produto-editar-dialog.component';
import { Componente } from 'src/app/cliente/cliente.type';
import * as cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  componentes: Componente[] = [
    {
      descricao: 'Salada',
      quantidade: 1,
      obrigatorio: true,
    },
    {
      descricao: 'Carne',
      quantidade: 1,
      obrigatorio: false,
    },
  ];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProdutoEditarDialogComponent, {
      width: '500px',
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          if (this.componentes) {
            this.componentes = [
              ...cloneDeep(this.componentes),
              result
            ];
          } else {
            this.componentes = [result];
          }
        }
      },
    );
  }
}
