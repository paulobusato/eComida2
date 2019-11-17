import { Component, OnInit } from '@angular/core';

interface Depoimento {
  mensagem: string;
  estabelecimentoNomeFantasia: string;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  depoimentos: Depoimento[] = [
    { mensagem: 'O eComida mudou nossa maneira de trabalhar', estabelecimentoNomeFantasia: 'Bobs' },
    { mensagem: 'O eComida mudou nossa maneira de trabalhar', estabelecimentoNomeFantasia: 'Bobs' },
    { mensagem: 'O eComida mudou nossa maneira de trabalhar', estabelecimentoNomeFantasia: 'Bobs' },
    { mensagem: 'O eComida mudou nossa maneira de trabalhar', estabelecimentoNomeFantasia: 'Bobs' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
