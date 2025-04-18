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

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log({ route, state });
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);
  const socketService = inject(SocketService);
  const router = inject(Router);
  if (globalService.authenticationStatus) {
    return true;
  }
  return authService.verifyPlayer().pipe(
    map((resp) => {
      if (resp?.result) {
        console.log(resp);
        globalService.userDetails = resp.result;
        globalService.authenticationStatus = true;
        const authData = { user_id: resp.result.user_id };
        if (state.url === '/auth') {
          router.navigate(['/']);
          return false;
        }
        // socketService.socket('/', authData).connect();
        // router.navigateByUrl('/', { skipLocationChange: true });
        return true;
      } else {
        if (state.url === '/auth') {
          return true;
        }
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
