import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstabelecimentoService } from './estabelecimento.service';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss']
})
export class EstabelecimentoComponent implements OnInit {
  estabelecimentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private estabelecimentoService: EstabelecimentoService
  ) { }

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
    this.estabelecimentoService.addEstabelecimento({ ...this.estabelecimentoForm.value , status: 'P' }).subscribe(
      () => console.log('Cadastrado com successo'),
      error => console.log(error)
    );
  }

}
