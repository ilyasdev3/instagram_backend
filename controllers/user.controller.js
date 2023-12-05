const User = require("../models/user.model");
const Post = require("../models/post.model");
const Following = require("../models/following.model");
const Follower = require("../models/follower.model");

const STATUS = require("../constant/status.constant");

const controller = {};

controller.getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "User does not exist" });
    const posts = await Post.find({ userId: userId }).sort({ createdAt: -1 });
    const followers = await Follower.find({ userId: userId });
    const following = await Following.find({ userId: userId });
    const followersCount = followers.length;
    const followingCount = following.length;
    const userPosts = posts.length;

    const userData = {
      user,
      followers: followersCount,
      followings: followingCount,
      posts: userPosts,
    };

    return res.status(STATUS.SUCCESS).json({
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = controller;
