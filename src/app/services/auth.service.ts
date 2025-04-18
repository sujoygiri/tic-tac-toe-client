import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AuthData,
  ResponseData,
  UserProfile,
} from '../interfaces/common.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL: string = `http://localhost:3000/auth/`;
  constructor(private http: HttpClient) {}

  signUpPlayer(userData: AuthData): Observable<ResponseData<UserProfile>> {
    return this.http.post<ResponseData<UserProfile>>(
      this.URL + 'signup',
      userData,
      {
        withCredentials: true,
      }
    );
  }

  signInPlayer(userData: AuthData): Observable<ResponseData<UserProfile>> {
    return this.http.post<ResponseData<UserProfile>>(
      this.URL + 'signin',
      userData,
      {
        withCredentials: true,
      }
    );
  }

  verifyPlayer(): Observable<ResponseData<UserProfile>> {
    return this.http.post<ResponseData<UserProfile>>(
      this.URL + 'verify',
      {},
      { withCredentials: true }
    );
  }
}
