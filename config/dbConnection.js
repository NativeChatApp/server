import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Lucknowkmc@rizwan.xieaa.mongodb.net/blackjack?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to mongo DB");
  } catch (error) {
    console.log("Error in db Connect", error);
  }
};
export default mongoConnect;
