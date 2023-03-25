const userModel = require("./users-model");
const postModel = require("../posts/posts-model");
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.get();
    res.json(users);
  } catch (err) {
    // res.status(500).json({ message: "işlem yapılamadı" });
    next(err);
  }
});

router.get("/:id", validateUserId, (req, res, next) => {
  try {
    res.json(req.user);
  } catch {
    // res.status(500).json({ message: "işlem yapılamadı" });
    next(err);
  }
});

router.post("/", validateUser, async (req, res) => {
  try {
    const insertedUser = await userModel.insert(req.user);
    res.status(201).json(insertedUser);
  } catch (err) {
    // res.status(500).json({ message: "işlem yapılamadı" });
    next(err);
  }
});

router.put("/:id", validateUserId, validateUser, async (req, res, next) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  try {
    await userModel.update(req.params.id, req.user);
    const updatedUser = await userModel.getById(req.params.id);
    res.json(updatedUser);
  } catch {
    res.status(500).json({ message: "işlem yapılamadı" });
    // next(err);
  }
});

router.delete("/:id", validateUserId, async (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN

  try {
    const silinenUser = await userModel.getById(req.params.id);
    await userModel.remove(req.params.id);
    res.status(201).json(silinenUser);
  } catch {
    // res.status(500).json({ message: "işlem yapılamadı" });
    next(err);
  }
});

router.get("/:id/posts", validateUserId, async (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN

  try {
    const userPost = await userModel.getUserPosts(req.params.id);
    res.json(userPost);
  } catch {
    // res.status(500).json({ message: "işlem yapılamadı" });
    next(err);
  }
});

router.post("/:id/posts", validateUserId, validatePost, async (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN

  try {
    const insertedPost = await postModel.insert({
      user_id: req.params.id,
      text: req.post.text,
    });
    res.status(201).json(insertedPost);
  } catch (err) {
    // res.status(500).json({ message: "işlem yapılamadı" });
    next(err);
  }
});

// routerı dışa aktarmayı unutmayın
module.exports = router;
