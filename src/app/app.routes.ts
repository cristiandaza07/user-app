import { Routes } from '@angular/router';
import { UserAppComponent } from './components/user-app.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { Forbiden403Component } from './components/forbiden403/forbiden403.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users/page/0',
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'users/page/:page',
    component: UserComponent,
  },
  {
    path: 'users/user/:username',
    component: UserDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'users/create',
    component: UserFormComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'users/edit/:id',
    component: UserFormComponent,
    canActivate: [authGuard, roleGuard],
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'forbiden',
    component: Forbiden403Component,
  },
];
