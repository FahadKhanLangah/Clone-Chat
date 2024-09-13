import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(process.env.DB_URI).then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Error: " + err));
}

export default connectDB;