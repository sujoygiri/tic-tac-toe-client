import { Injectable } from '@angular/core';
import { PlayerProfile } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private isVerified: boolean = false;
  private authenticatedUserDetails: PlayerProfile = {
    player_id: '',
    player_name: '',
    email: '',
  };
  constructor() {}

  get userDetails() {
    return this.authenticatedUserDetails;
  }

  set userDetails(userData: PlayerProfile) {
    this.authenticatedUserDetails = userData;
  }

  get verificationStatus() {
    return this.isVerified;
  }

  set verificationStatus(status: boolean) {
    this.isVerified = status;
  }
}
