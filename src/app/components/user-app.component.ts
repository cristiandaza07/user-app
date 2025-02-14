import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user-form/user-form.component";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
  title: string = 'Listado de usuarios';

  users: User[] = [];

  paginator: any = {};

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    //this.service.findAll().subscribe(users => (this.users = users));

    this.addUser();
    this.removeUser();
    this.findUserById();
    this.pageUsersEvent();
    this.handlerLogin();
  }

  handlerLogin() {
    this.sharingData.handlerLoginEventEmitter.subscribe(({ userName, password }) => {
      console.log(userName + ' ' + password)

      this.authService.loginUser({ userName, password }).subscribe({
        next: response => {
          const token = response.token;
          console.log(token)
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

  pageUsersEvent() {
    this.sharingData.pageUsersEventEmitter.subscribe(pageable => {
      this.users = pageable.users;
      this.paginator = pageable.paginator;
    });
  }

  findUserById() {
    this.sharingData.findUserByIdEventEmitter.subscribe(id => {
      
      const user = this.users.find(user => user.id == id);
      this.sharingData.selectUserEventEmitter.emit(user);
    })
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {   
      if (user.id > 0) {
        this.service.update(user).subscribe(
          {
            next: (userUpdated) => {
              this.users = this.users.map(u => {
                if (u.id == userUpdated.id) {
                  return { ...userUpdated };
                }
                return u;
              })
              this.router.navigate(['/users'], {
                state:
                {
                  users: this.users,
                  paginator: this.paginator
                }
              });

              Swal.fire({
                title: 'Actualizado!',
                text: 'Usuario editado con exito!',
                icon: 'success',
              });
            },
            error: (err) => {
              if (err.status == 400) {
                this.sharingData.errorsUserFormUserEventEmitter.emit(err.error);
              }
            }
          });
      } else {
        this.service.create(user).subscribe(
          {
            next: (userNew) => {
              console.log(userNew);
              this.users = [...this.users, { ...userNew }];
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator,
                },
              });

              Swal.fire({
                title: 'Creado!',
                text: 'Usuario creado con exito!',
                icon: 'success',
              });
            },
            error: (err) => {
              if (err.status == 400) {
                this.sharingData.errorsUserFormUserEventEmitter.emit(err.error);
              }
            }
          });
      }
  
    })
  }

  removeUser(): void {
    this.sharingData.idUserEventEmitte.subscribe(id => {      
      Swal.fire({
        title: '¿Estás seguro de eliminar?',
        text: 'El usuario se eliminará permanentemente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {

          this.service.remove(id).subscribe(() => {
            this.users = this.users.filter((user) => user.id != id);
            this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
              this.router.navigate(['/users'], {
                state: {
                  users: this.users,
                  paginator: this.paginator
                },
              });
            });

          });

          Swal.fire({
            title: 'Eliminado!',
            text: 'Se ha eliminado el usuario',
            icon: 'success',
          });
        }
      });
    })
    
  }

}
