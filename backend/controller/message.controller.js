import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const sender = req.user._id;
    const conversationId = req.params.id;
    const { message } = req.body;
    if (!conversationId || !message) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID and message are required."
      });
    }
    const newMessage = await Message.create({
      conversationId, message, sender
    })
    res.status(200).json({
      success: true,
      message: newMessage
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const getMessage = async (req, res) => {
  try {
    const conversationId  = req.params.id;
    if (!conversationId) {
      return res.status(400).json({
        success: false,
        message: "Conversation ID is required."
      });
    }
    const messages = await Message.find({ conversationId });
    res.status(200).json({
      success: true,
      messages
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}