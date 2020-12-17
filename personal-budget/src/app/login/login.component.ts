import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NavbarService } from '../navbar.service';


@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public error: string;
  isLoggedIn = false;

  constructor(private http: HttpClient, public DataService: DataService, private router: Router, private navbarService: NavbarService) {
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit(): void {
  }
  public submit() {
    this.http.post('http://localhost:3000/api/login', { username: this.username, password: this.password })
      .subscribe((res: any) => {
        console.log(res.status);
        localStorage.setItem('JWT_access_token', res.token);
        // this.DataService.GetBudgetData();
        this.navbarService.updateLoginStatus(true);
        this.navbarService.updateNavAfterAuth();
        this.router.navigate(['/']);
      }, err => this.error = err.error.err
      );
  }

}
