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
    const conversationId = req.params.id;
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

export const updateMessage = async (req, res) => {
  try {
    const { cid } = req.params;
    const user = req.user;
    let updatedMessages = await Message.updateMany(
      {
        conversationId: cid,
        sender: { $ne: user._id }
      },
      { isRead: true }
    );
    if (updatedMessages.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Conversation Not Found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Messages updated successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const deleteMessage = async (req, res) => {
  try {
    const mids = req.body;
    const user = req.user;
    if (!Array.isArray(mids) || mids.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Please Provide the message IDs"
      })
    }
    const messages = await Message.find({ _id: { $in: mids } });
    if (!messages || messages.length === 0) {
      res.status(400).json({
        success: false,
        message: "Message not found"
      })
    }
    const updatedMessages = [];
    for (const message of messages) {
      if (!message.deletedBy.includes(user._id)) {
        message.deletedBy.push(user._id);
        await message.save();
        updatedMessages.push(message);
      }
    }

    if (updatedMessages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Message already deleted by this user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Messages Deleted SuccessFully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Frontend
//const filteredMessages = messages.filter(message => !message.deletedBy.includes(currentUserId));
