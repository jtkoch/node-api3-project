const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")
const welcomeRouter = require("./welcome/welcome-router")

const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use(cors())
server.use(logger)
server.use("/", welcomeRouter)
server.use("/posts", postRouter)
server.use("/users", userRouter)

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found",
  })
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "Something went wrong!",
  })
})

server.listen(port, () => {
  console.log(`\n*** Server is listening on http://localhost:${port} ***\n`)
})