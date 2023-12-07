const Post = require("../models/post.model");
const User = require("../models/user.model");
const Following = require("../models/following.model");
const Follower = require("../models/follower.model");
const Like = require("../models/like.model");
const Comment = require("../models/comment.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const controller = {};
const STATUS = require("../constant/status.constant");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

controller.create = async (req, res) => {
  try {
    const img = req.files && req.files.img;

    if (!img)
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "File is required" });
    const result = await cloudinary.uploader.upload(img.tempFilePath);
    if (!result)
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "Error uploading image" });

    const newPost = await new Post({
      userId: req.userId,
      desc: req.body.desc,
      img: result.url,
    });
    fs.unlinkSync(img.tempFilePath);
    await newPost.save();
    res.status(STATUS.CREATED).json({ post: newPost, message: "Post created" });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

controller.getAllPosts = async (req, res) => {
  try {
    User.createIndexes();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "username profile");

    if (!posts)
      return res.status(STATUS.NOT_FOUND).json({ message: "No post found" });

    return res.status(STATUS.SUCCESS).json({ posts, message: "All posts" });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

controller.getPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // send user along with post
    const post = await Post.findById(postId).populate(
      "userId",
      "-password -email -createdAt -updatedAt -__v -isAdmin"
    );
    const likes = await Like.find({ postId: postId });
    const comments = await Comment.find({ postId: postId }).populate(
      "userId",
      "-password -email -createdAt -updatedAt -__v -isAdmin"
    );
    const likesCount = likes.length;
    const commentsCount = comments.length;

    if (!post)
      return res.status(STATUS.NOT_FOUND).json({ message: "Post not found" });

    const postData = {
      post,
      likes: likes,
      comments: comments,
      likesCount: likesCount,
      commentsCount: commentsCount,
    };

    return res
      .status(STATUS.SUCCESS)
      .json({ post: postData, message: "Post found" });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = controller;
