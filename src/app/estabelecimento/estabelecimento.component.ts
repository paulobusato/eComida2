import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { EstabelecimentoService } from './estabelecimento.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, Login } from '../autenticacao/auth.service';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss']
})
export class EstabelecimentoComponent implements OnInit {
  estabelecimentoForm: FormGroup;
  estabelecimentoLoginForm: FormGroup;
  formSubmitted = false;

  @ViewChild('formDirective', {static: true}) private formDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private estabelecimentoService: EstabelecimentoService,
    private location: Location,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.estabelecimentoForm = this.fb.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
      imgUrl: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });

    this.estabelecimentoLoginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    this.estabelecimentoService.addEstabelecimento({ ...this.estabelecimentoForm.value , status: 'P' }).subscribe(
      () => {
        this.formSubmitted = true;
        this.formDirective.resetForm();
      },
      error => console.log(error)
    );
  }

  onLogin(): void {
    const login: Login = {
      ...this.estabelecimentoLoginForm.value,
      tipoUsuario: 'E',
    };

    this.authService.login(login).subscribe(
      response => {
        if (response.status === 'sucesso') {
          this.authService.definirUsuario(response);
          this.router.navigate(['/administrativo']);
        }
      },
      error => console.log(error),
    );

  }

}
