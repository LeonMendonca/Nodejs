import htmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path';

export default {
  //path from webpack to target file
  entry: './VotingSystem/public/fetch/signup.js',
  output: {
    filename: 'signup.bundle.js',
    path: resolve('./VotingSystem/dist')
  }, 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      }
    ]
  },
  /*
  plugins: [
    new htmlWebpackPlugin({
      filename:'signup.html',
      template:'./VotingSystem/public/signup.html'
    }),
  ],
  */
  mode: 'development'  // Ensure mode is set to 'development' or 'production'
};
