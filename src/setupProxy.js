const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', proxy({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: { '^/api': '' }
  }));

  app.use(/^\/socket.io(\/*)?/, proxy({
    target: 'http://localhost:3333'
  }));
};
