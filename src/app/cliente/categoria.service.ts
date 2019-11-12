import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Categoria {
  descricao: string;
  imagemUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = 'http://localhost/eComida2/dist/controle/categoriaaction.php';

  constructor(
    private http: HttpClient
  ) { }

  obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.url);
  }
}
