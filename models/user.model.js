const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    profile: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    // posts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],
    // followers: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // following: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    // likedPosts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],
    // savedPosts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],
    // notifications: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Notification",
    //   },
    // ],

    date: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
