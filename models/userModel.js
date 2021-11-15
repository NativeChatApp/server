import mongose from "mongoose";

const schema = mongose.Schema(
  {
    name: String,
    email: String,
    dateOfBirth: String,
    password: String,
    isOnline: Boolean,
  },
  { timestamps: true }
);

const userModel = mongose.model("User", schema);

export default userModel;
