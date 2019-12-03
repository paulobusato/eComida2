import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { ClienteComponent } from './cliente.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { SacolaComponent } from './sacola/sacola.component';
import { SearchComponent } from './search/search.component';
import { ProdutoAtivoGuard } from './guard/produto-ativo.guard';
import { ClienteCadastroComponent } from './cliente-login/cliente-cadastro/cliente-cadastro.component';
import { PedidoListaComponent } from './pedido-lista/pedido-lista.component';
import { AuthGuard } from '../autenticacao/auth.guard';


const routes: Routes = [
  {path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard]},
  {path: 'cliente/login', component: ClienteLoginComponent},
  {path: 'cliente/cadastro', component: ClienteCadastroComponent},
  {path: 'cliente/pedido-lista', component: PedidoListaComponent, canActivate: [AuthGuard]},
  {path: 'cliente/produto-lista/:idEstabelecimento', component: ProdutoListaComponent, canActivate: [AuthGuard]},
  {path: 'cliente/produto-editar', component: ProdutoEditarComponent, canActivate: [ProdutoAtivoGuard, AuthGuard]},
  {path: 'cliente/sacola', component: SacolaComponent, canActivate: [AuthGuard]},
  {path: 'cliente/search', component: SearchComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
