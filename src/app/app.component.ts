import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAppComponent } from "./components/user-app.component";
import 'animate.css';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserAppComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'user-app';
}
