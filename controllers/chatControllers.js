import chatModel from "../models/chatModel.js";

export const getChatHistory = async (req, res) => {
  try {
    const { peerId } = req.params;
    const { userId } = req.token;

    const chats = await chatModel.findOne({
      $or: [
        { sender: { $in: [userId, peerId] } },
        { receiver: { $in: [userId, peerId] } },
      ],
    });
    res.send({ code: 200, chats });
  } catch (error) {
    console.log("Error in getChatHistory =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};

export const getRecentChatUsers = async (req, res) => {
  try {
    const { userId } = req.token;
    let users = [];
    const chats = await chatModel
      .find({ $or: [{ sender: userId }, { receiver: userId }] })
      .populate("sender")
      .populate("receiver");
    for await (let chat of chats) {
      if (
        chat.sender._id !== userId &&
        !users.find((el) => el._id === chat.sender._id)
      ) {
        users.push(chat.sender);
      } else if (
        chat.receiver._id !== userId &&
        !users.find((el) => el._id === chat.receiver._id)
      ) {
        users.push(chat.receiver);
      }
    }
    return res.send({ code: 200, users });
  } catch (error) {
    console.log("Error in getRecentChatUsers =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};
