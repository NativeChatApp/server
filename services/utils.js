import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
  try {
    var token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    console.log("Toekn =>", token);
    return token;
  } catch (error) {
    console.log("Error in generate Token =>", error);
    return false;
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req?.headers?.authorization;
    if (token) {
      const isValid = await jwt.verify(token, process.env.JWT_SECRET);
      if (isValid) {
        req.token.userId = isValid.userId;
        next();
      } else {
        res.send({ code: 401, msg: "Authorization error" });
      }
    } else {
      res.send({ code: 401, msg: "Authorization error" });
    }
  } catch (error) {
    console.log("Error in generate Token =>", error);
  }
};
