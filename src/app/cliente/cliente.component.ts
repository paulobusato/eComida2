import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estabelecimento, Categoria } from './cliente.type';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  categorias$: Observable<Categoria[]>;
  estabelecimentos$: Observable<Estabelecimento[]>;

  constructor(
    private router: Router,
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.categorias$ = this.clienteService.obterCategorias();
    this.estabelecimentos$ = this.clienteService.obterEstabelecimentos();
  }
}
