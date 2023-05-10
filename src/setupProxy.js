const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://127.0.0.1:5005', //接口地址
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  )
}
