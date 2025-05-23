import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseData, PlayerProfile } from '../interfaces/common.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private readonly URL: string = `http://localhost:3000/util/`;
  constructor(private http: HttpClient) {}

  getFriendProfileById(
    friendProfileId: string
  ): Observable<ResponseData<PlayerProfile>> {
    return this.http.get<ResponseData<PlayerProfile>>(
      this.URL + 'profile/' + friendProfileId
    );
  }
}
