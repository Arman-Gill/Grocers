import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '@bluebits/users';
@Component({
  selector: 'ngshop-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {
  constructor(private ls: LocalstorageService) {}
  userInfo: any;
  ngOnInit() {
    this.getSession();
  }
  getSession() {
    this.userInfo = this.ls.getSessionInfo();
    console.log(this.userInfo);
  }
  logout() {
    this.ls.removeToken();
    this.getSession();
  }
  ngOnChange() {
    this.getSession();
  }
}
