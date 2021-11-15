import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";

export const updateController = async (req, res) => {
  try {
    const { userId } = req.token;
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
