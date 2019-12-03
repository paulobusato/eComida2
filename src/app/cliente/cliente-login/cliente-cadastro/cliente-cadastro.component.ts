import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  clienteForm: FormGroup;
  formSubmitted = false;

  @ViewChild('formDirective', {static: true}) private formDirective: NgForm;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {

    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.clienteService.addCliente(this.clienteForm.value).subscribe(
      () => {
        this.formSubmitted = true;
        this.formDirective.resetForm();
      }
    );
  }

}
