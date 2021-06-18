import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  get auth(): Auth {
    return this.authService.auth;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['./auth']);
  }

}
