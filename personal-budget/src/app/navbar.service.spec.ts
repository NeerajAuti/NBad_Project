import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { NavbarService } from './navbar.service';

describe('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarService);
  });

  it('check if logged in -- custom test', () => {
    service.isLoggedIn.next(true);
    let data = new Subject<boolean>();
    data.next(true);
    expect(service.getLoginStatus()).toEqual(data);
  });

  it('check if logged in -- custom test', () => {
    service.isLoggedIn.next(false);
    let data = new Subject<boolean>();
    data.next(false);
    expect(service.getLoginStatus()).toEqual(data);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
