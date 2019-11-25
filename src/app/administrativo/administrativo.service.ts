import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estabelecimento } from '../estabelecimento/estabelecimento.type';
import { Pedido, Produto } from '../cliente/cliente.type';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {
  urlEstabelecimento = `http://localhost/eComida2/dist/controle/estabelecimentoaction.php`;
  urlPedido = `http://localhost/eComida2/dist/controle/pedidoaction.php`;
  urlProduto = `http://localhost/ecomida2/dist/controle/produtoaction.php`;

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

  obterPedidos(idPedido?: number): Observable<Pedido[] | Pedido> {
    if (idPedido) {
      return this.http.get<Pedido>(`${this.urlPedido}?idPedido=${idPedido}`);
    } else {
      return this.http.get<Pedido[]>(this.urlPedido);
    }
  }

  obterProdutos(idProduto?: number): Observable<Produto[] | Produto> {
    if (idProduto) {
      return this.http.get<Produto>(`${this.urlProduto}?idProduto=${idProduto}`);
    } else {
      return this.http.get<Produto[]>(this.urlProduto);
    }
  }

  alterarStatusPedido(idPedido: number, novoStatus: string): Observable<void> {
    const body = {idPedido, novoStatus};

    return this.http.put<void>(
      `${this.urlPedido}`,
      body,
      this.httpOpcoes
    );
  }
}
