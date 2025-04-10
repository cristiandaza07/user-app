import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private _isSmartphone: boolean = false;

  constructor() {
    this.verifyDevice();
  }

  set isSmartphone(isSmartphone: boolean) {
    this._isSmartphone = isSmartphone;
  }

  get isSmartphone() {
    return this._isSmartphone;
  }

  //Ejecuta la funcion para verificar dispositivo cuando hay un cambio del tamaño del hancho
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.verifyDevice();
  }

  verifyDevice() {
    this.isSmartphone = window.innerWidth < 768; // Verifica el tamaño del hancho de la ventana para determinar que tipo de dispositivo es
  }
}
