import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { AdministrativoComponent } from './administrativo.component';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { PedidoEditarComponent } from './pedido-editar/pedido-editar.component';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { EstabelecimentoHeaderComponent } from './estabelecimento-header/estabelecimento-header.component';
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatIconModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdutoEditarDialogComponent } from './produto-editar/produto-editar-dialog/produto-editar-dialog.component';


@NgModule({
  declarations: [
    AdministrativoComponent,
    PedidoListaComponent,
    PedidoEditarComponent,
    EstabelecimentoCadastroComponent,
    ProdutoListaComponent,
    ProdutoEditarComponent,
    EstabelecimentoHeaderComponent,
    ProdutoEditarDialogComponent,
  ],
  imports: [
    CommonModule,
    AdministrativoRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class AdministrativoModule { }
