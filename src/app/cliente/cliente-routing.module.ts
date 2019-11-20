import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { ClienteComponent } from './cliente.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { SacolaComponent } from './sacola/sacola.component';
import { SearchComponent } from './search/search.component';
import { ProdutoAtivoGuard } from './guard/produto-ativo.guard';


const routes: Routes = [
  {path: 'cliente', component: ClienteComponent},
  {path: 'cliente/login', component: ClienteLoginComponent},
  {path: 'cliente/produto-lista/:idEstabelecimento', component: ProdutoListaComponent},
  {path: 'cliente/produto-editar', component: ProdutoEditarComponent, canActivate: [ProdutoAtivoGuard]},
  {path: 'cliente/sacola', component: SacolaComponent},
  {path: 'cliente/search', component: SearchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
