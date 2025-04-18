import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

import { UtilService } from '../../services/util.service';
import { UserProfile } from '../../interfaces/common.interface';
import { SocketService } from '../../services/socket.service';
import { GlobalService } from '../../services/global.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  playerId: string = '';
  friendProfileId: string = '';
  showOrHideSearchFriend: boolean = false;
  foundFriendProfile: UserProfile[] = [];
  searchingStatus: boolean = false;
  playerActionNamespace: string = '/player_action';
  playerActionSocket!: Socket;

  constructor(
    private utilService: UtilService,
    private socketService: SocketService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    const authData = {
      user_id: this.globalService.userDetails.user_id,
    };
    this.playerActionSocket = this.socketService.socket(
      this.playerActionNamespace,
      authData
    );
    this.playerActionSocket.connect();
  }

  searchFriendProfileById() {
    this.foundFriendProfile = [];
    this.searchingStatus = true;
    this.utilService.getFriendProfileById(this.friendProfileId).subscribe({
      next: (resp) => {
        if (resp.status === 'success') {
          this.searchingStatus = false;
          this.foundFriendProfile.push(resp.result);
          console.log(resp);
        } else {
          this.searchingStatus = false;
          throw new Error('Need to implement global error handler');
        }
      },
      error: (err) => {
        console.warn(err);
        this.searchingStatus = false;
        throw new Error('Need to implement global error handler');
      },
    });
  }

  async inviteToPlay(playerId: string) {
    try {
      const eventResponse = await this.playerActionSocket
        .timeout(3000)
        .emitWithAck('inviteToPlay', { playerId });
      console.log(eventResponse);
    } catch (error) {
      throw new Error('Need to implement global error handler');
    }
  }
}
