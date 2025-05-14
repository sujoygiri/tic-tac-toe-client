import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of, tap } from 'rxjs';

export const authorizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log(route.url);
  console.log(state.url);
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.verifyPlayer().pipe(
    map((resp) => {
      return true;
    }),
    catchError(() => {
      router.navigate(['auth']);
      return of(false);
    })
  );
};

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const routeState = state.url.split('/')[1];
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.verifyPlayer().pipe(
    map((resp) => {
      router.navigate([routeState]);
      return false;
    }),
    catchError(() => {
      return of(true);
    })
  );
};
