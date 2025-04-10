import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../services/device.service';



@Component({
  selector: 'user-app',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule],
  templateUrl: './user-app.component.html',
  styleUrl: './user-app.component.css',
})
export class UserAppComponent {
  isSmartphone: boolean = false;

  constructor(
    private authService: AuthService,
    private deviceService: DeviceService
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
    return this.authService.user;
  }
}