import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  beforeLogin: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const estaLogado = localStorage.getItem('token');
    if (estaLogado) {
      this.beforeLogin = false;
    } else {
      this.beforeLogin = true;
    }
  }

  onBack(): void {
    this.location.back();
  }

  onSair(): void{
    localStorage.clear();
    this.router.navigate(['/landing']);
  }
}
