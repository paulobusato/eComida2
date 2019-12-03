import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { PedidoEditarComponent } from './pedido-editar/pedido-editar.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { EstabelecimentoCadastroComponent } from './estabelecimento-cadastro/estabelecimento-cadastro.component';
import { AuthGuard } from '../autenticacao/auth.guard';


const routes: Routes = [
  {path: 'administrativo', redirectTo: '/administrativo/pedido', pathMatch: 'full', canActivate: [AuthGuard]},
  {path: 'administrativo/pedido/:idPedido', component: PedidoEditarComponent, canActivate: [AuthGuard]},
  {path: 'administrativo/pedido', component: PedidoListaComponent, canActivate: [AuthGuard]},
  {path: 'administrativo/produto/:idProduto', component: ProdutoEditarComponent, canActivate: [AuthGuard]},
  {path: 'administrativo/produto', component: ProdutoListaComponent, canActivate: [AuthGuard]},
  {path: 'administrativo/estabelecimento', component: EstabelecimentoCadastroComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
