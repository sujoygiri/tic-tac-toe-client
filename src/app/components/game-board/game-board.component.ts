import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import socket from '../../socket-client';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
  animations: [
    trigger('increaseWidthFull', [
      state('true', style({ width: '100%', top: '50%', opacity: 1 })),
      state('false', style({ width: '0%', opacity: 0 })),
      transition('* => *', animate('300ms ease-in-out')),
    ]),
    trigger('increaseWidth', [
      state('true', style({ width: '80%', opacity: 1 })),
      state('false', style({ width: '0%', opacity: 0 })),
      transition('* <=> *', animate('300ms ease-in-out')),
    ]),
  ],
})
export class GameBoardComponent implements OnInit {
  gameBoard: (string | null)[][] = [];
  userInput: string = '';
  isTopSlashVisible: boolean = false;
  isMiddleSlashVisible: boolean = false;
  isBottomSlashVisible: boolean = false;
  isFrontSlashVisible: boolean = false;
  isBackSlashVisible: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.gameBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  handelSelectedCell(rowIndex: number, cellIndex: number) {
    // console.log(rowIndex, cellIndex);
    socket.emit('cell-clicked', { rowIndex, cellIndex }, (ack: any) => {
      console.log(ack);
    });
  }

  sendMessage() {
    this.isFrontSlashVisible = !this.isFrontSlashVisible;
    // this.isTopSlashVisible = !this.isTopSlashVisible;
    // this.isMiddleSlashVisible = !this.isMiddleSlashVisible;
    // this.isBottomSlashVisible = !this.isBottomSlashVisible;
    this.isBackSlashVisible = !this.isBackSlashVisible;
    // console.log(this.userInput);
    // socket.emit('message', this.userInput, (ack: any) => {
    //   console.log({ ack });
    // });
  }
}
