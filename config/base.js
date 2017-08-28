const path = require('path');

const assetsSubDirectory = 'static';
const assetsPublicPath = '/';

exports.assetsSubDirectory = assetsSubDirectory;
exports.assetsPublicPath = assetsPublicPath;
exports.staticMount = assetsPublicPath + assetsSubDirectory;

exports.assetPath  = path.resolve(__dirname, '../dist');
exports.staticPath = path.resolve(__dirname, '../dist/static');

exports.env = process.env.NODE_ENV || 'development';
exports.server = process.env.SERVER || 'unknown';
exports.dc = process.env.DC || 'unknown';
exports.staticPrefix = process.env.STATIC_PREFIX || '';