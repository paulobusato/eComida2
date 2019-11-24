import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Login } from 'src/app/autenticacao/auth.service';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [''],
      senha: [''],
    });
  }

  onSubmit(): void {
    const login: Login = {
      ...this.loginForm.value,
      tipoUsuario: 'C',
    };
    this.authService.login(login).subscribe(
      response => {
        if (response.status === 'sucesso') {
          this.authService.definirUsuario(response);
          this.router.navigate(['/cliente']);
        }
      },
      error => console.log(error),
    );
  }
}
