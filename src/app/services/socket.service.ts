import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

interface AuthData {
  user_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private url: string = 'http://localhost:3000';

  constructor() {}

  socket(namespace: string, authdata: AuthData): Socket {
    namespace = namespace[0] === '/' ? namespace : '/' + namespace;
    return io(this.url + namespace, {
      autoConnect: false,
      upgrade: true,
      auth: authdata,
    });
  }
}
