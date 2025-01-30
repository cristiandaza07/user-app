import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UserComponent } from "./user/user.component";
import { UserFormComponent } from "./user-form/user-form.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  imports: [UserComponent, UserFormComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios';

  users: User[] = [];

  userSelected: User;

  open: boolean = false;

  constructor(private service: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.service.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: User) {
    if (user.id > 0) {
      this.users = this.users.map(u => {
        if (u.id == user.id) {
          return { ...user };
        }
        return u;
      })
    } else {
      this.users = [...this.users, { ...user }];
    }

    Swal.fire({
      title: 'Guardado!',
      text: 'Usuario guardado con exito!',
      icon: 'success',
    });

    this.userSelected = new User();
    this.open = true;
  }

  removeUser(id: number): void {
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
        Swal.fire({
          title: 'Eliminado!',
          text: 'Se ha eliminado el usuario',
          icon: 'success',
        });
      }
    });
    
  }

  setSelectedUser(userRow: User): void{
    this.userSelected = { ...userRow };

  }

  setOpen(): void{
    this.open = !this.open;
  }
}
