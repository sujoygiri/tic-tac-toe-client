import { Component } from '@angular/core';
import { GameBoardComponent } from '../game-board/game-board.component';
import socket from '../../socket-client';

@Component({
  selector: 'app-home',
  imports: [GameBoardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor() {
    socket.connect();
  }
}
