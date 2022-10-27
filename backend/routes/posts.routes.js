const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts.controllers");

const GuardAuth = require("../middleware/GuardAuth");
const GuardMulter = require("../middleware/GuardMulterPost");


// routes CRUD des sauces
router.get("/", GuardAuth, postsCtrl.getAllPosts);
router.get("/:id", GuardAuth, postsCtrl.getOnePost);
router.post("/", GuardAuth, GuardMulter, postsCtrl.createPost);
router.put("/", GuardAuth, GuardMulter, postsCtrl.modifyPost);
router.delete("/:id", GuardAuth, postsCtrl.deletePost);
router.post("/like", GuardAuth, postsCtrl.likePost);

module.exports = router;
