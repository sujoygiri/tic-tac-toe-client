import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  autoConnect: true,
  upgrade: true,
});

export default socket;
