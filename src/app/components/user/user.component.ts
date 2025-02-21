import { Component, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { load, remove } from '../../store/users/users.actions';

@Component({
  selector: 'user',
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users: User[] = [];
  paginator: any = {};

  constructor(
    private store: Store<{ users: any }>,
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.store.select('users').subscribe((state) => {
      this.users = state.users;
      this.paginator = state.paginator;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const page = +(params.get('page') || '0');
      this.store.dispatch(load({ page }));
    });
  }

  onRemoveUser(id: number): void {
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
        this.store.dispatch(remove({ id }));
      }
    });
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}
