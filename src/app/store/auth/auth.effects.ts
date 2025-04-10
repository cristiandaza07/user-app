import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { login, loginError, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import Swal from "sweetalert2";
import { inject, Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {

    private service = inject(AuthService);
    private actions$ = inject(Actions);
    private router = inject(Router);

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        exhaustMap(action => this.service.loginUser({ userName: action.userName, password: action.password })
            .pipe(
                map(response => {
                    const token = response.token;
                    const payload = this.service.getPayload(token);
                    const loginData = {
                        user: { username: payload.sub },
                        isAuth: true,
                        isAdmin: payload.isAdmin,
                    };

                    console.log(payload);

                    //Guardamos el token y los datos de la sesión del usuario en la SessionStorage
                    this.service.token = token;
                    this.service.user = loginData;

                    return loginSuccess({ login: loginData });
                }),
                catchError((error) => of(loginError({ error: error.error.message })))
            )
        )
    ))

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
            this.router.navigate(['/posts']);
        })
    ), {dispatch: false})

    loginError$ = createEffect(() => this.actions$.pipe(
        ofType(loginError),
        tap((action) => {
            Swal.fire(
                'Error al iniciar sesión',
                action.error,
                'error'
            )
        })
    ), {dispatch: false})

    constructor(){}
}