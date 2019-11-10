import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';


const routes: Routes = [
  {path: 'cliente/login', component: ClienteLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
