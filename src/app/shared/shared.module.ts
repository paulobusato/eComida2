import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimiteCaracteresPipe } from './limite-caracteres.pipe';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LimiteCaracteresPipe, FooterComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
  ],
  exports: [
    LimiteCaracteresPipe,
    FooterComponent,
  ]
})
export class SharedModule { }
