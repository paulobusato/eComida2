import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss']
})
export class EstabelecimentoComponent implements OnInit {
  estabelecimentoForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.estabelecimentoForm = this.fb.group({
      razaoSocial: [''],
      nomeFantasia: [''],
      cnpj: [''],
      email: [''],
      senha: [''],
      telefone: [''],
      cep: [''],
      logradouro: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
    });
  }

  onSubmit(): void {
    console.dir(this.estabelecimentoForm.value);
  }

}
