const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookmarkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
