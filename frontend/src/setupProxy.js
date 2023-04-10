const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  const target = process.env.BACKEND_URL ?? 'http://localhost:4000'
  app.use(
    '/graphql',
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  )
  app.use(
    createProxyMiddleware('/websocket', {
      target,
      changeOrigin: true,
      ws: true,
    })
  )
}
