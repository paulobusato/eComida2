import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { ClienteComponent } from './cliente.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';


const routes: Routes = [
  {path: 'cliente', component: ClienteComponent},
  {path: 'cliente/login', component: ClienteLoginComponent},
  {path: 'cliente/produto-lista', component: ProdutoListaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
