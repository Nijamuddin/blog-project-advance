const path = require('path');

config = {	
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, "./src/script"),
        filename: 'bundle.js',
    },
    devServer: {
        inline: true,
        port: 9999
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        }]
    }
}
module.exports = config;