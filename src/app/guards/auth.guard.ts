import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { SocketService } from '../services/socket.service';

export const authorizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log({ route, state });
  console.log(route.url);
  console.log(state.url);
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);
  const socketService = inject(SocketService);
  const router = inject(Router);
  if (globalService.authenticationStatus) {
  }
  return authService.verifyPlayer().pipe(
    map((resp) => {
      if (resp?.result) {
        console.log(resp);
        globalService.userDetails = resp.result;
        globalService.authenticationStatus = true;
        const authData = { user_id: resp.result.user_id };
        // socketService.socket('/', authData).connect();
        // router.navigateByUrl('/', { skipLocationChange: true });
        return true;
      } else {
        router.navigate(['auth']);
        return false;
      }
    }),
    catchError(() => {
      if (state.url === '/auth') {
        return of(true);
      }
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
