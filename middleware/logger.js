module.exports = () => {
  return (req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.url} ${req.method}`)
    next()
  }
}