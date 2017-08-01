const express = require('express');
const util = require('util');
const fs = require('fs');
const path = require('path');

const config = require('./config/basic');

const readFile = util.promisify(fs.readFile);
const app = express();
const port = process.env.PORT || 3018;

function setConfig(html) {
  return html.replace("env: 'development'", `env: '${config.env}'`)
    .replace('{{server}}', config.server)
    .replace('{{dc}}', config.dc);
}

app.use(config.staticMount, express.static(config.staticPath, {
  setHeaders: (res) => {
    if (config.env !== 'development') {
      res.set('Cache-Control', 'public, max-age=31536000, s-maxage=600');
    }
  },
}));

app.get('/', async (req, res) => {
  const html = await readFile(path.resolve(config.assetPath, 'index.html'), 'utf8');
  let maxAge = 600;
  if (config.env === 'development') {
    maxAge = 0;
  }
  res.set('Cache-Control', `public, max-age=${maxAge}`);
  res.send(setConfig(html));
});

app.listen(port);

console.info(`> Listening at http://127.0.0.1:${port}/`);
