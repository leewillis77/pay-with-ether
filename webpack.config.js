const path = require('path');

module.exports = {
  entry: './js/pay-with-ether.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'pay-with-ether.js',
  },
  mode: 'production',
};
