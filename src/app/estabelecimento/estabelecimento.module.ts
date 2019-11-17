import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstabelecimentoRoutingModule } from './estabelecimento-routing.module';
import { EstabelecimentoComponent } from './estabelecimento.component';
import { MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EstabelecimentoComponent,
  ],
  imports: [
    CommonModule,
    EstabelecimentoRoutingModule,
    FlexLayoutModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class EstabelecimentoModule { }
