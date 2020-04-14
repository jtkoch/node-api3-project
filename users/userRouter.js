const express = require('express');
const users = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {
  
});

router.post('/:id/posts', (req, res) => {
  
});

router.get('/', (req, res) => {
  
});

router.get('/:id', (req, res) => {
  
});

router.get('/:id/posts', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  
});

router.put('/:id', (req, res) => {
  
});


//custom middleware
function validateUserId(req, res, next) {
  users.findById(req.params.id)
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