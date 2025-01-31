import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user-form/user-form.component";
import Swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SharingDataService } from '../services/sharing-data.service';

@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css'
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios';

  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService
  ) {
  }

  ngOnInit(): void {
    this.service.findAll().subscribe(users => (this.users = users));
    this.addUser();
    this.removeUser();
  }

  addUser() {
    this.sharingData.newUserEventEmitter.subscribe(user => {   
      if (user.id > 0) {
        this.users = this.users.map(u => {
          if (u.id == user.id) {
            return { ...user };
          }
          return u;
        })
      } else {
        this.users = [...this.users, { ...user, id: new Date().getTime() }];
      }
      this.router.navigate(['/users'], { state: { users: this.users } });
      Swal.fire({
        title: 'Guardado!',
        text: 'Usuario guardado con exito!',
        icon: 'success',
      });
  
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
          this.users = this.users.filter((user) => user.id != id);
          this.router.navigate(['/users/create'], { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users'], { state: { users: this.users } });
          })
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
