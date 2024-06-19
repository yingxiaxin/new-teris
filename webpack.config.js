const path = require('path'); // 引入 Node.js 的 path 模块，用于处理文件和目录路径  
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // 指定打包的入口文件，通常是一个或多个 JavaScript 文件  
  output: {
    // 指定打包后的文件名和输出目录  
    filename: 'bundle.js', // 打包后的文件名，默认为 main.js  
    path: path.resolve(__dirname, 'dist'), // 打包后的文件存放的目录，__dirname 是当前文件的绝对路径  
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {  
    extensions: ['.tsx', '.ts', '.js'],  
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 指定模板文件  
      filename: 'index.html', // 生成的 HTML 文件名  
      favicon: 'favicon.ico',
    }),
  ],
  mode: 'development',
};