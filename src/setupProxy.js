const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/login',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );

  app.use(
    '/tokenValidate',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true
    })
  );

  app.use(
    '/api',
    proxy({
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    })
  );
};
