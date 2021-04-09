// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

//route get api/post
//desc get posts
//access Private
router.get("/", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});

//route post api/post
//desc create posts
//access Private
router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  const { userId } = req;
  console.log(userId);
  //simple validation
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "title is require" });
  try {
    const newPost = new Post({
      title,
      description,
      url: url.startsWith("https://") ? url : `https://${url}`,
      status: status || "TO LEARN",
      user: req.userId,
    });
    await newPost.save();
    res.json({ success: true, message: "Happy learning", post: newPost });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});

//route put api/posts
//desc update posts
//access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "title is require" });
  try {
    let updatedpost = {
      title,
      description: description || "",
      url: (url.startsWith("https://") ? url : `https://${url}`) || "",
      status: status || "TO LEARN",
    };
    const postUpdatedCondition = { _id: req.params.id, user: req.userId };
    updatedpost = await Post.findOneAndUpdate(
      postUpdatedCondition,
      updatedpost,
      { new: true }
    );
    if (!updatedpost)
      return res
        .status(401)
        .json({ success: false, message: "post not found" });
    res.json({
      success: true,
      message: "excellent progress",
      post: updatedpost,
    });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});
//route Delete api/posts
//desc delete posts
//access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const postDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletePost = await Post.findOneAndDelete(postDeleteCondition);

    //user not authorize or not found post
    if (!deletePost)
      return res
        .status(401)
        .json({ success: false, message: "post not found" });
    res.json({
      success: true,
      post: deletePost,
    });
  } catch (error) {
    console.log(error);
    res.status({ success: false, message: "internal server error" });
  }
});
module.exports = router;
