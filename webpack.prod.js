const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    //mode: 'development',
    //optimization: {
    //    providedExports: true,
    //    usedExports: true
    //}
});