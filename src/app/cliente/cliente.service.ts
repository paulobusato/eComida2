import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria, Estabelecimento, Produto, Pedido, Cliente } from './cliente.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlEstabelecimento = 'http://localhost/eComida2/dist/controle/estabelecimentoaction.php';
  urlCliente = 'http://localhost/eComida2/dist/controle/clienteaction.php';
  urlPedido = 'http://localhost/eComida2/dist/controle/pedidoaction.php';
  produtoAtivado: Produto;
  estabelecimentoAtivo: Estabelecimento;
  clienteAtivo: Cliente;
  pedido: Pedido;

  constructor(
    private http: HttpClient
  ) { }

  httpOpcoes = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost/eComida2/dist/controle/categoriaaction.php');
  }

  obterEstabelecimentos(idEstabelecimento?: number): Observable<Estabelecimento[] | Estabelecimento> {
    if (idEstabelecimento) {
      return this.http.get<Estabelecimento>(`${this.urlEstabelecimento}?idEstabelecimento=${idEstabelecimento}`);
    } else {
      return this.http.get<Estabelecimento[]>(this.urlEstabelecimento);
    }
  }

  obterProdutos(idEstabelecimento?: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`http://localhost/eComida2/dist/controle/produtoaction.php?idEstabelecimento=${idEstabelecimento}`);
  }

  obterPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.urlPedido);
  }

  addPedido(): Observable<any> {
    return this.http.post(
      this.urlPedido, this.pedido, this.httpOpcoes);
  }

  obterCliente(): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlCliente);
  }

  addCliente(cliente: Cliente): Observable<void> {
    return this.http.post<void>(this.urlCliente, cliente, this.httpOpcoes);
  }
}
