import { createReducer, on } from "@ngrx/store";
import { User } from "../models/user";
import { addSuccess, find, findAll, findAllPageable, load, removeSuccess, resetUser, setErrors, setPaginator, setUserForm, updateSuccess } from "./users.actions";

const users: User[] = [];
const user: User = new User();

export const usersReducer = createReducer(
  {
    users,
    paginator: {},
    user,
    errors: {},
  },
  on(load, (state, { page }) => {
    return {
      users: state.users,
      paginator: state.paginator,
      user: state.user,
      errors: state.errors,
    };
  }),
  on(resetUser, (state) => {
    return {
      users: state.users,
      paginator: state.paginator,
      user: { ...user },
      errors: {},
    };
  }),
  on(setUserForm, (state, { user }) => {
    return {
      users: state.users,
      paginator: state.paginator,
      user: { ...user },
      errors: state.errors,
    };
  }),
  on(findAll, (state, { users }) => {
    return {
      users: [...users],
      paginator: state.paginator,
      user: state.user,
      errors: state.errors,
    };
  }),
  on(findAllPageable, (state, { users, paginator }) => {
    return {
      users: [...users],
      paginator: { ...paginator },
      user: state.user,
      errors: state.errors,
    };
  }),
  on(find, (state, { id }) => {
    return {
      users: state.users,
      paginator: state.paginator,
      user: state.users.find((user) => user.id == id) || new User(),
      errors: state.errors,
    };
  }),
  on(setPaginator, (state, { paginator }) => {
    return {
      users: state.users,
      paginator: { ...paginator },
      user: state.user,
      errors: state.errors,
    };
  }),
  on(addSuccess, (state, { userNew }) => {
    return {
      users: [...state.users, { ...userNew }],
      paginator: state.paginator,
      user: { ...user },
      errors: {},
    };
  }),
  on(updateSuccess, (state, { userUpdated }) => {
    return {
      users: state.users.map((u) => {
        if (u.id == userUpdated.id) {
          return { ...userUpdated };
        }
        return u;
      }),
      paginator: state.paginator,
      user: { ... user },
      errors: {},
    };
  }),
  on(removeSuccess, (state, { id }) => {
    return {
      users: state.users.filter((user) => user.id != id),
      paginator: state.paginator,
      user: state.user,
      errors: state.errors,
    };
  }),
  on(setErrors, (state, { userForm, errors }) => {
    return {
      users: state.users,
      paginator: state.paginator,
      user: {... userForm },
      errors: { ...errors },
    };
  })
);