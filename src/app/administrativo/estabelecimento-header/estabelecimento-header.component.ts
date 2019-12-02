import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estabelecimento-header',
  templateUrl: './estabelecimento-header.component.html',
  styleUrls: ['./estabelecimento-header.component.scss']
})
export class EstabelecimentoHeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSair(): void{
    localStorage.clear();
    this.router.navigate(['/landing']);
  }

}
