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
  console.log(`User connected: ${socket.id}`);

  // Listen for joining a conversation
  socket.on('joinConversation', (conversationId) => {
    const rooms = Array.from(socket.rooms);
    if (!rooms.includes(conversationId)) {
      socket.join(conversationId);
      console.log(`User with ID ${socket.id} joined conversation ${conversationId}`);
    }
  });

  // Listen for sending a message
  socket.on('sendMessage', (messageData) => {
    const { conversationId, sender, message } = messageData;
    // Emit the message to the conversation room
    io.to(conversationId).emit('receiveMessage', {
      sender,
      message,
      conversationId,
      createdAt: new Date(),
    });

    console.log(`Message sent in conversation ${conversationId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
