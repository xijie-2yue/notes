// 入口文件
const fs = require('fs')

exports.stream = () => {
  // 创建一个读取文件流对象
  const readStream = fs.createReadStream('package.json')
  // 创建一个写入文件流的对象
  const writeStream = fs.createWriteStream('temp.txt')
  // 将 package.json 的内容导入到 temp.text 中
  readStream.pipe(writeStream)
  return readStream
}

exports._stream = (done) => {
  const readStream = fs.createReadStream('package.json')
  const writeStream = fs.createWriteStream('temp.txt')
  readStream.pipe(writeStream)
  readStream.on('end', () => {
    done()
  })
}
