const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PATH = {
	app: path.resolve(__dirname, "app"),
	dist: path.resolve(__dirname, "dist")
};
module.exports = {
	mode: 'production',
	entry: {
		common: './app/common.js',
	},
	output: {
		path: PATH.dist,
		filename: 'js/[name].js',
		chunkFilename: 'js/[name].js',
		library: '[name]',
	},
	watch: false,
	devServer: {
		stats: 'errors-only',
		contentBase: PATH.app
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ecma: undefined,
					warnings: false,
					parse: {},
					compress: {},
				}
			}),
		],
		namedModules: true,
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		new HardSourceWebpackPlugin(),
		new ExtractTextPlugin('css/main-[name].css'),
		new CopyWebpackPlugin([
			{from: "app/img/", to: "img/"},
			{from: "app/video/", to: "video/"},
			// {from: "app/music/", to: "music/"},
			{from: "app/fonts/", to: "fonts/"}
		]),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: PATH.app + '/index.html',
			chunks: ['vendors~common', 'common']
		}),
		new HtmlWebpackPlugin({
			filename: 'package.html',
			template: PATH.app + '/package.html',
			chunks: ['vendors~common', 'common']
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env'],
							cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract(
						{
							fallback: 'style-loader',
							use: [
								'css-loader?url=false',
								{
									loader: 'postcss-loader',
									options: {
										plugins: [
											autoprefixer({
												browsers: ['ie >= 8', 'last 4 version']
											})
										]
									}
								},
								{
									loader: 'sass-loader'
								}
							]
						}
				)
			},
			{
				test: /\.html$/,
				loader: "underscore-template-loader",
				query: {attributes: []}
			},
			{
				test: /\.(frag|vert)$/,
				loader: 'webpack-glsl-loader'
			},
			{
				test: /\.(jpg|png|gif|svg)$/,
				loader: 'image-webpack-loader',
				enforce: 'pre'
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 10 * 1024
				}
			},
			{
				test: /\.svg$/,
				loader: 'svg-url-loader',
				options: {
					limit: 10 * 1024,
					noquotes: true,
				}
			},
		]
	},
};