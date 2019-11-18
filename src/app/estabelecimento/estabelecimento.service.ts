import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estabelecimento } from './estabelecimento.type';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {
  url = 'http://localhost/eComida2/dist/controle/estabelecimentoaction.php';

  constructor(private http: HttpClient) { }

  obterEstabelecimentos(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>(this.url);
  }

  addEstabelecimento(estabelecimento: Estabelecimento): Observable<any> {
    return this.http.post(
      this.url,
      JSON.stringify(estabelecimento),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      },
    );
  }
}
