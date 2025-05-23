import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(
    private authServie: AuthService,
    private router: Router) { }

  get login() {
    return this.authServie.user;
  }

  get admin() {
    return this.authServie.isAdmin();
  }

  handlerLogout() {
    this.authServie.logout();
    this.router.navigate(['/login']);
  }
}
