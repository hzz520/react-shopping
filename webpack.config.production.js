var path = require('path'),
    webpack = require('webpack'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, 'src'),
    DIST_PATH = path.resolve(ROOT_PATH, 'dist'),
    LIBS_PATH = path.resolve(ROOT_PATH, 'libs'),
    TEM_PATH = path.resolve(LIBS_PATH, 'template');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: path.resolve(SRC_PATH, 'index.jsx'),
        vendors: ['react', 'react-dom','react-redux','redux','react-router','redux-immutable',"redux-thunk",'immutable']
    },
    output: {
        path: DIST_PATH,
        publicPath: './',
        filename: 'js/[name]-[hash:8].js',
        chunkFilename: 'js/[name]-[hash:8].js'
    },
    module: {
        preLoader: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'eslint',
                include: SRC_PATH
            }
        ],
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel',
                include: SRC_PATH
            }, {
                test: /\.(svg|gif|png|jpg|jpeg)$/,
                loader: 'url-loader?limit=1536&name=img/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(swf|mp4|ogv|webm)$/,
                loader: 'file-loader?name=video/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(mp3|ogg|wav|m4a)$/,
                loader: 'file-loader?name=audio/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(woff|eot|ttf)$/,
                loader: 'file-loader?name=font/[name]-[hash:8].[ext]',
                include: SRC_PATH
            }, {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
                include: [SRC_PATH,LIBS_PATH]
            },{
                test:/\.json$/,
                loader:'json',
                include:SRC_PATH
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    },
    externals: {
        zepto: '$',
        jquery: '$'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new CleanWebpackPlugin([DIST_PATH], {
            root: '',
            verbose: true,
            dry: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'zepto' || 'jquery',
            zepto: 'zepto',
            jQuery: 'jquery',
            'window.zepto': 'zepto',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin("[name]-[hash:8].css"),
        new webpack.optimize.CommonsChunkPlugin({
            filename: "js/[name]-[hash:8].js",
            name: "vendors"
        }),
        new HtmlwebpackPlugin({
            title: '朋刻印象官网',
            favicon:path.resolve(SRC_PATH,'components/common/img/favicon.ico'),
            keywords: '朋刻印象官网',
            description: '朋刻印象官网',
            filepath: DIST_PATH,
            template: path.resolve(TEM_PATH, 'index.html'),
            chunks: ['index', 'vendors'],
            filename: 'index.html',
            inject: 'body'
        })
    ]
};