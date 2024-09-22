import Conversation from "../model/conversation.model.js";

export const createConversation = async (req, res) => {
  try {
    const { participants } = req.body;
    if (!participants || participants.length < 2) {
      return res.status(400).json({
        success: false,
        message: "At least two participants are required."
      });
    }
    let conversation = await Conversation.findOne({ participants: { $all: participants } });
    if (!conversation) {
      conversation = await Conversation.create({ participants });
    }
    res.status(201).json({
      success: true,
      conversation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const conversations = await Conversation.find({ participants: userId }).populate({
      path: 'participants',
      select: '-password',
    }).select("-password").populate("lastMessage")
    if (!conversations) {
      return res.status(404).json({
        success: false,
        message: "No Conversations yet"
      })
    }
    res.status(201).json({
      success: true,
      conversations
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const getConversationDetail = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'participants',
      select: '-password',
    }).select("-password").populate("lastMessage")
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Start New Conversation"
      })
    }
    res.status(201).json({
      success: true,
      conversation
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const setLastMessage = async (req, res) => {
  try {
    const { lastMsgId, conversationId } = req.body;
    if (!lastMsgId || !conversationId) {
      return res.status(400).json({
        message: "Conversation ID and Last Message ID are required."
      })
    }
    let conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found."
      });
    }
    conversation.lastMessage = lastMsgId;
    await conversation.save();
    res.status(200).json({
      success: true,
      message: "Last message updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const getLastMessage = async (req, res) => {
  try {
    const { conversationId } = req.body;
    let lastMessage = await Conversation.findById(conversationId).select("lastMessage").populate({
      path: 'lastMessage'
    })
    if (!lastMessage) {
      return res.status(200).json({ lastMessage: "No Last Message" });
    }
    res.status(200).json({
      lastMessage
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}