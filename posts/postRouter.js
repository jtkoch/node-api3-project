const express = require('express');
const posts = require('../posts/postDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const post = await posts.get()
    res.status(200).json(post)
  } catch(err) {
      next(err)
  }
});

router.get('/:id', validatePostId, async (req, res, next) => {
  try {
    const post = await posts.getById(req.params.id)
    res.status(200).json(post)
  } catch(err) {
      next(err)
  }
});

router.delete('/:id', validatePostId, async (req, res, next) => {
  try {
  const post = await posts.remove(req.params.id)
  res.status(200).json(post)
  } catch(err) {
      next(err)
  }
});

router.put('/:id', validatePostId, async (req, res, next) => {
  try {
    const post = await posts.update(req.params.id, req.body)
    res.status(200).json(post)
  } catch(err) {
      next(err)
  }
});


// custom middleware
function validatePostId(req, res, next) {
  posts.getById(req.params.id)
    .then((postId) => {
      if(postId) {
        req.postId = postId
        next()
      } else {
        res.status(400).json({
          message: "missing post data",
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = router;
