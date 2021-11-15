import userModel from "../models/userModel";

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
    socket.on("sendNewMessage", (data) => {
      const { sender, receiver, content } = data;
    });
    socket.on("disconnect", () => {
      console.log("One User disconected");
    });
  });
};

export default socketConnection;
