import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  beforeLogin: boolean;

  constructor(
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'sacola'
        || this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'login') {
      this.beforeLogin = true;
    } else {
      this.beforeLogin = false;
    }
  }

  onBack(): void {
    this.location.back();
  }

}
