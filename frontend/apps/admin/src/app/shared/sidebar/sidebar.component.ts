import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@bluebits/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logoutUser() {
    console.log('mm');
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
