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

export const authenticationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const globalService = inject(GlobalService);
  const authService = inject(AuthService);
  // const socketService = inject(SocketService);
  const router = inject(Router);
  return authService.verifyPlayer().pipe(
    map((resp) => {
      if (resp?.data) {
        console.log(resp);
        globalService.userDetails = resp.data;
        globalService.verificationStatus = true;
        const authData = { user_id: resp.data.player_id };
        // socketService.socket('/', authData).connect();
        router.navigate(['']);
        return false;
      } else {
        return true;
      }
    }),
    catchError((err) => {
      console.log(err);
      return of(true);
    })
  );
};

export const authorizationGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const globalService = inject(GlobalService);
  const authService = inject(AuthService);
  // const socketService = inject(SocketService);
  const router = inject(Router);
  return authService.verifyPlayer().pipe(
    map((resp) => {
      if (resp?.data) {
        console.log(resp);
        globalService.userDetails = resp.data;
        globalService.verificationStatus = true;
        const authData = { user_id: resp.data.player_id };
        // socketService.socket('/', authData).connect();
        return true;
      } else {
        router.navigate(['auth']);
        return false;
      }
    }),
    catchError((err) => {
      console.log(err);
      router.navigate(['auth']);
      return of(false);
    })
  );
};
