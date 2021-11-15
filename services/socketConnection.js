import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";

const socketConnection = (io) => {
  io.users = [];
  io.on("connection", async (socket) => {
    console.log("One user is connected to server");
    socket.on("join", (data) => {
      try {
        const { userId } = data;
        let lastSocketData = io.users;
        lastSocketData.push(userId);
        io.users = [...new Set(lastSocketData)];
        const updateUser = userModel.updateOne(
          { _id: userId },
          { isOnline: true }
        );
        socket.join(userId);
      } catch (error) {
        console.log("Error in join Socket =>", error);
      }
    });
    socket.on("sendNewMessage", async (data) => {
      const { sender, receiver, content } = data;
      const chat = await chatModel.create({
        sender,
        receiver,
        content,
      });
      io.in(receiver).emit("NewMessage", data);
    });

    socket.on("disconnect", () => {
      console.log("One User disconected");
    });
  });
};

export default socketConnection;
