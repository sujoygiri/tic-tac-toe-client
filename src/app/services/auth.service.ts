import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/common.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL: string = `http://localhost:3000/auth/`;
  constructor(private http: HttpClient) {}

  signUpPlayer(userData: AuthData): Observable<any> {
    return this.http.post(this.URL + 'signup', userData, {
      withCredentials: true,
    });
  }

  signInPlayer(userData: AuthData): Observable<any> {
    return this.http.post(this.URL + 'signin', userData, {
      withCredentials: true,
    });
  }

  verifyPlayer(): Observable<any> {
    return this.http.post(this.URL + 'verify', {}, { withCredentials: true });
  }
}
