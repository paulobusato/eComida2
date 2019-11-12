import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { ClienteComponent } from './cliente.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { SacolaComponent } from './sacola/sacola.component';


const routes: Routes = [
  {path: 'cliente', component: ClienteComponent},
  {path: 'cliente/login', component: ClienteLoginComponent},
  {path: 'cliente/produto-lista', component: ProdutoListaComponent},
  {path: 'cliente/produto-editar', component: ProdutoEditarComponent},
  {path: 'cliente/sacola', component: SacolaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
