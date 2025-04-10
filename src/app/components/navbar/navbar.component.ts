import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSmartphone: boolean = false;

  constructor(
    private authServie: AuthService,
    private deviceService: DeviceService,
    private router: Router
  ) {
    this.isSmartphone = deviceService.isSmartphone;
  }

  //Ejecuta la funcion para verificar dispositivo cuando hay un cambio del tamaño del hancho
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.deviceService.verifyDevice();
    this.isSmartphone = this.deviceService.isSmartphone;
  }

  get login() {
    return this.authServie.user;
  }

  get admin() {
    return this.authServie.isAdmin();
  }

  handlerLogout() {
    this.authServie.logout();
    this.router.navigate(['/login']);
  }
}
