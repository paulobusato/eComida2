import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.component.html',
  styleUrls: ['./cliente-cadastro.component.scss']
})
export class ClienteCadastroComponent implements OnInit {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {

    this.clienteForm = this.fb.group({
      nome: [''],
      cpf: [''],
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
    console.log(this.clienteForm.value);
    this.clienteService.addCliente(this.clienteForm.value).subscribe(
      (response) => console.log(response)
    );
  }

}
