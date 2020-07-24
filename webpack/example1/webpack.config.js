let path = require('path')

module.exports = {
  /* 
    mode: 打包模式
      production  默认 代码会被压缩
      development 代码会保持原本的缩进格式 适合阅读
  */
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'bundle')
  },
  module: {
    rules: [
      {
        test: /\.jpg$/, // 就是筛选特定的文件, 一般就是以后缀名为识别码
        use: {  // 就是采用哪个具体的loader
          loader: 'file-loader'
        }
      }
    ]
  }
}