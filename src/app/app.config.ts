import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './store/users/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { authReducer } from './store/auth/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './store/auth/auth.effects';
import { postsReducer } from './store/posts/posts.reducer';
import { PostsEffects } from './store/posts/posts.effects';
import { commentsReducer } from './store/commets/comments.reducer';
import { CommentsEffects } from './store/commets/comments.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideStore({
      comments: commentsReducer,
      users: usersReducer,
      posts: postsReducer,
      auth: authReducer
    }),
    provideEffects(UsersEffects, PostsEffects, CommentsEffects, AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
