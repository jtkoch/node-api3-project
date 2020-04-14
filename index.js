const express = require("express")
const cors = require("cors")
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express()
const port = 4000

server.use(express.json())
server.use(cors())
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
    message: "Something went wrong",
  })
})

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})