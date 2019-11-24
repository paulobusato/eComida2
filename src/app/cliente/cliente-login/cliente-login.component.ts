import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Login } from 'src/app/autenticacao/auth.service';

@Component({
  selector: 'app-cliente-login',
  templateUrl: './cliente-login.component.html',
  styleUrls: ['./cliente-login.component.scss']
})
export class ClienteLoginComponent implements OnInit {
  loginForm: FormGroup;
  error: {status: string, mensagem: string};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
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
        } else {
          this.error = response;
        }
      },
      error => console.log(error),
    );
  }
}
