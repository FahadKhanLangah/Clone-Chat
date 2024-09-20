
export default function SocketFunc(io) {
  let gameRooms = {};
  io.on('connection', (socket) => {
    socket.on('joinConversation', (conversationId) => {
      const rooms = Array.from(socket.rooms);
      if (!rooms.includes(conversationId)) {
        socket.join(conversationId);
      }
    });
    socket.on('joinGame', (gameId) => {
      if (!gameRooms[gameId]) {
        gameRooms[gameId] = { players: [], moves: {} };
      }
      socket.join(gameId);
      console.log("User joined game with id ", socket.id);
    });

    socket.on("moveMade", ({ id, pick, sender }) => {
      if (!gameRooms[id].moves[sender]) {
        gameRooms[id].moves[sender] = pick;
      }
      if (Object.keys(gameRooms[id].moves).length === 2) {
        io.to(id).emit("startTimer");
        setTimeout(() => {
          gameRooms[id].moves = {};
        }, 5000);
      }
    });
    socket.on("game", (gameData) => {
      const { id, pick, sender } = gameData
      io.to(id).emit('sendMove', {
        pick,
        sender,
        createdAt: new Date()
      })
    });
    socket.on('sendMessage', (messageData) => {
      const { conversationId, sender, message } = messageData;
      io.to(conversationId).emit('receiveMessage', {
        sender,
        message,
        conversationId,
        createdAt: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

