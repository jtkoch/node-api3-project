const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.status(200).json({
    message: `Welcome ${process.env.NAME}`,
    fact: process.env.FACT || "I have no facts",
  })
})

module.exports = router