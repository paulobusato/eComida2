import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-produto-editar-dialog',
  templateUrl: './produto-editar-dialog.component.html',
  styleUrls: ['./produto-editar-dialog.component.scss']
})
export class ProdutoEditarDialogComponent implements OnInit {
  componenteForm: FormGroup;
  componenteItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {componenteItem: boolean},
  ) { }

  ngOnInit() {
    this.componenteForm = this.fb.group({
      descricao: [''],
      quantidade: [''],
      obrigatorio: [''],
    });

    this.componenteItemForm = this.fb.group({
      descricao: [''],
      valor: [''],
    });
  }

}
