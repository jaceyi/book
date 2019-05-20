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

app.use('/static', express.static('build/static'))

app.get('/*', function(req, res) {
  res.sendFile(`${__dirname}/build/index.html`)
});

app.listen(3001);
