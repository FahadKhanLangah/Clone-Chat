import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js'
import conversationRoute from './routes/conversation.route.js'
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/conversation', conversationRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong'
  });
});
export default app;