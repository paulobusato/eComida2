import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { HeaderComponent } from './header/header.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';
import { ProdutoEditarComponent } from './produto-editar/produto-editar.component';
import { SacolaComponent } from './sacola/sacola.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteLoginComponent,
    BottomNavigationComponent,
    HeaderComponent,
    ProdutoListaComponent,
    ProdutoEditarComponent,
    SacolaComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
  ]
})
export class ClienteModule { }
