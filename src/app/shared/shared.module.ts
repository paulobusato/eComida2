import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [
    HeaderComponent,
  ]
})
export class SharedModule { }
