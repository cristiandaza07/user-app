import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { find, findByUsername } from '../../store/users/users.actions';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'user-details',
  imports: [RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userLogin: any;

  constructor(
    private authService: AuthService,
    private store: Store<{ users: any }>
  ) {
    this.user = new User();
    this.store.select('users').subscribe((state) => {
      this.user = { ...state.user };
    });
  }

  ngOnInit(): void {
    this.userLogin = JSON.parse(sessionStorage.getItem('login')!);
    this.store.dispatch(
      findByUsername({ username: this.userLogin.user.username })
    );
  }
}
