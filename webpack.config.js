const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
    require('postcss-import'),
    require('postcss-mixins'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
    require('autoprefixer')
]

class RunAfterCompile {
    apply (compiler) {
        compiler.hooks.done.tap('Copy images', function () {
            fse.copySync('./app/img', './docs/img')
        })
        compiler.hooks.done.tap('Copy fonts', function () {
            fse.copySync('./app/assets/styles/fonts', './docs/styles/fonts')
        })
    }
}
let fontsPlugins = [
    new RunAfterCompile()
]

let cssConfig = {
    test: /\.css$/i,
    use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
}

let fontsConfig = {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                plugins: fontsPlugins,
                name: 'styles/fonts/[name].[ext]',
            }
        }
    ]
}

let pages = fse.readdirSync('./app').filter(function (file) {
    return file.endsWith('.html')
}).map(function (page) {
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}`
    })
})

let config = {
    entry: {
        fonts: './app/assets/scripts/Fonts.js',
        bootstrap: './app/assets/scripts/Bootstrap.js',
        main: './app/assets/scripts/App.js'
    },
    plugins: pages,
    module: {
        rules: [
            fontsConfig,
            cssConfig,
        ],
    },
}

if (currentTask == 'dev') {
    cssConfig.use.unshift('style-loader')
    config.output = {
        filename: '[name]-bundled.js',
        path: path.resolve(__dirname, 'app')
    }
    config.devServer = {
        before: function (app, server) {
            server._watch('./app/**/*.html')
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    }
    config.mode = 'development'
}

if (currentTask == 'build') {
    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    })

    cssConfig.use.unshift(MiniCssExtractPlugin.loader)
    postCSSPlugins.push(require('cssnano'))
    config.output = {
        filename: 'scripts/[name].[chunkhash].js',
        chunkFilename: 'scripts/chunks/[name].[chunkhash].js',
        path: path.resolve(__dirname, 'docs')
    }
    config.mode = 'production'
    config.optimization = {
        splitChunks: {chunks: 'all'}
    }
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: 'styles/[name].[chunkhash].css'}),
        new RunAfterCompile()
    )
}

module.exports = config
