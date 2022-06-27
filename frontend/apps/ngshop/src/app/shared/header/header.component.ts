import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '@bluebits/users';
@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private ls: LocalstorageService) {}
  userInfo: any;
  ngOnInit() {
    this.getSession();
  }
  ngOnChange() {
    this.getSession();
  }
  moveToLogin() {
    this.router.navigateByUrl('/login');
  }
  getSession() {
    this.userInfo = this.ls.getSessionInfo();
    console.log(this.userInfo);
  }
}
