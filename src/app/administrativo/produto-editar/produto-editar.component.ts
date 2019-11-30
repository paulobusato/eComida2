import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProdutoEditarDialogComponent } from './produto-editar-dialog/produto-editar-dialog.component';
import { Componente, Produto, ComponenteItem } from 'src/app/cliente/cliente.type';
import * as cloneDeep from 'lodash.clonedeep';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdministrativoService } from '../administrativo.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProdutoRemoverDialogComponent } from './produto-remover-dialog/produto-remover-dialog.component';

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
      this.administrativoService.editarProduto(this.idProduto, { produto: this.produtoForm.value, componentes: this.componentes}).subscribe(
        (response) => console.log(response),
        // () => this.location.back(),
      );
    } else {
      this.administrativoService.addProduto({ produto: this.produtoForm.value, componentes: this.componentes}).subscribe(
        () => this.location.back(),
      );
    }
  }

  openDialogComponente(idxComponente?: number): void {
    const dialogRef = this.dialog.open(ProdutoEditarDialogComponent, {
      width: '500px',
      height: '350px',
      data: idxComponente !== undefined
        ? {
        novo: false,
        entidade: 'Componente',
        idxComponente,
        componente: this.componentes
          .find((e, i) => i === idxComponente),
        }
        : {
          novo: true,
          entidade: 'Componente',
        },
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          if (this.componentes.length > 0) {
            if (response.idxComponente !== undefined) {
              this.componentes = this.componentes.map((e, i) => {
                if (i === response.idxComponente) {
                  return {
                    ...e,
                    descricao: response.componente.descricao,
                    quantidade: response.componente.quantidade,
                    obrigatorio: response.componente.obrigatorio,
                  };
                } else {
                  return {
                    ...e
                  };
                }
              });
            } else {
              this.componentes = [
                ...cloneDeep(this.componentes),
                {
                  ...response.componente,
                  componenteItems: [],
                },
              ];
            }
          } else {
            this.componentes = [
              {
                ...response.componente,
                componenteItems: [],
              },
            ];
          }
        }
      },
    );
  }

  openDialogComponenteItem(idxComponente: number, idxComponenteItem?: number): void {
    const data = idxComponente !== undefined && idxComponenteItem !== undefined
      ? {
        novo: false,
        entidade: 'ComponenteItem',
        idxComponente,
        idxComponenteItem,
        componenteItem: this.componentes.find((e, i) => i === idxComponente)
          .componenteItems.find((e, i) => i === idxComponenteItem),
      }
      : {
        novo: true,
        entidade: 'ComponenteItem',
        idxComponente,
        idxComponenteItem: undefined
      };

    const dialogRef = this.dialog.open(ProdutoEditarDialogComponent, {
      width: '500px',
      height: '300px',
      data,
    });

    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          this.componentes = this.componentes.map(
            (value: Componente, index) => {
              if (index === idxComponente) {
                if (value.componenteItems.length > 0) {
                  if (response.idxComponenteItem !== undefined) {
                    return {
                      ...value,
                      componenteItems: value.componenteItems.map(
                        (componenteItem: ComponenteItem, iComponenteItem: number) => {
                          if (iComponenteItem === response.idxComponenteItem) {
                            return {
                              idComponenteItem: componenteItem.idComponenteItem,
                              ...response.componenteItem,
                            };
                          } else {
                            return {
                              ...componenteItem,
                            };
                          }
                        }
                      ),
                    };
                  } else {
                    return {
                      ...value,
                      componenteItems: [
                        ...value.componenteItems,
                        {
                          ...response.componenteItem,
                        },
                      ],
                    };
                  }
                } else {
                  return {
                    ...value,
                    componenteItems: [{ ...response.componenteItem }],
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

  openDialogRemover(idxComponente: number, idxComponenteItem?: number): void {
    const dialogRef = this.dialog.open(ProdutoRemoverDialogComponent, {
      width: '400px',
      height: '150px'
    });

    dialogRef.afterClosed().subscribe(
      (acao: string) => {
        if (acao === 'Confirmar') {
          this.componentes = this.componentes
            .filter((e, i) => i !== idxComponente);
        }
      }
    );

  }
}
