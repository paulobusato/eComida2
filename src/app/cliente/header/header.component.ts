import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private jwtHelper: JwtHelperService,
  ) { }

  ngOnInit() {
    const token = this.jwtHelper.decodeToken(localStorage.getItem('token'));

    if (token && token.data.idCliente) {
      this.beforeLogin = false;
    } else {
      this.beforeLogin = true;
    }
  }

  onBack(): void {
    this.location.back();
  }

  onSair(): void {
    localStorage.clear();
    this.router.navigate(['/landing']);
  }
}
