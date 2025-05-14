import { Injectable } from '@angular/core';
import { UserProfile } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private isAuthenticated: boolean = false;
  private authenticatedUserDetails: UserProfile = {
    user_id: '',
    name: '',
    email: '',
  };
  constructor() {}

  get userDetails() {
    return this.authenticatedUserDetails;
  }

  set userDetails(userData: UserProfile) {
    this.authenticatedUserDetails = userData;
  }

  get authenticationStatus() {
    return this.isAuthenticated;
  }

  set authenticationStatus(status: boolean) {
    this.isAuthenticated = status;
  }
}
