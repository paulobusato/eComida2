import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estabelecimento } from '../estabelecimento/estabelecimento.type';
import { map } from 'rxjs/operators';
import { Pedido } from '../cliente/cliente.type';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  constructor(
    private http: HttpClient,
  ) { }

  obterEstabelecimento(): Observable<Estabelecimento> {
    return this.http.get<Estabelecimento[]>(
      `http://localhost/eComida2/dist/controle/estabelecimentoaction.php`
    ).pipe(
      map(e => e[0])
    );
  }

  obterPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `http://localhost/eComida2/dist/controle/pedidoaction.php`
    );
  }
}
