import { createReducer, on } from "@ngrx/store"
import { loginSuccess, logout } from "./auth.actions"

export const initialLogin = {
    isAuth: false,
    isAdmin: false,
    user: undefined
}

//Al recargar la pagina para el estado inicial verificamos si existe un usuario logeado y si no existe ponemos de estado inicial el initialLogin
const initialState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify(initialLogin)); 

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { login }) => (
        {
            isAuth: true,
            isAdmin: login.isAdmin,
            user: login.user
        }
    )),
    on(logout, (state) => (
        {
            isAuth: false,
            isAdmin: false,
            user: undefined
        }
    ))
)