import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginResposta {
  token: string;
  tipoUsuario: string;
  idEstabelecimento?: string;
  idCliente?: string;
}

export interface Login {
  tipoUsuario: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost/eComida2/dist/controle/loginaction.php';

  constructor(
    private http: HttpClient,
  ) { }

  httpOpcoes = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  login(login: Login): Observable<LoginResposta> {
    return this.http.post<LoginResposta>(this.url, login, this.httpOpcoes);
  }

  definirUsuario(loginResposta: LoginResposta): void {
    localStorage.setItem('token', loginResposta.token);
  }

  isLogado(): boolean {
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.clear();
  }
}


