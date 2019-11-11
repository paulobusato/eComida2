import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstabelecimentoService } from './estabelecimento.service';
import { Estabelecimento } from './estabelecimento.type';

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
    // console.dir(this.estabelecimentoForm.value);
    this.estabelecimentoService.obterEstabelecimentos().subscribe
    ((estabelecimentos: Estabelecimento[]) => console.dir(estabelecimentos));
  }

}
