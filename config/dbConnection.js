import mongoose from "mongoose";

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongo DB");
  } catch (error) {
    console.log("Error in db Connect", error);
  }
};
export default mongoConnect;
