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

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);
  const router = inject(Router);
  return authService.verifyPlayer().pipe(
    map((resp) => {
      if (resp.rowCount) {
        globalService.userDetails = resp.result;
        return true;
      } else {
        router.navigate(['auth']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['auth']);
      return of(false);
    })
  );
};
