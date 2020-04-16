const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await users.insert(req.body)
    res.status(201).json(user)
  } catch(err) {
      next(err)
  }
});

router.post('/:id/posts', validatePost, validateUserId, async (req, res, next) => {
  try {
    const post = await posts.insert({...req.body, user_id: req.params.id})
      res.status(201).json(post)
    } catch(err) {
      next(err)
    }
});

router.get('/', async (req, res, next) => {
  try {
    const user = await users.get()
    res.status(200).json(user)
  } catch(err) {
      next(err)
  }
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', async (req, res) => {
  try {
    const post = await users.getUserPosts(req.params.id)
    res.status(200).json(post)
    } catch(err) {
      next(err)
    }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await users.remove(req.params.id)
    res.status(204).end()
  } catch(err) {
      next(err)
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  try {
      const user = await users.update(req.params.id, req.body)
      res.status(200).json(user)
    } catch(err) {
      next(err)
    }
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