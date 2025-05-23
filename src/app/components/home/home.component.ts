import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

import { UtilService } from '../../services/util.service';
import { PlayerProfile } from '../../interfaces/common.interface';
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
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  playerId: string = '';
  friendProfileId: string = '';
  showOrHideSearchFriend: boolean = false;
  foundFriendProfile: PlayerProfile[] = [];
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
      user_id: this.globalService.userDetails.player_id,
    };
    this.playerActionSocket = this.socketService.socket(
      this.playerActionNamespace,
      authData
    );
    // this.playerActionSocket.connect();
  }

  handelShowOrHideFriendSearchPopup() {
    this.showOrHideSearchFriend = !this.showOrHideSearchFriend;
  }

  searchFriendProfileById() {
    this.foundFriendProfile = [];
    this.searchingStatus = true;
    this.utilService.getFriendProfileById(this.friendProfileId).subscribe({
      next: (resp) => {
        if (resp.statusCode === 201) {
          this.searchingStatus = false;
          this.foundFriendProfile.push(resp.data);
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
