import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import socket from '../../socket-client';

@Component({
  selector: 'app-game-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.css',
})
export class GameBoardComponent implements OnInit {
  gameBoard: (string | null)[][] = [];
  userInput: string = '';
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
    console.log(this.userInput);
    socket.emit('message', this.userInput, (ack: any) => {
      console.log({ ack });
    });
  }
}
