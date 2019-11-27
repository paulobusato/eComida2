import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProdutoEditarDialogComponent } from './produto-editar-dialog/produto-editar-dialog.component';
import { Componente, Produto } from 'src/app/cliente/cliente.type';
import * as cloneDeep from 'lodash.clonedeep';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdministrativoService } from '../administrativo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.scss']
})
export class ProdutoEditarComponent implements OnInit {
  componentes: Componente[] = [];
  produtoForm: FormGroup;
  idProduto: number;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private administrativoService: AdministrativoService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.idProduto = +this.route.snapshot.paramMap.get('idProduto');

    if (this.idProduto > 0) {
      this.administrativoService.obterProdutos(this.idProduto).subscribe(
        (produto: Produto) => {
          this.produtoForm = this.fb.group({
            titulo: [produto.titulo],
            descricao: [produto.descricao],
            valor: [produto.valor],
            imgUrl: [produto.imgUrl],
          });
          this.componentes = cloneDeep(produto.componentes);
        },
        error => console.log(error),
      );
    }

    this.produtoForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      valor: [''],
      imgUrl: [''],
    });

  }

  onSubmit(): void {
    if (this.idProduto > 0) {
      this.administrativoService.editarProduto(this.idProduto, this.produtoForm.value).subscribe(
        () => this.location.back(),
      );
    } else {
      this.administrativoService.addProduto({ produto: this.produtoForm.value, componentes: this.componentes}).subscribe(
        () => this.location.back(),
      );
    }
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
