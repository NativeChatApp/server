import mongose from "mongoose";

const schema = mongose.Schema(
  {
    sender: { type: mongose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongose.Schema.Types.ObjectId, ref: "User" },
    content: String,
  },
  { timestamps: true }
);

const chatModel = mongose.model("Chat", schema);

export default chatModel;
