import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient, public navbarService: NavbarService, public router: Router) { }
  public isAuthenticated() {
    this.http.post('http://localhost:3000/api/verify', { token: localStorage.getItem('JWT_access_token') }).subscribe((res: any) => {
      this.navbarService.updateLoginStatus(true);
      this.navbarService.updateNavAfterAuth();
    }, err => {
      // alert(err.error);
      localStorage.removeItem('JWT_access_token');
      this.http.get('http://localhost:3000/api/logout')
        .subscribe((res: any) => {
          this.router.navigate(['']);
        });
    });
  }
}
