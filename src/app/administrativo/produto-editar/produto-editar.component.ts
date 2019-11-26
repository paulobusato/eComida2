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
  componentes: Componente[] = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openDialogComponente(): void {
    const dialogRef = this.dialog.open(ProdutoEditarDialogComponent, {
      width: '500px',
      height: '350px',
      data: {componenteItem: false},
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

  openDialogComponenteItem(idxComponente: number): void {
    const dialogRef = this.dialog.open(ProdutoEditarDialogComponent, {
      width: '500px',
      height: '300px',
      data: {componenteItem: true},
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.componentes = this.componentes.map(
            (value: Componente, index) => {
              if (index === idxComponente) {
                if (value.componenteItems) {
                  return {
                    ...value,
                    componenteItems: [
                      ...value.componenteItems,
                      {
                        ...result,
                      },
                    ],
                  };
                } else {
                  return {
                    ...value,
                    componenteItems: [{...result}],
                  };
                }
              } else {
                return {
                  ...value,
                };
              }
            }
          );
        }
      }
    );
  }
}
