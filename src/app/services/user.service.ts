import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      name: 'Andres',
      lastName: 'Restrepo',
      email: 'andres@gmail.com',
      userName: 'andres',
      password: '12345'
    },
    {
      id: 2,
      name: 'Camilo',
      lastName: 'Guzman',
      email: 'camilo@gmail.com',
      userName: 'camilo',
      password: '12345'
    },
  ];

  constructor() { }

  findAll(): Observable<User[]>{
    return of(this.users);
  }
}
