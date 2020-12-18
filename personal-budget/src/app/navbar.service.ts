import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public links = new Array<{ text: string, path: string }>();
  public isLoggedIn = new Subject<boolean>();

  constructor() {
    this.addItem({ text: 'Login', path: 'login' });
    this.addItem({ text: 'Sign Up', path: 'signup' });
    this.isLoggedIn.next(false);
  }
  getLinks() {
    return this.links;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean) {
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
      this.addItem({ text: 'Login', path: 'login' });
      this.addItem({ text: 'Sign Up', path: 'signup' });
    }
  }

  updateNavAfterAuth(): void {
    this.removeItem({ text: 'Login' });
    this.removeItem({ text: 'Sign Up' });
    this.addItem({ text: 'Dashboard', path: 'dashboard' });
  }

  addItem({ text, path }) {
    this.links.push({ text: text, path: path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
