const userModel = require("../users/users-model");
const postsModel = require("../posts/posts-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  //!gün ve saati alabilmek için:
  const time = new Date().toLocaleString();
  console.log(`Request object:{method: ${method}, url: ${url}, time: ${time}}`);
  //!bir sonrakine geç
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await userModel.getById(req.params.id);
    if (user) {
      //!routerda end pointleri yazarken kullanabilmek için req objesine ekliyoruz
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  try {
    const yeniUser = req.body;
    if (yeniUser.name) {
      req.user = yeniUser;
      next();
    } else {
      res.status(400).json({ message: "eksik" });
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  try {
    const yeniPost = req.body;
    if (yeniPost.text) {
      req.post = yeniPost;
      next();
    } else {
      res.status(400).json({ message: "gerekli text alanı eksik" });
    }
  } catch (err) {
    next(err);
  }
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = { logger, validateUserId, validateUser, validatePost };
