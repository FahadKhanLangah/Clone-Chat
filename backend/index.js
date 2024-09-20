import { Server } from 'socket.io';
import http from 'http';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import cloudinary from 'cloudinary';
import SocketFunc from './utils/socket.js';

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

SocketFunc(io);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
