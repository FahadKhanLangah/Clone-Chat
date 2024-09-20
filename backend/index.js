import { Server } from 'socket.io';
import http from 'http';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import cloudinary from 'cloudinary';

config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
connectDB();


// Socket Set up
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  socket.on('joinConversation', (conversationId) => {
    const rooms = Array.from(socket.rooms);
    if (!rooms.includes(conversationId)) {
      socket.join(conversationId);
    }
  });
  socket.on('joinGame', (gameId) => {
    const rooms = Array.from(socket.rooms);
    if (!rooms.includes(gameId)) {
      socket.join(gameId);
    }
    console.log("User joined game with id ", socket.id)
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

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
