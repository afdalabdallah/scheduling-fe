const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = createProxyMiddleware({
  target: "http://localhost:5000", // Your backend server URL
  changeOrigin: true,
  pathRewrite: {
    "^/api": "/", // Remove the '/api' prefix when forwarding the request
  },
});
