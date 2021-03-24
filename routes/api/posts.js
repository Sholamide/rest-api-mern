const express = require("express");
const router = express.Router();

//posts Model

const Posts = require("../../models/Posts");

//@routes for GET api/posts
//@desc fetch a post
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    if (!posts) throw Error("Empty");

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//@routes for GET api/posts/:id
//@desc fetch a specific post
router.get("/:id", async (req, res) => {
  try {
    const posts = await Posts.findById(req.params.id);
    if (!posts) throw Error("No posts with ID");

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//@routes for POST api/posts
//@desc Create a post
router.post("/", async (req, res) => {
  const newPost = new Posts(req.body);

  try {
    const post = await newPost.save();
    if (!post) throw Error("Something went wrong while saving new post");
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//@routes for DELETE api/posts/:id
//@desc delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (!post) throw Error("Cannot find post with id");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//@routes for DELETE api/posts/:id
//@desc update a post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
    if (!post) throw Error("Somethign went wrong while updating post");
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
