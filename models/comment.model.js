const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
