import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';

@NgModule({
  declarations: [
    ClienteComponent,
    ClienteLoginComponent,
    BottomNavigationComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
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
