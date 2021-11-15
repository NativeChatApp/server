import chatModel from "../models/chatModel.js";

export const getChatHistory = async (req, res) => {
  try {
    const { peerId } = req.params;
    const { userId } = req;
    console.log("Chatsss =>", userId, peerId);
    const chats = await chatModel.find({
      $or: [
        { sender: { $in: [userId, peerId] } },
        { receiver: { $in: [userId, peerId] } },
      ],
    });
    console.log("chats =>", chats);
    res.send({ code: 200, chats });
  } catch (error) {
    console.log("Error in getChatHistory =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};

export const getRecentChatUsers = async (req, res) => {
  try {
    const { userId } = req;
    let users = [];
    const chats = await chatModel
      .find({ $or: [{ sender: userId }, { receiver: userId }] })
      .populate("sender")
      .populate("receiver");
    console.log("Chars =>", users);
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
