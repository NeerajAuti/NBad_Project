import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NavbarService } from './navbar.service';
// import { MenuComponent } from './menu/menu.component';


@Component({
  selector: 'pb-root',
  // providers: [MenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'personal-budget';
  constructor(public AuthService: AuthService, public router: Router, private navbarService: NavbarService) {

    AuthService.isAuthenticated();
    // if (this.AuthService.isAuthenticated()) {
    //   localStorage.removeItem('JWT_access_token');
    //   this.router.navigate(['']);
    //   this.navbarService.updateLoginStatus(false);
    // }
    // else {
    //   console.log(localStorage.getItem('JWT_access_token'));
    //   this.navbarService.updateLoginStatus(true);
    //   this.navbarService.updateNavAfterAuth();
    //   //menuComponent.isLoggedIn = true;
    // }
  }
}
