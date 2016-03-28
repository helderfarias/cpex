var webpack = require('webpack');

module.exports = {
    context: __dirname + '/web/src',
    entry: './Main.js',

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    output: {
        filename: 'bundle.js',
        path: __dirname + '/web/build',
        publicPath: 'http://localhost:8080/build/'
    },    

    module: {
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ },
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
    ]
}