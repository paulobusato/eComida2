import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { HeaderComponent } from './header/header.component';
import { ProdutoListaComponent } from './produto-lista/produto-lista.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteLoginComponent,
    BottomNavigationComponent,
    HeaderComponent,
    ProdutoListaComponent,
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
  ]
})
export class ClienteModule { }
