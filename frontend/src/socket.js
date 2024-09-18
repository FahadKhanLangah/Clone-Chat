import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
  autoConnect: false, // Delay connection until you explicitly call socket.connect()
});

export default socket;