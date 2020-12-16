import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { NavbarService } from '../navbar.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'pb-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  links: Array<{ text: string, path: string }>;
  isLoggedIn = false;

  constructor(private router: Router, private navbarService: NavbarService) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'signup', component: SignupComponent },
    );
  }

  ngOnInit(): void {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
    // if (localStorage.getItem("JWT_access_token") != null) {
    //   this.navbarService.updateLoginStatus(true);
    //   this.navbarService.updateNavAfterAuth();
    // }
  }

  logout() {
    this.navbarService.updateLoginStatus(false);
    localStorage.removeItem("JWT_access_token");
    this.router.navigate(['/']);
  }

}
