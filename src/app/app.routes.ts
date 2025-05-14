import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { AuthComponent } from './components/auth/auth.component';
import { authorizationGuard, authenticationGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authorizationGuard] },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'game',
    component: GameBoardComponent,
    canActivate: [authorizationGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
