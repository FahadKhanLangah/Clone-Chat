import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { sign } from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: {
    url: { type: String, required: true },
    public_id: { type: String, required: true }
  },
  isOnline: { type: Boolean, default: false },
  about: { type: String, default: "Hi There ! I'm using FK Chat" }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
