import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estabelecimento } from './estabelecimento.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {
  url = 'http://localhost/eComida2/dist/controle/estabelecimentoaction.php';

  constructor(private http: HttpClient) { }

  obterEstabelecimentos(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>(this.url);
  }

  addEstabelecimento() {}
}
