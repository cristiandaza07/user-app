import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {

  user!: User;

  constructor(
    private router: Router,
    private sharingData: SharingDataService,
    private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.handlerLogin();
  }

  handlerLogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({ userName, password }) => {

      this.authService.loginUser({ userName, password }).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);

          const user = { userName: payload.sub };
          const login = {
            user,
            isAuth: true,
            isAdmin: payload.isAdmin
          }

          //Guardamos el token y los datos de la sesión del usuario en la SessionStorage
          this.authService.token = token;
          this.authService.user = login;

          this.router.navigate(['/users/page/0']);
        },
        error: error => {
          if (error.status == 401) {
            console.log(error.error)
            Swal.fire(
              'Error al iniciar sesión',
              error.error.message,
              'error'
            )
          } else {
            throw error;
          }
            
        }
      });
    })
  }

}
