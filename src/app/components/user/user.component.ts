import { Component, EventEmitter, OnInit} from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { PaginatorComponent } from '../paginator/paginator.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'user',
  imports: [RouterModule, PaginatorComponent],
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{

  users: User[] = [];
  paginator: any = {};

  constructor(
    private router: Router,
    private service: UserService,
    private sharingData: SharingDataService,
    private authService: AuthService,
    private route: ActivatedRoute)
  {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
      this.paginator = this.router.getCurrentNavigation()?.extras.state!['paginator'];
    }
  }

  ngOnInit(): void {
    if (this.users == undefined || this.users == null || this.users.length == 0) {
      console.log('Consulta finAll()');
      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        console.log(page);
        this.service.findAllPagiable(page).subscribe((pabeable) => {
          this.users = pabeable.content as User[]
          this.paginator = pabeable;
          this.sharingData.pageUsersEventEmitter.emit({users: this.users, paginator: this.paginator});
        });
      })
    }
  }

  onRemoveUser(id: number): void {
    this.sharingData.idUserEventEmitte.emit(id);
  }

  onSelectedUser(user: User): void {
    this.router.navigate(['/users/edit', user.id]);
  }

  get admin() {
    return this.authService.isAdmin();
  }
}
