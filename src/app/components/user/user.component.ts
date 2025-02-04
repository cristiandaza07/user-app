import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user',
  imports: [RouterModule],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  users: User[] = [];

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe(users => this.users = users)
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitte.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }
}
