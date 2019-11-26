import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-produto-editar-dialog',
  templateUrl: './produto-editar-dialog.component.html',
  styleUrls: ['./produto-editar-dialog.component.scss']
})
export class ProdutoEditarDialogComponent implements OnInit {
  componenteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.componenteForm = this.fb.group({
      descricao: [''],
      quantidade: [''],
      obrigatorio: [''],
    });
  }

}
