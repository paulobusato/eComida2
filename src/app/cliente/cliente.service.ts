import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Categoria, Estabelecimento, Produto, Pedido } from './cliente.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  produtoAtivado: Produto;
  pedido: Pedido = {
    produtos: [],
  };

  constructor(
    private http: HttpClient
  ) { }

  obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost/eComida2/dist/controle/categoriaaction.php');
  }

  obterEstabelecimentos(): Observable<Estabelecimento[]> {
    return this.http.get<Estabelecimento[]>('http://localhost/eComida2/dist/controle/estabelecimentoaction.php');
  }

  obterProdutos(idEstabelecimento: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`http://localhost/eComida2/dist/controle/produtoaction.php?idEstabelecimento=${idEstabelecimento}`);
  }

  addPedido(): Observable<any> {
    return this.http.post(
      'http://localhost/eComida2/dist/controle/pedidoaction.php',
      JSON.stringify({
        idEstabelecimento: 1,
        idCliente: 1,
        valor: 100,
        pedidoItems: [{
          idProduto: 1,
          quantidade: 2,
          valor: 50
        },{
          idProduto: 1,
          quantidade: 5,
          valor: 40
        }]
      }),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      }
    );
  }

  login(): void {
  }
}
