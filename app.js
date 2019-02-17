const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();

app.use('/api', proxy({
    target: 'http://api.zhuishushenqi.com/',
    pathRewrite: {'^/api': '/'},
    changeOrigin: true
  }
));

app.use('/chapter', proxy({
    target: 'http://chapter2.zhuishushenqi.com/',
    pathRewrite: {'^/chapter': '/chapter'},
    changeOrigin: true
  }
));

app.get('/*', function (req, res) {
  let pathname = req.url;
  if (pathname === '/') {
    pathname = 'index.html'
  }
  res.sendFile(__dirname + '/build/'+ pathname)
});

app.listen(3001);
