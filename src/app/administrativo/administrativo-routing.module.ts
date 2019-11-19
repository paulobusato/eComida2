import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { PedidoEditarComponent } from './pedido-editar/pedido-editar.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';


const routes: Routes = [
  {path: 'administrativo', redirectTo: '/administrativo/pedido', pathMatch: 'full'},
  {path: 'administrativo/pedido/:idPedido', component: PedidoEditarComponent},
  {path: 'administrativo/pedido', component: PedidoListaComponent},
  {path: 'administrativo/produto/:idProduto', component: ProdutoEditarComponent},
  {path: 'administrativo/produto', component: ProdutoListaComponent},
  {path: 'administrativo/estabelecimento', component: EstabelecimentoCadastroComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
