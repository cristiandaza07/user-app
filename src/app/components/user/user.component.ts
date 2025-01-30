import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'user',
  imports: [],
  templateUrl: './user.component.html'
})
export class UserComponent {
  @Input() users: User[] = [];

  @Output() idUserEventEmitter = new EventEmitter();

  @Output() selectUserEvwentEmitter = new EventEmitter();

  onRemoveUser(id: number): void {
    this.idUserEventEmitter.emit(id);
  }

  onSelectedUser(user: User): void {
    this.selectUserEvwentEmitter.emit(user);
  }
}
