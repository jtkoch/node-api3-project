const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res, next) => {
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((err) => {
      next(err)
    })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res, next) => {
  posts.insert({...req.body, user_id: req.params.id})
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/', (req, res, next) => {
  users.get()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', (req, res) => {
  users.getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((err) => {
      next(err)
    })
});

router.delete('/:id', validateUserId, (req, res, next) => {
  users.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "the user was deleted",
      })
    })
    .catch((err) => {
      next(err)
    })
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      next(err)
    })
});


//custom middleware
function validateUserId(req, res, next) {
  users.getById(req.params.id)
    .then((user) => {
      if(user) {
        req.user = user
        next()
      } else {
        res.status(400).json({
          message: "invalid user id"
        })
      }
    })
    .catch((err) => {
      next(err)
    })
}

function validateUser(req, res, next) {
  if(!req.body) {
    res.status(400).json({
      message: "missing user data",
    })
  } else if(!req.body.name) {
    res.status(400).json({
      message: "missing required name field",
    })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  if(!req.body) {
    res.status(400).json({
      message: "missing post data",
    })
  } else if(!req.body.text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    next()
  }
}


module.exports = router;