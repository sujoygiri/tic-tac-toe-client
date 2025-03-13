import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private authenticatedUserDetails: UserData = {
    user_id: '',
    name: '',
    email: '',
  };
  constructor() {}

  get userDetails() {
    return this.authenticatedUserDetails;
  }

  set userDetails(userData: UserData) {
    this.authenticatedUserDetails = userData;
  }
}
