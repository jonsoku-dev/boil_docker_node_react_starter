const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route   POST api/posts
// @desc    Create a Post
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sever Error!");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Sever Error!");
  }
});

// @route   GET api/posts/:id
// @desc    Get post by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "포스트를 찾을 수 없습니다." });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "포스트를 찾을 수 없습니다." });
    }
    res.status(500).send("Sever Error!");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // 포스트 체크
    if (!post) {
      return res.status(404).json({ msg: "포스트를 찾을 수 없습니다." });
    }
    // 유저 체크
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "유저 정보가 일치하지 않습니다. " });
    }
    await post.remove();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "포스트를 찾을 수 없습니다." });
    }
    res.status(500).send("Sever Error!");
  }
});

// @route   PUT api/posts/:id/like
// @desc    Like a post
// @access  Private
router.put("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: "이미 좋아요를 누르셨습니다. " });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error !");
  }
});

// @route   PUT api/posts/:id/unlike
// @desc    Unlike a post
// @access  Private
router.put("/:id/unlike", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: "아직 좋아요도 누르지않으셨어요~" });
    }
    // Get remove index
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error !");
  }
});

// @route   POST api/posts/:id/comment
// @desc    Create Comment
// @access  Private
router.post(
  "/:id/comment",
  [
    auth,
    [
      check("text", "text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error !");
    }
  }
);

// @route   DELETE api/posts/:id/comment/:comment_id
// @desc    Delete Comment
// @access  Private
router.delete("/:id/comment/:comment_id", auth, async (req, res) => {
  console.log(req.params.id, "server post id");
  console.log(req.params.comment_id, "server post comment id");
  try {
    const post = await Post.findById(req.params.id);

    //Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    //Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment가 존재하지 않습니다." });
    }
    //Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "유저 정보가 일치하지 않습니다. " });
    }
    // Get remove index
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error !");
  }
});

module.exports = router;
