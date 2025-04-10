import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

@Component({
  selector: 'auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user: User;

  constructor(
    private store: Store<{auth: any}>) {
    this.user = new User();
  }

  onSubmit() {
    if (!this.user.userName || !this.user.password) {
      Swal.fire(
        'Error de validación',
        'Usuario y contraseña son obligatorios',
        'error'
      );
    } else {
      this.store.dispatch(login({ userName: this.user.userName, password: this.user.password }));
    }
  }
}