import { Component, OnInit } from '@angular/core';
import { AdministrativoService } from '../administrativo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estabelecimento-cadastro',
  templateUrl: './estabelecimento-cadastro.component.html',
  styleUrls: ['./estabelecimento-cadastro.component.scss']
})
export class EstabelecimentoCadastroComponent implements OnInit {
  estabelecimentoForm: FormGroup;

  constructor(
    private administrativoService: AdministrativoService,
    private fb: FormBuilder,
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

    this.administrativoService.obterEstabelecimento().subscribe(
      next => {
        this.estabelecimentoForm.setValue({
          razaoSocial: next.razaoSocial,
          nomeFantasia: next.nomeFantasia,
          cnpj: next.cnpj,
          email: next.email,
          senha: '',
          telefone: next.telefone,
          cep: next.cep,
          logradouro: next.logradouro,
          numero: next.numero,
          bairro: next.bairro,
          cidade: next.cidade,
          uf: next.uf,
        });
      },
      error => console.log(error),
    );
  }

  onAtualizarCadastro(): void {
    this.administrativoService.atualizarCadastroEstabelecimento(this.estabelecimentoForm.value).subscribe();
  }
}
