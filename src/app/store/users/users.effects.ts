import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  add,
  addSuccess,
  findAllPageable,
  load,
  remove,
  removeSuccess,
  setErrors,
  update,
  updateSuccess,
} from './users.actions';
import { catchError, EMPTY, exhaustMap, map, of, tap } from 'rxjs';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  private service = inject(UserService);
  private actions$ = inject(Actions);
  private router = inject(Router);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(load),
      exhaustMap((action) =>
        this.service.findAllPageable(action.page).pipe(
          map((pageable) => {
            const users = pageable.content as User[];
            const paginator = pageable;

            return findAllPageable({ users, paginator });
          }),
          catchError((error) => of(error))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(add),
      exhaustMap((action) =>
        this.service.create(action.userNew).pipe(
          map((userNew) => addSuccess({ userNew })),
          catchError((error) => {
            if (error.status == 400) {
              return of(
                setErrors({
                  userForm: action.userNew,
                  errors: error.error,
                })
              );
            }
            return of(error);
          })
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(remove),
      exhaustMap((action) =>
        this.service
          .remove(action.id)
          .pipe(map(() => removeSuccess({ id: action.id })))
      )
    )
  );

  uptadeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(update),
      exhaustMap((action) =>
        this.service.update(action.userUpdated).pipe(
          map((userUpdated) => updateSuccess({ userUpdated })),
          catchError((error) => {
            if (error.status == 400) {
              return of(
                setErrors({
                  userForm: action.userUpdated,
                  errors: error.error,
                })
              );
            }
            return of(error);
          })
        )
      )
    )
  );

  addSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addSuccess),
        tap(() => {
          this.router.navigate(['/users']);

          Swal.fire({
            title: 'Creado!',
            text: 'Usuario creado con exito!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  updateSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSuccess),
        tap(() => {
          this.router.navigate(['/users']);

          Swal.fire({
            title: 'Actualizado!',
            text: 'Usuario editado con exito!',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  removeSuccessUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeSuccess),
        tap(() => {
          this.router.navigate(['/users']);

          Swal.fire({
            title: 'Eliminado!',
            text: 'Se ha eliminado el usuario',
            icon: 'success',
          });
        })
      ),
    { dispatch: false }
  );

  constructor() {}
}
