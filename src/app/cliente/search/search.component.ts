import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Observable } from 'rxjs';
import { Estabelecimento } from '../cliente.type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  estabelecimentos: Estabelecimento[];
  private todosEstabelecimentos: Estabelecimento[];

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit() {
    this.clienteService.obterEstabelecimentos().subscribe(
      (estabelecimentos: Estabelecimento[]) => {
        this.estabelecimentos = estabelecimentos;
        this.todosEstabelecimentos = estabelecimentos;
      }
    );
  }

  onKeyUp(value: string): void {
    if (!value) {
      this.estabelecimentos = this.todosEstabelecimentos;
    }
    this.estabelecimentos = this.estabelecimentos
      .filter((estabelecimento: Estabelecimento) => {
        return estabelecimento.nomeFantasia.toLowerCase().includes(value.toLowerCase());
      });
  }
}
