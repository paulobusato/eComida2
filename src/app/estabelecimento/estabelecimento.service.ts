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

  addEstabelecimento(estabelecimento: Estabelecimento) {
    const { razaoSocial, nomeFantasia, cnpj, status, email, senha, telefone, cep, logradouro,
            numero, bairro, cidade, uf } = estabelecimento;
    console.log(nomeFantasia);
    return this.http.post<Estabelecimento>(this.url,
        new HttpParams()
          .set('razaoSocial', razaoSocial)
          .set('nomeFantasia', nomeFantasia)
          .set('cnpj', cnpj.toString())
          .set('status', status)
          .set('email', email)
          .set('senha', senha)
          .set('telefone', telefone.toString())
          .set('cep', cep.toString())
          .set('logradouro', logradouro)
          .set('numero', numero.toString())
          .set('bairro', bairro)
          .set('cidade', cidade)
          .set('uf', uf)
          .toString(),
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/x-www-form-urlencoded')
          }
      );
  }
}
