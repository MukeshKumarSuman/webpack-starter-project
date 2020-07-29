const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// To copy some asset from project folder to dist folder we can use copy-webpack-plugin
//const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}, options) => {
    console.log(env);
    console.log(options);
    const isProduction = env.production === true;
    return {
        entry: './src/index.js',
        output: {
            filename: 'index.[contenthash:8].js',
            path: path.resolve(__dirname, './dist'),
            publicPath: ''
        },
        mode: isProduction ? 'production' : 'development',
        devServer: {
            open: true,
            contentBase: path.join(__dirname, 'dist'),
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: 'Webpack starter project',
                template: './src/index.html',
                minify: isProduction
            }),

            new MiniCssExtractPlugin({
                filename: 'style.[contenthash:8].css'
            }),
            /*
            new CopyPlugin({
                patterns: [
                  { from: './src/images', to: './images' },
                ],
              }), */
        ],
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: ['html-loader']
                },
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images1'
                    }
                },
                {
                    test: /\.scss$/i,
                    use: [
                         MiniCssExtractPlugin.loader,
                        // This loader resolves url() and @imports inside CSS
                        'css-loader',
                        'postcss-loader',
                         // Compiles Sass to CSS
                         'sass-loader'
                        
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
                        }
                    }
                },
                {}
            ]
        }
    }
}