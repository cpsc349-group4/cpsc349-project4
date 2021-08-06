const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  output: {
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: path.resolve(__dirname, 'src/about.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'home.html',
      template: path.resolve(__dirname, 'src/home.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'curatedTimeline.html',
      template: path.resolve(__dirname, 'src/curatedTimeline.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'myPosts.html',
      template: path.resolve(__dirname, 'src/myPosts.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'public.html',
      template: path.resolve(__dirname, 'src/public.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'newPost.html',
      template: path.resolve(__dirname, 'src/newPost.html')
    }),
    new HtmlWebpackPlugin({
      filename: 'newUser.html',
      template: path.resolve(__dirname, 'src/newUser.html')
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/i,
        loader: 'standard-loader',
        options: {
          env: {
            browser: true
          }
        }
      }
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
}
