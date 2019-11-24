import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estabelecimento } from '../estabelecimento/estabelecimento.type';
import { Pedido } from '../cliente/cliente.type';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {
  urlEstabelecimento = `http://localhost/eComida2/dist/controle/estabelecimentoaction.php`;
  urlPedido = `http://localhost/eComida2/dist/controle/pedidoaction.php`;

  constructor(
    private http: HttpClient,
  ) { }

  httpOpcoes = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  obterEstabelecimento(): Observable<Estabelecimento> {
    return this.http.get<Estabelecimento>(this.urlEstabelecimento);
  }

  atualizarCadastroEstabelecimento(estabelecimento: Estabelecimento): Observable<void> {
    return this.http.put<void>(this.urlEstabelecimento, estabelecimento, this.httpOpcoes);
  }

  obterPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.urlPedido);
  }

}
