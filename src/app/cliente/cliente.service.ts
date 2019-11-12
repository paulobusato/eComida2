import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria, Estabelecimento } from './cliente.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient
  ) { }

  obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost/eComida2/dist/controle/categoriaaction.php');
  }

  obterEstabelecimentos(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>('http://localhost/eComida2/dist/controle/estabelecimentoaction.php');
  }

  login(): void {
  }
}
