import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";

export const updateController = async (req, res) => {
  try {
    const { userId } = req;
    const { name, dateOfBirth } = req.body;

    const updateUser = await userModel.updateOne(
      { _id: userId },
      {
        name,
        dateOfBirth,
      }
    );
    if (updateUser.nModified === 1) {
      const user = await userModel.findOne({ _id: userId }).select("-password");
      res.send({ code: 200, user });
    } else {
      res.send({ code: 303, msg: "Some Error Occured" });
    }
  } catch (error) {
    console.log("Error in updateController =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error in changePassword =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { key } = req.params;
    const { userId } = req;
    console.log("Search =>", key);
    let search = [{ name: { $regex: key } }, { email: { $regex: key } }];
    const users = await userModel.find({
      $and: [{ _id: { $ne: userId } }, { $or: search }],
    });
    res.send({ code: 200, users });
  } catch (error) {
    console.log("Error in searchUser =>", error);
    res.send({ code: 500, msg: "Internal Server Error" });
  }
};
