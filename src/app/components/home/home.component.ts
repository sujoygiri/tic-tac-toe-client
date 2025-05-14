import { Component } from '@angular/core';
import socket from '../../socket-client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent {
  playerId: string = '';
  isSearchIdPopupShowing: boolean = false;
  constructor() {
    // socket.connect();
  }

  showOrHideSearchPopup() {
    this.isSearchIdPopupShowing = true;
  }
}
