import { Component } from '@angular/core';
import socket from '../../socket-client';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  playerId: string = '';
  constructor() {
    socket.connect();
  }
}
