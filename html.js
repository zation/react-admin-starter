const fs = require('fs');
const md5 = require('md5');

const html = fs.readFileSync('./src/index.html', 'utf8');
const appFile = fs.readFileSync('./public/__built__/app.js');
const vendorFile = fs.readFileSync('./public/__built__/vendor.js');

fs.writeFileSync(
  './public/index.html',
  html.replace('{{appCacheBuster}}', md5(appFile))
    // eslint-disable-next-line comma-dangle
    .replace('{{vendorCacheBuster}}', md5(vendorFile))
);
