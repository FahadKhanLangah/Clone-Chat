import app from "./app.js";
import { config } from "dotenv";
import connectDB from "./config/db.js";
config()

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
  connectDB();
  console.log(`Server is running on ${PORT}`)
})