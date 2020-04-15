const express = require('express');
const posts = require('../posts/postDb');

const router = express.Router();

router.get('/', (req, res, next) => {
  posts.get()
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/:id', (req, res, next) => {
  posts.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      next(err)
    })
});

router.delete('/:id', (req, res, next) => {
  posts.remove(req.params.id)
    .then(() => {
        res.status(200).json({
          message: "The post was deleted",
        })
    })    
    .catch((err) => {
      next(err)
    })
});

router.put('/:id', validatePostId, (req, res, next) => {
  posts.update(req.params.id, req.body)
    .then((post) => {
        res.status(200).json(post)
    })    
    .catch((err) => {
      next(err)
    })
});

// custom middleware

function validatePostId(req, res, next) {
  posts.getById(req.parmams.id)
    .then((postId) => {
      if(postId) {
        req.postId = postId
        next()
      } else {
        res.status(500).json({
          message: "Failed",
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}

module.exports = router;
