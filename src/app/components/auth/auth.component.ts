import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  user: User;

  constructor(private sharingData: SharingDataService) {
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
      this.sharingData.handlerLoginEventEmitter.emit({ userName: this.user.userName, password: this.user.password });
    }
  }
}
