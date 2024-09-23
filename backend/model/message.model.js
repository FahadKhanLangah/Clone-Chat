import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  media: { type: String, default: null },
  messageType: { type: String, enum: ['text', 'image', 'video', 'file'], default: 'text' },
  isRead: { type: Boolean, default: false },
  deletedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;