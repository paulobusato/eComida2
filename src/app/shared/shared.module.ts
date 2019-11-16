import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimiteCaracteresPipe } from './limite-caracteres.pipe';

@NgModule({
  declarations: [LimiteCaracteresPipe],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class SharedModule { }
